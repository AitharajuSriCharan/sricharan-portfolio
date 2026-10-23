import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, Mail, RefreshCw } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../config/portfolioData';
import type { ContactFormData } from '../types';
import { submitContactMessage, ApiError } from '../services/api';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(null);
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitContactMessage(formData);
      setSubmitSuccess(response.message || 'Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.errors) {
          setErrors(err.errors);
        }
        setSubmitError(err.message);
      } else {
        setSubmitError((err as Error).message || 'Failed to submit contact message.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">Contact & Communication</h2>
          <p className="section-subtitle">
            Interested in discussing VLSI, embedded hardware, or internship opportunities? Send a message directly.
          </p>
        </div>

        {/* Contact Layout */}
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left Column: Contact Channels & Backend Status */}
          <div>
            <div
              className="glass-card"
              style={{
                padding: '2rem',
                marginBottom: '1.5rem',
              }}
            >
              <div className="card-top-circuit-line" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
                Direct Connection
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Feel free to connect regarding VLSI design opportunities, hardware projects, or academic collaboration.
              </p>

              {/* Social / Contact Links — only rendered if configured */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {PERSONAL_INFO.socials.email && (
                  <a
                    href={`mailto:${PERSONAL_INFO.socials.email}`}
                    className="glass-card"
                    style={{
                      padding: '0.9rem 1.15rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'rgba(0, 242, 254, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-cyan)',
                      }}
                    >
                      <Mail size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</div>
                      <div style={{ fontWeight: 600 }}>{PERSONAL_INFO.socials.email}</div>
                    </div>
                  </a>
                )}

                {PERSONAL_INFO.socials.github && (
                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card"
                    style={{
                      padding: '0.9rem 1.15rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'rgba(56, 189, 248, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-blue)',
                      }}
                    >
                      <GithubIcon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GitHub Profile</div>
                      <div style={{ fontWeight: 600 }}>AitharajuSriCharan</div>
                    </div>
                  </a>
                )}

                {PERSONAL_INFO.socials.linkedin && (
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card"
                    style={{
                      padding: '0.9rem 1.15rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'rgba(0, 242, 254, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-cyan)',
                      }}
                    >
                      <LinkedinIcon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>LinkedIn</div>
                      <div style={{ fontWeight: 600 }}>Sri Charan Aitharaju</div>
                    </div>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card" style={{ padding: '2.25rem' }}>
            <div className="card-top-circuit-line" />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem' }}>
              Send a Direct Message
            </h3>

            {/* Success Message */}
            {submitSuccess && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#34d399',
                  fontSize: '0.9rem',
                  marginBottom: '1.5rem',
                }}
              >
                <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
                <span>{submitSuccess}</span>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#f87171',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                  lineHeight: 1.5,
                }}
              >
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '2px' }}>Transmission Status</div>
                  <div>{submitError}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name Field */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="name"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '0.45rem',
                  }}
                >
                  Full Name <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-input)',
                    border: errors.name ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color var(--trans-fast)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.name ? '#ef4444' : 'var(--border-subtle)')}
                />
                {errors.name && (
                  <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '0.45rem',
                  }}
                >
                  Email Address <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-input)',
                    border: errors.email ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color var(--trans-fast)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.email ? '#ef4444' : 'var(--border-subtle)')}
                />
                {errors.email && (
                  <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="subject"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '0.45rem',
                  }}
                >
                  Subject <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Internship Inquiry / Hardware Project"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-input)',
                    border: errors.subject ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color var(--trans-fast)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.subject ? '#ef4444' : 'var(--border-subtle)')}
                />
                {errors.subject && (
                  <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label
                  htmlFor="message"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '0.45rem',
                  }}
                >
                  Message <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message or project opportunity details here..."
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-input)',
                    border: errors.message ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color var(--trans-fast)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.message ? '#ef4444' : 'var(--border-subtle)')}
                />
                {errors.message && (
                  <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  opacity: isSubmitting ? 0.75 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={18} className="spin-icon" />
                    <span>{import.meta.env.PROD ? 'Transmitting Message...' : 'Transmitting to Spring Boot...'}</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};
