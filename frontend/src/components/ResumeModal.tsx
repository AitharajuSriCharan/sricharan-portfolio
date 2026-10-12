import React, { useState, useEffect } from 'react';
import {
  X,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  Maximize2,
  Minimize2,
  Eye
} from 'lucide-react';
import { PERSONAL_INFO } from '../config/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [showPreview, setShowPreview] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resumeUrl = PERSONAL_INFO.socials.resume || 'https://drive.google.com/file/d/1J8blqYIfCdWulH8lvXGUX18DvsWH9o7D/view?usp=drive_link';
  
  // Extract Google Drive ID if present
  const driveIdMatch = resumeUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const driveId = driveIdMatch ? driveIdMatch[1] : '1J8blqYIfCdWulH8lvXGUX18DvsWH9o7D';
  
  const driveViewUrl = resumeUrl;
  const driveDownloadUrl = driveId
    ? `https://drive.google.com/uc?export=download&id=${driveId}`
    : '/resume.pdf';
  const drivePreviewUrl = driveId
    ? `https://drive.google.com/file/d/${driveId}/preview`
    : '/resume.pdf';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" style={{ zIndex: 1100 }}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: showPreview ? '880px' : '620px',
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
        {/* Modal Header */}
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
                background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(79, 172, 254, 0.2))',
                border: '1px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)',
              }}
            >
              <FileText size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  Curriculum Vitae / Resume
                </h3>
                <span
                  style={{
                    fontSize: '0.725rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    color: '#34d399',
                  }}
                >
                  Verified PDF
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
                Aitharaju Sri Charan — ECE Undergraduate (Anurag University)
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="modal-close-btn"
              title={showPreview ? 'Collapse preview' : 'Expand preview'}
              style={{
                color: showPreview ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                background: showPreview ? 'rgba(0, 242, 254, 0.1)' : undefined,
                borderColor: showPreview ? 'var(--accent-cyan)' : undefined,
              }}
            >
              {showPreview ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', flex: 1 }}>
          {/* Status Alert Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              marginBottom: '1.25rem',
            }}
          >
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              Official resume document is verified and linked via Google Drive.
            </div>
          </div>

          {/* Metadata Card */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(0, 242, 254, 0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '1.15rem 1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                fontSize: '0.85rem',
              }}
            >
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  TARGET ROLES:
                </span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>
                  VLSI, Digital Design, Embedded
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  ACADEMIC RECORD:
                </span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  CGPA: 8.49 / 10.0 (B.Tech ECE)
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  STATUS:
                </span>
                <span style={{ color: '#34d399', fontWeight: 600 }}>
                  Open to Internships (2026)
                </span>
              </div>
            </div>
          </div>

          {/* Embedded Document Previewer */}
          {showPreview && (
            <div
              style={{
                marginBottom: '1.5rem',
                border: '1px solid rgba(0, 242, 254, 0.2)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: '#0a101d',
                height: '480px',
              }}
            >
              <iframe
                src={drivePreviewUrl}
                title="Resume Preview"
                width="100%"
                height="100%"
                style={{ border: 'none', display: 'block' }}
                allow="autoplay"
              />
            </div>
          )}

          {/* Action Buttons Row */}
          <div
            style={{
              display: 'flex',
              gap: '0.875rem',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={driveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ flex: 1, minWidth: '180px', justifyContent: 'center', gap: '0.5rem' }}
            >
              <ExternalLink size={16} />
              <span>Open in Google Drive</span>
            </a>

            <a
              href={driveDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ flex: 1, minWidth: '160px', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn btn-secondary"
              style={{
                padding: '0.65rem 1rem',
                gap: '0.4rem',
                borderColor: showPreview ? 'var(--accent-cyan)' : undefined,
                color: showPreview ? 'var(--accent-cyan)' : undefined,
              }}
              title="Toggle inline document preview"
            >
              <Eye size={16} />
              <span>{showPreview ? 'Hide Preview' : 'Inline Preview'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
