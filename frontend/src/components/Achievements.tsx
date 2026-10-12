import React from 'react';
import { Award, Trophy, CheckCircle2 } from 'lucide-react';
import { ACHIEVEMENTS } from '../config/portfolioData';

const achIcons: Record<string, React.ReactNode> = {
  Award: <Award size={22} />,
  Trophy: <Trophy size={22} />,
  CheckCircle2: <CheckCircle2 size={22} />,
};

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="section" style={{ backgroundColor: 'rgba(11, 19, 36, 0.4)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>Milestones & Recognition</span>
          </div>
          <h2 className="section-title">Key Achievements</h2>
          <p className="section-subtitle">
            Notable competitive qualifications, international robotics event coordination, and institutional responsibilities.
          </p>
        </div>

        {/* Achievements Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
          className="achievements-grid"
        >
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className="card-top-circuit-line" />

              <div>
                {/* Header Row: Icon, Year & Category */}
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
                      border: '1px solid rgba(0, 242, 254, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)',
                      boxShadow: '0 0 16px rgba(0, 242, 254, 0.1)',
                    }}
                  >
                    {achIcons[item.iconName] || <Award size={22} />}
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--accent-cyan)',
                      background: 'rgba(0, 242, 254, 0.1)',
                      border: '1px solid rgba(0, 242, 254, 0.25)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.35,
                    marginBottom: '0.85rem',
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.9125rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </div>

              {/* Badge Footer */}
              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-divider)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span>Category:</span>
                <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{item.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
