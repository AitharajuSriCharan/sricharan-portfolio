import React from 'react';
import { ArrowUp, Mail, Cpu, Heart, Shield, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../config/portfolioData';

interface FooterProps {
  onOpenAdmin?: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(0, 242, 254, 0.12)',
        backgroundColor: 'rgba(5, 10, 20, 0.95)',
        position: 'relative',
        zIndex: 10,
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="container">
        {/* Main Footer Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand / Bio */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#ffffff',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(0, 242, 254, 0.12)',
                  border: '1px solid var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                }}
              >
                <Cpu size={18} />
              </div>
              <span>{PERSONAL_INFO.fullName}</span>
            </div>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '360px',
                marginBottom: '1.5rem',
              }}
            >
              {PERSONAL_INFO.headline}
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {PERSONAL_INFO.socials.github && (
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-close-btn"
                  style={{ width: '38px', height: '38px' }}
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={18} />
                </a>
              )}
              {PERSONAL_INFO.socials.linkedin && (
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-close-btn"
                  style={{ width: '38px', height: '38px' }}
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={18} />
                </a>
              )}
              {PERSONAL_INFO.socials.email && (
                <a
                  href={`mailto:${PERSONAL_INFO.socials.email}`}
                  className="modal-close-btn"
                  style={{ width: '38px', height: '38px' }}
                  aria-label="Send Email"
                >
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1.25rem',
              }}
            >
              Navigation
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.625rem',
              }}
            >
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Experience', href: '#experience' },
                { label: 'Achievements', href: '#achievements' },
                { label: 'Education', href: '#education' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-muted)',
                      transition: 'color var(--trans-fast)',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent-cyan)')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic & Focus Summary */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1.25rem',
              }}
            >
              Academic Focus
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              Department of Electronics & Communication Engineering, Anurag University, Hyderabad.
            </p>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--accent-blue)',
              }}
            >
              Targeting VLSI, RTL Design, FPGA & Embedded Systems Internships
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-divider)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span>© {currentYear} {PERSONAL_INFO.fullName}. Crafted with</span>
            <Heart size={14} style={{ color: '#ef4444', display: 'inline' }} />
            <span>for VLSI & Hardware Engineering.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.785rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-dim)',
                  backgroundColor: 'rgba(0, 242, 254, 0.04)',
                  border: '1px solid rgba(0, 242, 254, 0.15)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--trans-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-cyan)';
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 242, 254, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-dim)';
                  e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.15)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 242, 254, 0.04)';
                }}
                title="Open Admin Messages Inbox (Ctrl+Shift+A)"
                aria-label="Admin Messages Inbox"
              >
                <Shield size={13} style={{ color: 'var(--accent-cyan)' }} />
                <span>Admin Inbox</span>
              </button>
            )}

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.785rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-dim)',
                  backgroundColor: 'rgba(56, 189, 248, 0.04)',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--trans-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-blue)';
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-dim)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.15)';
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.04)';
                }}
                title="Replay Opening Intro Animation (Ctrl+I)"
                aria-label="Replay Opening Intro Animation"
              >
                <Sparkles size={13} style={{ color: 'var(--accent-blue)' }} />
                <span>Replay Intro</span>
              </button>
            )}

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="btn btn-secondary btn-sm"
              style={{
                gap: '0.5rem',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
              }}
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
