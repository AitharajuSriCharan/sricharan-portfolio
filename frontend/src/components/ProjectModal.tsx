import React from 'react';
import { X, ExternalLink, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent-cyan)',
                marginBottom: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {project.category}
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close project modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Project Visual Diagram */}
          <div
            style={{
              width: '100%',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              marginBottom: '1.5rem',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              backgroundColor: '#0a1426',
            }}
          >
            <img
              src={project.image}
              alt={`${project.title} diagram`}
              style={{ width: '100%', height: 'auto', maxHeight: '280px', objectFit: 'contain' }}
            />
          </div>

          {/* Achievement Badge if present */}
          {project.achievement && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#34d399',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '1.25rem',
              }}
            >
              <CheckCircle2 size={18} />
              <span>{project.achievement}</span>
            </div>
          )}

          {/* In Progress Notice if applicable */}
          {project.status === 'In Progress' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                color: '#fbbf24',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '1.25rem',
              }}
            >
              <AlertCircle size={18} />
              <span>Project Status: Active Research & In-Progress Development</span>
            </div>
          )}

          {/* Detailed Overview */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
              Project Architecture & Overview
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.95rem' }}>
              {project.viewDetails?.overview || project.description}
            </p>
          </div>

          {/* Key Takeaways */}
          {project.viewDetails?.keyTakeaways && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
                Key Technical Takeaways
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {project.viewDetails.keyTakeaways.map((takeaway, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.625rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>▹</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hardware & Tools Stack */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
              Technologies & Hardware Components
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-tag">
                  <Cpu size={12} style={{ color: 'var(--accent-cyan)' }} />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ gap: '0.5rem' }}
            >
              <GithubIcon size={16} />
              <span>Open GitHub Repository</span>
              <ExternalLink size={14} />
            </a>
          ) : (
            <div
              style={{
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>Repository link configurable via portfolio settings</span>
            </div>
          )}
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
