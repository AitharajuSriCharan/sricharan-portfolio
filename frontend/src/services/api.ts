import type { ContactFormData, ApiResponse, PaginatedMessages } from '../types';

const API_BASE_URL = import.meta.env.PROD
  ? '/api'
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api');

export class ApiError extends Error {
  status?: number;
  errors?: Record<string, string>;

  constructor(message: string, status?: number, errors?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Check if the backend health endpoint is responding
 */
export async function checkBackendHealth(): Promise<{ online: boolean; status?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return { online: true, status: data.status || 'UP' };
    }
    return { online: false };
  } catch {
    return { online: false };
  }
}

/**
 * Submit contact message to Spring Boot backend: POST /api/contact
 */
export async function submitContactMessage(data: ContactFormData): Promise<ApiResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let responseData: unknown = null;
    try {
      responseData = await response.json();
    } catch {
      // response might be empty or non-JSON
    }

    if (!response.ok) {
      const errorObj = responseData as { message?: string; errors?: Record<string, string> } | null;
      const message = errorObj?.message || `Server responded with status ${response.status} (${response.statusText})`;
      throw new ApiError(message, response.status, errorObj?.errors);
    }

    const typedData = responseData as { message?: string; success?: boolean; data?: unknown };
    return {
      success: true,
      message: typedData?.message || 'Your message has been received! Thank you for reaching out.',
      data: typedData?.data,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof ApiError) {
      throw err;
    }

    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError('Request timed out. Please check if the Spring Boot backend is running.', 408);
    }

    const message = (err as Error)?.message || 'Failed to connect to backend server.';
    throw new ApiError(message, 0);
  }
}

/**
 * Fetch all contact messages with admin authentication
 */
export async function fetchContactMessages(
  adminKey: string,
  page = 0,
  size = 20
): Promise<PaginatedMessages> {
  const response = await fetch(`${API_BASE_URL}/contact?page=${page}&size=${size}&sort=createdAt,desc`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-Admin-Key': adminKey,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError('Invalid Admin Key. Please check your credentials.', 401);
    }
    throw new ApiError(`Failed to fetch messages (Status: ${response.status})`, response.status);
  }

  const json = await response.json();
  return json.data as PaginatedMessages;
}

/**
 * Delete a contact message with admin authentication
 */
export async function deleteContactMessage(
  id: number,
  adminKey: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'X-Admin-Key': adminKey,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError('Invalid Admin Key. Cannot perform deletion.', 401);
    }
    throw new ApiError(`Failed to delete message (Status: ${response.status})`, response.status);
  }
}

