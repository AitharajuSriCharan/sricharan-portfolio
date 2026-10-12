import React from 'react';
import { GraduationCap, Building2, Calendar, Award, Cpu, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../config/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={20} />,
  Building2: <Building2 size={20} />,
  Calendar: <Calendar size={20} />,
  Award: <Award size={20} />,
  Cpu: <Cpu size={20} />,
};

export const About: React.FC = () => {
  return (
    <section id="about" className="section" style={{ backgroundColor: 'rgba(11, 19, 36, 0.4)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>Profile & Direction</span>
          </div>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Dedicated to RTL design, FPGA synthesis, and digital hardware engineering.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Left Column: Narrative Introduction & Key Highlights */}
          <div>
            <div
              className="glass-card"
              style={{
                padding: '2.25rem',
                marginBottom: '2rem',
              }}
            >
              <div className="card-top-circuit-line" />
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>Engineering Focus</span>
              </h3>

              {PERSONAL_INFO.aboutText.map((paragraph, idx) => (
                <p
                  key={idx}
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.02rem',
                    lineHeight: 1.75,
                    marginBottom: idx === PERSONAL_INFO.aboutText.length - 1 ? 0 : '1.25rem',
                  }}
                >
                  {paragraph}
                </p>
              ))}

              {/* Technical Core Highlights List */}
              <div
                style={{
                  marginTop: '1.75rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border-divider)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {[
                  'Hardware description & RTL modeling with Verilog HDL',
                  'FPGA prototyping & simulation using AMD/Xilinx Vivado',
                  'Microcontroller telemetry & sensor-based embedded systems',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: 'var(--text-main)',
                      fontSize: '0.9375rem',
                    }}
                  >
                    <CheckCircle size={17} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics / Quick Metrics Area */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
              }}
            >
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.85rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-cyan)',
                      lineHeight: 1.1,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#ffffff',
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-dim)',
                    }}
                  >
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic & Background Information Cards */}
          <div>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>Academic & Professional Details</span>
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {PERSONAL_INFO.academicCards.map((card, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(0, 242, 254, 0.08)',
                      border: '1px solid rgba(0, 242, 254, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)',
                      flexShrink: 0,
                    }}
                  >
                    {iconMap[card.icon] || <Cpu size={20} />}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '0.775rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {card.label}
                    </div>
                    <div
                      style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#ffffff',
                        lineHeight: 1.4,
                      }}
                    >
                      {card.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
