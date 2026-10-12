import React, { useState } from 'react';
import { Award, ExternalLink, Cpu, CheckCircle } from 'lucide-react';
import { CERTIFICATIONS } from '../config/portfolioData';
import type { CertificationItem } from '../types';

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <section id="certifications" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>Specialized Training</span>
          </div>
          <h2 className="section-title">Certifications & Workshops</h2>
          <p className="section-subtitle">
            Hands-on technical workshops completed in embedded systems and VLSI design flows.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="glass-card"
              style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className="card-top-circuit-line" />

              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(0, 242, 254, 0.08)',
                      border: '1px solid rgba(0, 242, 254, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    <Award size={22} />
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.775rem',
                      color: 'var(--accent-cyan)',
                      background: 'rgba(0, 242, 254, 0.08)',
                      border: '1px solid rgba(0, 242, 254, 0.2)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    {cert.category}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.35,
                    marginBottom: '0.6rem',
                  }}
                >
                  {cert.title}
                </h3>

                {cert.organizer && (
                  <div
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--accent-blue)',
                      fontWeight: 600,
                      marginBottom: '1rem',
                    }}
                  >
                    {cert.organizer}
                  </div>
                )}

                <p
                  style={{
                    fontSize: '0.9125rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {cert.description}
                </p>
              </div>

              {/* Action / Configurable Link Footer */}
              <div
                style={{
                  marginTop: '1.75rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-divider)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <CheckCircle size={14} style={{ color: 'var(--accent-emerald)' }} />
                  <span>Verified Workshop Participation</span>
                </div>

                <button
                  onClick={() => setSelectedCert(cert)}
                  className="btn btn-outline-cyan btn-sm"
                  style={{ gap: '0.4rem', padding: '0.35rem 0.75rem' }}
                >
                  <span>Info</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification / Info Modal */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)} role="dialog" aria-modal="true">
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                Workshop Verification
              </h3>
              <button onClick={() => setSelectedCert(null)} className="modal-close-btn" aria-label="Close">
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'rgba(0, 242, 254, 0.1)',
                  border: '1px solid var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  marginBottom: '1.25rem',
                }}
              >
                <Cpu size={28} />
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                {selectedCert.title}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                {selectedCert.description}
              </p>

              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(15, 27, 49, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                }}
              >
                <p style={{ marginBottom: '0.5rem', color: '#ffffff', fontWeight: 600 }}>
                  Certificate Attachment Note:
                </p>
                <p>
                  To attach a physical or PDF certificate scan, configure the file path in{' '}
                  <code style={{ color: 'var(--accent-cyan)' }}>portfolioData.ts</code> or the public directory.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setSelectedCert(null)} className="btn btn-secondary btn-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
