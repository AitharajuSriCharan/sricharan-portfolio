import React from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { EDUCATION_DATA } from '../config/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="section" style={{ backgroundColor: 'rgba(11, 19, 36, 0.4)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>Academic Pathway</span>
          </div>
          <h2 className="section-title">Education & Qualifications</h2>
          <p className="section-subtitle">
            Formal engineering studies and high academic achievements across secondary schooling.
          </p>
        </div>

        {/* Education Timeline */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            position: 'relative',
            paddingLeft: '2.5rem',
          }}
          className="education-timeline"
        >
          {/* Vertical Timeline Guide Line */}
          <div
            style={{
              position: 'absolute',
              top: '15px',
              bottom: '30px',
              left: '11px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-cyan), rgba(56, 189, 248, 0.2), transparent)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {EDUCATION_DATA.map((item, idx) => (
              <div key={item.id} style={{ position: 'relative' }}>
                {/* Timeline Dot Node */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '-2.5rem',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-primary)',
                    border: '2px solid var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 12px rgba(0, 242, 254, 0.4)',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-cyan)',
                    }}
                  />
                </div>

                {/* Timeline Card */}
                <div
                  className="glass-card"
                  style={{
                    padding: '2rem 2.25rem',
                  }}
                >
                  <div className="card-top-circuit-line" />

                  {/* Top Bar with Degree & Score */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          marginBottom: '0.35rem',
                        }}
                      >
                        {idx === 0 ? <GraduationCap size={20} style={{ color: 'var(--accent-cyan)' }} /> : <BookOpen size={18} style={{ color: 'var(--accent-blue)' }} />}
                        <span>{item.degree}</span>
                      </h3>

                      {item.institution && (
                        <div
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: 'var(--accent-blue)',
                          }}
                        >
                          {item.institution}
                        </div>
                      )}
                    </div>

                    {/* Score / Grade Tag */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.45rem 0.95rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(0, 242, 254, 0.08)',
                        border: '1px solid rgba(0, 242, 254, 0.3)',
                      }}
                    >
                      <Award size={15} style={{ color: 'var(--accent-cyan)' }} />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.95rem',
                          fontWeight: 800,
                          color: 'var(--accent-cyan)',
                        }}
                      >
                        {item.score}
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {item.scoreType}
                      </span>
                    </div>
                  </div>

                  {item.period && (
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8125rem',
                        color: 'var(--text-dim)',
                        marginBottom: '0.85rem',
                      }}
                    >
                      Duration: {item.period}
                    </div>
                  )}

                  <p
                    style={{
                      fontSize: '0.925rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: item.highlights ? '1.25rem' : 0,
                    }}
                  >
                    {item.details}
                  </p>

                  {/* Highlights if present */}
                  {item.highlights && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.45rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--border-divider)',
                      }}
                    >
                      {item.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <span style={{ color: 'var(--accent-cyan)' }}>▹</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
