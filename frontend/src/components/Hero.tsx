import React, { useState } from 'react';
import { ArrowRight, FileText, Sparkles, GraduationCap, Building2 } from 'lucide-react';
import { PERSONAL_INFO } from '../config/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - var(--header-height))',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '3rem',
        paddingBottom: '5rem',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem',
          }}
          className="hero-grid"
        >
          {/* Left Column: Heading & Introduction */}
          <div style={{ maxWidth: '640px' }}>
            {/* Availability Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.1)',
                marginBottom: '1.75rem',
              }}
            >
              <span className="pulse-dot pulse-dot-emerald" />
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  color: '#34d399',
                  letterSpacing: '0.04em',
                }}
              >
                {PERSONAL_INFO.badge}
              </span>
            </div>

            {/* Main Name Heading - strictly sharp and readable */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 3.85rem)',
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                marginBottom: '1.25rem',
              }}
            >
              Aitharaju{' '}
              <span
                style={{
                  color: 'var(--accent-cyan)',
                  textShadow: '0 0 35px rgba(0, 242, 254, 0.25)',
                }}
              >
                Sri Charan
              </span>
            </h1>

            {/* Professional Headline */}
            <h2
              style={{
                fontSize: 'clamp(1.15rem, 2.4vw, 1.45rem)',
                fontWeight: 600,
                color: 'var(--accent-blue)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '-0.01em',
                marginBottom: '1.25rem',
              }}
            >
              {PERSONAL_INFO.headline}
            </h2>

            {/* Supporting Description */}
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '2.25rem',
                maxWidth: '560px',
              }}
            >
              {PERSONAL_INFO.bio}
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <button
                onClick={handleScrollToProjects}
                className="btn btn-primary"
                style={{ gap: '0.625rem' }}
                aria-label="View My Projects"
              >
                <span>View My Work</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onOpenResume}
                className="btn btn-secondary"
                style={{ gap: '0.625rem' }}
                aria-label="View Resume"
              >
                <FileText size={18} />
                <span>View Resume</span>
              </button>
            </div>
          </div>

          {/* Right Column: Profile Frame & Academic Badge */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Ambient Lighting Behind Frame */}
            <div
              style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 242, 254, 0.28) 0%, rgba(56, 189, 248, 0.12) 40%, rgba(0, 242, 254, 0.04) 65%, transparent 80%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Profile Frame Container */}
            <div
              className="profile-frame-wrap"
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '370px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Circular Frame Wrapper with Enhanced Tech Orbit Rings */}
              <div
                style={{
                  position: 'relative',
                  width: 'clamp(290px, 32vw, 335px)',
                  height: 'clamp(290px, 32vw, 335px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Outer Dashed Circuit Orbit Ring */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '-14px',
                    borderRadius: '50%',
                    border: '1.5px dashed rgba(0, 242, 254, 0.42)',
                    pointerEvents: 'none',
                    animation: 'spinOrbit 45s linear infinite',
                  }}
                />

                {/* Inner Concentric Micro-Track Ring */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '-7px',
                    borderRadius: '50%',
                    border: '1px solid rgba(56, 189, 248, 0.22)',
                    pointerEvents: 'none',
                  }}
                />

                {/* 4 Cardinal Wafer Alignment Nodes */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-18px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-cyan)',
                    boxShadow: '0 0 12px var(--accent-cyan)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-18px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-cyan)',
                    boxShadow: '0 0 12px var(--accent-cyan)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '-18px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-blue)',
                    boxShadow: '0 0 10px var(--accent-blue)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: '-18px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-blue)',
                    boxShadow: '0 0 10px var(--accent-blue)',
                  }}
                />

                {/* Circular Photo Card */}
                <div
                  className="profile-card"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-card-solid)',
                    border: '3.5px solid rgba(0, 242, 254, 0.55)',
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 242, 254, 0.28)',
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  }}
                >
                  {!imageError ? (
                    <img
                      src={PERSONAL_INFO.profileImage}
                      alt="Aitharaju Sri Charan — ECE Student at Anurag University"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center 12%',
                        transition: 'opacity 0.3s ease',
                        opacity: imageLoaded ? 1 : 0.7,
                      }}
                    />
                  ) : (
                    /* Fallback placeholder if image fails */
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #0b1324 0%, #111e38 100%)',
                      }}
                    >
                      <div
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '50%',
                          background: 'rgba(0, 242, 254, 0.1)',
                          border: '1px solid var(--accent-cyan)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '0.75rem',
                          color: 'var(--accent-cyan)',
                        }}
                      >
                        <Sparkles size={24} />
                      </div>
                      <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff', marginBottom: '0.25rem' }}>
                        Aitharaju Sri Charan
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        /public/images/profile.jpg
                      </p>
                    </div>
                  )}

                  {/* Subtle Inner Gradient Overlay for depth */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, transparent 65%, rgba(7, 13, 24, 0.4) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Floating Academic Information Card Below Circle */}
              <div
                className="academic-card-floating"
                style={{
                  position: 'relative',
                  marginTop: '-22px',
                  width: '100%',
                  maxWidth: '340px',
                  zIndex: 2,
                  background: 'rgba(11, 22, 42, 0.94)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 242, 254, 0.35)',
                  borderRadius: '16px',
                  padding: '0.85rem 1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  boxShadow: '0 14px 32px rgba(0, 0, 0, 0.7), 0 0 16px rgba(0, 242, 254, 0.12)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(56, 189, 248, 0.1))',
                    border: '1px solid rgba(0, 242, 254, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={20} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.925rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <span>{PERSONAL_INFO.academicCard.degree}</span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      marginTop: '0.15rem',
                    }}
                  >
                    <Building2 size={13} style={{ color: 'var(--accent-blue)' }} />
                    <span>
                      {PERSONAL_INFO.academicCard.institution} · {PERSONAL_INFO.academicCard.period}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(0, 242, 254, 0.35) !important;
        }
        @keyframes spinOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};
