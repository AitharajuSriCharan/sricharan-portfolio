import fs from 'fs';
import path from 'path';

const TMP_FILE = path.join('/tmp', 'portfolio_messages.json');

const INITIAL_MESSAGES = [
  {
    id: 2,
    name: 'VLSI Talent Acquisition',
    email: 'careers@semiconductor-tech.com',
    subject: 'Technical Interview - Hardware Engineering',
    message: 'We would love to schedule a technical interview for our upcoming ASIC/FPGA internship cohort.',
    createdAt: '2026-10-10T23:20:14.000Z'
  },
  {
    id: 1,
    name: 'Dr. Vikram Sharma',
    email: 'vikram.sharma@semicon-research.org',
    subject: 'VLSI RTL Internship Inquiry',
    message: 'Hello Sri Charan, we reviewed your JalNetra and Edge-AI Plant Stress RTL projects and would like to discuss an opportunity.',
    createdAt: '2026-10-10T23:13:05.000Z'
  }
];

function loadMessages() {
  try {
    if (fs.existsSync(TMP_FILE)) {
      const data = JSON.parse(fs.readFileSync(TMP_FILE, 'utf-8'));
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (e) {
    // fallback to initial
  }
  return [...INITIAL_MESSAGES];
}

function saveMessages(msgs) {
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(msgs, null, 2));
  } catch (e) {
    // ignore
  }
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const ADMIN_KEY = process.env.ADMIN_KEY || 'portfolio-admin-secret-key-2026';
  let list = loadMessages();

  // GET /api/contact -> Admin list
  if (req.method === 'GET') {
    const adminKey = req.headers['x-admin-key'] || req.query?.adminKey;
    if (adminKey !== ADMIN_KEY) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or missing admin credentials'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact messages retrieved successfully.',
      data: {
        content: list,
        totalElements: list.length,
        totalPages: 1,
        size: 50,
        number: 0
      }
    });
  }

  // POST /api/contact -> Public submit
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (err) {
        return res.status(400).json({ success: false, message: 'Invalid JSON payload' });
      }
    }
    body = body || {};

    const { name, email, subject, message } = body;
    const errors = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Name must be between 2 and 100 characters';
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please provide a valid email address';
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      errors.subject = 'Subject is required';
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'Message must be between 10 and 5000 characters';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed for one or more fields',
        errors
      });
    }

    const newId = list.length > 0 ? Math.max(...list.map((m) => m.id)) + 1 : 1;
    const newMessage = {
      id: newId,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    list.unshift(newMessage);
    saveMessages(list);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received successfully.',
      data: newMessage
    });
  }

  // DELETE /api/contact -> Admin delete
  if (req.method === 'DELETE') {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== ADMIN_KEY) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or missing admin credentials'
      });
    }

    const idToDelete = Number(req.query?.id);
    if (!idToDelete) {
      return res.status(400).json({ success: false, message: 'Message ID is required' });
    }

    const initialLen = list.length;
    list = list.filter((m) => m.id !== idToDelete);
    if (list.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    saveMessages(list);
    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully.'
    });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
