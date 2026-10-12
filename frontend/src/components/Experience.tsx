import React from 'react';
import { Users, Cpu, HeartHandshake } from 'lucide-react';
import { EXPERIENCES } from '../config/portfolioData';

const expIcons: Record<string, React.ReactNode> = {
  Users: <Users size={22} />,
  Cpu: <Cpu size={22} />,
  HeartHandshake: <HeartHandshake size={22} />,
};

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>Campus Roles & Activities</span>
          </div>
          <h2 className="section-title">Experience & Extracurriculars</h2>
          <p className="section-subtitle">
            Leadership, engineering club participation, and university volunteering engagements.
          </p>
        </div>

        {/* Experience Timeline / Cards */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative',
          }}
        >
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="glass-card"
              style={{
                padding: '2rem 2.25rem',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '1.75rem',
                alignItems: 'start',
              }}
            >
              <div className="card-top-circuit-line" />

              {/* Icon Container */}
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'rgba(0, 242, 254, 0.08)',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  boxShadow: '0 0 16px rgba(0, 242, 254, 0.1)',
                  flexShrink: 0,
                }}
              >
                {expIcons[exp.iconName] || <Users size={22} />}
              </div>

              {/* Details */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '0.4rem',
                  }}
                >
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                    {exp.role}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.775rem',
                      color: 'var(--accent-blue)',
                      backgroundColor: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    {exp.tag}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--accent-cyan)',
                    marginBottom: '0.85rem',
                  }}
                >
                  {exp.organization}
                </div>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                  }}
                >
                  {exp.description}
                </p>

                {/* Selected Event Experiences (Nested under role) */}
                {exp.selectedEvents && exp.selectedEvents.length > 0 && (
                  <div
                    style={{
                      marginTop: '1.5rem',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--border-divider)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--accent-cyan)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        Selected Event Experiences
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '1rem',
                      }}
                    >
                      {exp.selectedEvents.map((event, eIdx) => (
                        <div
                          key={eIdx}
                          style={{
                            padding: '1rem 1.15rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'rgba(10, 20, 38, 0.75)',
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '0.5rem',
                                marginBottom: '0.35rem',
                              }}
                            >
                              <h4
                                style={{
                                  fontSize: '0.95rem',
                                  fontWeight: 700,
                                  color: '#ffffff',
                                }}
                              >
                                {event.name}
                              </h4>
                              {event.year && (
                                <span
                                  style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.725rem',
                                    fontWeight: 600,
                                    color: 'var(--accent-cyan)',
                                    backgroundColor: 'rgba(0, 242, 254, 0.08)',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: 'var(--radius-full)',
                                  }}
                                >
                                  {event.year}
                                </span>
                              )}
                            </div>
                            <div
                              style={{
                                fontSize: '0.8rem',
                                color: 'var(--accent-blue)',
                                fontWeight: 600,
                                marginBottom: '0.5rem',
                              }}
                            >
                              {event.role}
                            </div>
                            <p
                              style={{
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.55,
                              }}
                            >
                              {event.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
