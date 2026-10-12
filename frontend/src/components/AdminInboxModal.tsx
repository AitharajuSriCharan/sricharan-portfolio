import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Copy,
  Check,
  Search,
  Download,
  AlertCircle,
  Inbox,
  Calendar,
  LogOut,
  Send
} from 'lucide-react';
import type { ContactMessageItem } from '../types';
import { fetchContactMessages, deleteContactMessage, ApiError } from '../services/api';

interface AdminInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'portfolio_admin_key';

export const AdminInboxModal: React.FC<AdminInboxModalProps> = ({ isOpen, onClose }) => {
  const [adminKey, setAdminKey] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY) || '';
  });
  const [rememberKey, setRememberKey] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // Load messages from backend
  const loadMessages = useCallback(async (keyToUse: string) => {
    if (!keyToUse.trim()) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchContactMessages(keyToUse.trim(), 0, 50);
      setMessages(data.content || []);
      setIsAuthenticated(true);
      if (data.content && data.content.length > 0) {
        setSelectedMessage(prev => prev ? (data.content.find(m => m.id === prev.id) || data.content[0]) : data.content[0]);
      } else {
        setSelectedMessage(null);
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setErrorMessage('Authentication failed: Invalid admin security key.');
        setIsAuthenticated(false);
      } else {
        setErrorMessage((err as Error).message || 'Unable to connect to backend server.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check stored key whenever modal opens
  useEffect(() => {
    if (!isOpen) return;

    const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAdminKey(stored);
      loadMessages(stored);
    }
  }, [isOpen, loadMessages]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Unlock submission
  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) {
      setErrorMessage('Please enter your admin key.');
      return;
    }

    if (rememberKey) {
      localStorage.setItem(STORAGE_KEY, adminKey.trim());
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, adminKey.trim());
      localStorage.removeItem(STORAGE_KEY);
    }

    await loadMessages(adminKey.trim());
  };

  // Lock / Logout
  const handleLock = () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    setAdminKey('');
    setIsAuthenticated(false);
    setMessages([]);
    setSelectedMessage(null);
    setErrorMessage(null);
  };

  // Delete message
  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteContactMessage(id, adminKey.trim());
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage?.id === id) {
        const remaining = messages.filter(m => m.id !== id);
        setSelectedMessage(remaining.length > 0 ? remaining[0] : null);
      }
      setConfirmDeleteId(null);
    } catch (err) {
      setErrorMessage((err as Error).message || 'Failed to delete message.');
    } finally {
      setDeletingId(null);
    }
  };

  // Copy email to clipboard
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Copy full message
  const handleCopyMessage = (msg: ContactMessageItem) => {
    const text = `From: ${msg.name} <${msg.email}>\nDate: ${msg.createdAt}\nSubject: ${msg.subject}\n\n${msg.message}`;
    navigator.clipboard.writeText(text);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export messages to JSON
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(messages, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_contact_messages_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter messages by search query
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    const q = searchQuery.toLowerCase();
    return messages.filter(
      m =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
    );
  }, [messages, searchQuery]);

  // Format date helper
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  // Relative time helper
  const getRelativeTime = (isoString: string) => {
    try {
      const now = new Date().getTime();
      const time = new Date(isoString).getTime();
      const diffSec = Math.floor((now - time) / 1000);
      if (diffSec < 60) return 'Just now';
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHr = Math.floor(diffMin / 60);
      if (diffHr < 24) return `${diffHr}h ago`;
      const diffDay = Math.floor(diffHr / 24);
      return `${diffDay}d ago`;
    } catch {
      return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{ zIndex: 1200, padding: '1rem' }}
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: isAuthenticated ? '1080px' : '480px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#070d18',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 242, 254, 0.15)',
          transition: 'max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Modal Top Bar */}
        <div
          className="modal-header"
          style={{
            borderBottom: '1px solid rgba(0, 242, 254, 0.12)',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: isAuthenticated
                  ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(79, 172, 254, 0.2))'
                  : 'rgba(239, 68, 68, 0.12)',
                border: `1px solid ${isAuthenticated ? 'var(--accent-cyan)' : 'rgba(239, 68, 68, 0.4)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isAuthenticated ? 'var(--accent-cyan)' : '#f87171',
              }}
            >
              {isAuthenticated ? <Inbox size={22} /> : <Lock size={20} />}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  {isAuthenticated ? 'Contact Messages Inbox' : 'Admin Security Access'}
                </h3>
                {isAuthenticated && (
                  <span
                    style={{
                      fontSize: '0.725rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(0, 242, 254, 0.12)',
                      border: '1px solid rgba(0, 242, 254, 0.3)',
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    {messages.length} {messages.length === 1 ? 'Message' : 'Messages'}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
                {isAuthenticated
                  ? 'Submissions received via Spring Boot REST API'
                  : 'Portfolio administrative control panel'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isAuthenticated && (
              <>
                <button
                  onClick={() => loadMessages(adminKey)}
                  className="modal-close-btn"
                  title="Refresh messages"
                  disabled={isLoading}
                  style={{
                    color: 'var(--accent-cyan)',
                    background: 'rgba(0, 242, 254, 0.08)',
                    borderColor: 'rgba(0, 242, 254, 0.25)',
                  }}
                >
                  <RefreshCw size={16} className={isLoading ? 'spin-animation' : ''} />
                </button>

                <button
                  onClick={handleExportJSON}
                  className="modal-close-btn"
                  title="Export all messages as JSON"
                  disabled={messages.length === 0}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Download size={16} />
                </button>

                <button
                  onClick={handleLock}
                  className="modal-close-btn"
                  title="Lock / Sign Out"
                  style={{
                    color: '#f87171',
                    background: 'rgba(239, 68, 68, 0.08)',
                    borderColor: 'rgba(239, 68, 68, 0.25)',
                  }}
                >
                  <LogOut size={16} />
                </button>
              </>
            )}

            <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '0', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {!isAuthenticated ? (
            /* ========================================================
               SCREEN 1: AUTHENTICATION LOCK SCREEN
               ======================================================== */
            <div style={{ padding: '2.5rem 2rem' }}>
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '2rem',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.12), rgba(79, 172, 254, 0.15))',
                    border: '1px solid rgba(0, 242, 254, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    color: 'var(--accent-cyan)',
                    boxShadow: '0 0 30px rgba(0, 242, 254, 0.2)',
                  }}
                >
                  <ShieldCheck size={32} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                  Authorize Admin Access
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '380px', margin: '0 auto' }}>
                  Enter your secure portfolio admin key to view and manage inquiries received through the contact form.
                </p>
              </div>

              {errorMessage && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.875rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    color: '#f87171',
                    fontSize: '0.85rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleUnlock}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.825rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-cyan)',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.04em',
                    }}
                  >
                    ADMIN SECURITY KEY (X-Admin-Key)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-dim)',
                        pointerEvents: 'none',
                      }}
                    >
                      <Key size={18} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={adminKey}
                      onChange={(e) => {
                        setAdminKey(e.target.value);
                        setErrorMessage(null);
                      }}
                      placeholder="e.g. portfolio-admin-secret-key-2026"
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '0.85rem 3rem 0.85rem 2.85rem',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(0, 242, 254, 0.25)',
                        borderRadius: 'var(--radius-md)',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'border-color var(--trans-fast)',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(0, 242, 254, 0.25)')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)',
                        padding: '0.25rem',
                      }}
                      title={showPassword ? 'Hide Key' : 'Show Key'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.75rem',
                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      userSelect: 'none',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rememberKey}
                      onChange={(e) => setRememberKey(e.target.checked)}
                      style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                    />
                    <span>Remember key on this browser</span>
                  </label>
                  <span
                    style={{
                      fontSize: '0.775rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-dim)',
                    }}
                  >
                    Spring Boot 3.3.4
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !adminKey.trim()}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '0.875rem',
                    gap: '0.625rem',
                    fontSize: '0.95rem',
                  }}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={18} className="spin-animation" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Unlock size={18} />
                      <span>Unlock Portfolio Inbox</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* ========================================================
               SCREEN 2: INBOX VIEW (SEARCH, LIST, DETAILS)
               ======================================================== */
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '520px' }}>
              {/* Search & Status Subheader */}
              <div
                style={{
                  padding: '1rem 1.75rem',
                  backgroundColor: 'rgba(10, 18, 32, 0.7)',
                  borderBottom: '1px solid rgba(0, 242, 254, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                  <Search
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '0.875rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-dim)',
                    }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by sender, email, subject, or message..."
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.875rem 0.6rem 2.5rem',
                      backgroundColor: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(0, 242, 254, 0.18)',
                      borderRadius: 'var(--radius-md)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '0.6rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      boxShadow: '0 0 10px #10b981',
                    }}
                  />
                  <span style={{ fontSize: '0.785rem', color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                    Backend REST API: ONLINE {import.meta.env.PROD ? '(Cloud)' : '(:8080)'}
                  </span>
                </div>
              </div>

              {/* Messages Workspace: Split View on Desktop */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: filteredMessages.length > 0 ? '380px 1fr' : '1fr',
                  flex: 1,
                  minHeight: '460px',
                  maxHeight: '62vh',
                  overflow: 'hidden',
                }}
              >
                {/* Left Column: Messages List */}
                <div
                  style={{
                    borderRight: filteredMessages.length > 0 ? '1px solid rgba(0, 242, 254, 0.1)' : 'none',
                    overflowY: 'auto',
                    backgroundColor: 'rgba(5, 11, 20, 0.4)',
                  }}
                >
                  {isLoading && messages.length === 0 ? (
                    <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <RefreshCw size={24} className="spin-animation" style={{ margin: '0 auto 0.75rem', color: 'var(--accent-cyan)' }} />
                      <p style={{ fontSize: '0.875rem' }}>Fetching messages from Spring Boot...</p>
                    </div>
                  ) : filteredMessages.length === 0 ? (
                    <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <Inbox size={40} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                      <h5 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '0.35rem' }}>
                        {searchQuery ? 'No matching messages' : 'Inbox is Empty'}
                      </h5>
                      <p style={{ fontSize: '0.825rem', color: 'var(--text-dim)', maxWidth: '240px', margin: '0 auto' }}>
                        {searchQuery
                          ? 'Try adjusting your search query'
                          : 'Messages sent via the Contact section will show up here immediately.'}
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {filteredMessages.map((msg) => {
                        const isSelected = selectedMessage?.id === msg.id;
                        return (
                          <div
                            key={msg.id}
                            onClick={() => setSelectedMessage(msg)}
                            style={{
                              padding: '1.1rem 1.25rem',
                              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                              cursor: 'pointer',
                              backgroundColor: isSelected ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
                              borderLeft: isSelected ? '3px solid var(--accent-cyan)' : '3px solid transparent',
                              transition: 'all var(--trans-fast)',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: isSelected ? '#ffffff' : 'var(--text-main)' }}>
                                {msg.name}
                              </span>
                              <span style={{ fontSize: '0.725rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                                {getRelativeTime(msg.createdAt)}
                              </span>
                            </div>

                            <div
                              style={{
                                fontSize: '0.825rem',
                                color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                                fontWeight: 500,
                                marginBottom: '0.35rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {msg.subject}
                            </div>

                            <p
                              style={{
                                fontSize: '0.785rem',
                                color: 'var(--text-muted)',
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {msg.message}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Column: Selected Message Detail */}
                {selectedMessage ? (
                  <div
                    style={{
                      padding: '1.75rem 2rem',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'rgba(8, 14, 26, 0.85)',
                    }}
                  >
                    {/* Message Header */}
                    <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0, 242, 254, 0.1)', paddingBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-mono)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              color: 'var(--accent-cyan)',
                              display: 'inline-block',
                              marginBottom: '0.35rem',
                            }}
                          >
                            Message #{selectedMessage.id}
                          </span>
                          <h4 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.3 }}>
                            {selectedMessage.subject}
                          </h4>
                        </div>

                        {/* Top Action Buttons */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                          <button
                            onClick={() => handleCopyMessage(selectedMessage)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.4rem 0.75rem', fontSize: '0.785rem', gap: '0.35rem' }}
                            title="Copy full message text"
                          >
                            {copiedId === selectedMessage.id ? (
                              <>
                                <Check size={14} style={{ color: '#10b981' }} />
                                <span style={{ color: '#10b981' }}>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          {confirmDeleteId === selectedMessage.id ? (
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <button
                                onClick={() => handleDelete(selectedMessage.id)}
                                disabled={deletingId === selectedMessage.id}
                                style={{
                                  backgroundColor: '#ef4444',
                                  color: '#fff',
                                  padding: '0.4rem 0.75rem',
                                  borderRadius: 'var(--radius-sm)',
                                  fontSize: '0.785rem',
                                  fontWeight: 600,
                                }}
                              >
                                {deletingId === selectedMessage.id ? 'Deleting...' : 'Confirm'}
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                style={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                  color: 'var(--text-secondary)',
                                  padding: '0.4rem 0.6rem',
                                  borderRadius: 'var(--radius-sm)',
                                  fontSize: '0.785rem',
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(selectedMessage.id)}
                              className="btn btn-secondary btn-sm"
                              style={{
                                padding: '0.4rem 0.75rem',
                                fontSize: '0.785rem',
                                gap: '0.35rem',
                                color: '#f87171',
                                borderColor: 'rgba(239, 68, 68, 0.3)',
                              }}
                              title="Delete message from database"
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Sender Meta Card */}
                      <div
                        style={{
                          backgroundColor: 'rgba(15, 23, 42, 0.6)',
                          border: '1px solid rgba(0, 242, 254, 0.12)',
                          borderRadius: 'var(--radius-md)',
                          padding: '0.875rem 1.15rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '0.75rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
                              color: '#050a14',
                              fontWeight: 700,
                              fontSize: '0.95rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {selectedMessage.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.925rem' }}>
                              {selectedMessage.name}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1px' }}>
                              <span style={{ fontSize: '0.825rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                                {selectedMessage.email}
                              </span>
                              <button
                                onClick={() => handleCopyEmail(selectedMessage.email)}
                                style={{ color: 'var(--text-dim)', padding: '2px', display: 'flex' }}
                                title="Copy Email"
                              >
                                {copiedEmail ? <Check size={13} style={{ color: '#10b981' }} /> : <Copy size={13} />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'flex-end' }}>
                            <Calendar size={13} />
                            <span>{formatDate(selectedMessage.createdAt)}</span>
                          </div>
                          <div style={{ color: 'var(--text-dim)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                            {getRelativeTime(selectedMessage.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message Body Content */}
                    <div style={{ flex: 1, marginBottom: '2rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-dim)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          display: 'block',
                          marginBottom: '0.625rem',
                        }}
                      >
                        MESSAGE CONTENT:
                      </span>
                      <div
                        style={{
                          backgroundColor: 'rgba(15, 23, 42, 0.5)',
                          border: '1px solid rgba(0, 242, 254, 0.1)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.25rem 1.5rem',
                          color: '#e2e8f0',
                          fontSize: '0.95rem',
                          lineHeight: 1.7,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit',
                          minHeight: '120px',
                        }}
                      >
                        {selectedMessage.message}
                      </div>
                    </div>

                    {/* Reply Bar */}
                    <div
                      style={{
                        paddingTop: '1.25rem',
                        borderTop: '1px solid rgba(0, 242, 254, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                        Quick response via your email client
                      </span>

                      <a
                        href={`mailto:${encodeURIComponent(selectedMessage.email)}?subject=${encodeURIComponent(
                          `Re: ${selectedMessage.subject}`
                        )}&body=${encodeURIComponent(
                          `Hi ${selectedMessage.name},\n\nThank you for reaching out through my portfolio website regarding "${selectedMessage.subject}".\n\n\nBest regards,\nAitharaju Sri Charan\nDepartment of ECE, Anurag University`
                        )}`}
                        className="btn btn-primary"
                        style={{ gap: '0.5rem', padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
                      >
                        <Send size={15} />
                        <span>Reply to {selectedMessage.name.split(' ')[0]}</span>
                      </a>
                    </div>
                  </div>
                ) : filteredMessages.length > 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    Select a message from the list to view its contents.
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
