import React, { useState } from 'react';
import { ExternalLink, Eye, Award, Clock } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../config/portfolioData';
import type { Project } from '../types';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [infoNotice, setInfoNotice] = useState<string | null>(null);

  const handleGitHubClick = (project: Project) => {
    if (project.githubUrl && project.githubUrl.trim() !== '') {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    } else {
      setInfoNotice(
        `Repository for "${project.title}" is currently maintained privately or undergoing local testing. You can configure this repository link in the portfolio settings.`
      );
      setTimeout(() => setInfoNotice(null), 4500);
    }
  };

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'rgba(11, 19, 36, 0.4)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="section-title">Projects & Hardware Systems</h2>
          <p className="section-subtitle">
            Hands-on prototypes spanning IoT water management, embedded safety sensors, biometric image analysis, and FPGA RTL acceleration.
          </p>
        </div>

        {/* Temporary Notification Banner for configurable links */}
        {infoNotice && (
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto 2rem auto',
              padding: '0.875rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#e0f2fe',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <span>{infoNotice}</span>
            <button
              onClick={() => setInfoNotice(null)}
              style={{ color: 'var(--accent-cyan)', fontWeight: 700, marginLeft: '1rem' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
          }}
          className="projects-grid"
        >
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="glass-card project-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div className="card-top-circuit-line" />

              {/* Project Visual / Diagram Frame */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9.5',
                  overflow: 'hidden',
                  backgroundColor: '#070f1e',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <img
                  src={project.image}
                  alt={`${project.title} diagram`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="project-image-zoom"
                />

                {/* Status Badges Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  {project.achievement && (
                    <span className="status-badge status-badge-selected">
                      <Award size={12} />
                      <span>SIH 2025</span>
                    </span>
                  )}
                  {project.status === 'In Progress' && (
                    <span className="status-badge status-badge-progress">
                      <Clock size={12} />
                      <span>In Progress</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Project Card Content */}
              <div
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Category */}
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-cyan)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {project.category}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.35,
                      marginBottom: '0.85rem',
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.9125rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Technology Chips */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.45rem',
                      marginBottom: '1.75rem',
                    }}
                  >
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-divider)',
                  }}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, gap: '0.45rem' }}
                    aria-label={`View details for ${project.title}`}
                  >
                    <Eye size={15} />
                    <span>View Project</span>
                  </button>

                  <button
                    onClick={() => handleGitHubClick(project)}
                    className={`btn ${project.githubUrl ? 'btn-outline-cyan' : 'btn-secondary'} btn-sm`}
                    style={{ gap: '0.45rem' }}
                    aria-label={`Open GitHub for ${project.title}`}
                    title={project.githubUrl ? 'Open GitHub Repository' : 'Repository Configurable'}
                  >
                    <GithubIcon size={15} />
                    <span>GitHub</span>
                    {project.githubUrl && <ExternalLink size={12} />}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`
        .project-card:hover .project-image-zoom {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
};
