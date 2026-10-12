import React from 'react';
import { Cpu, Activity, Code, CircuitBoard, Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../config/portfolioData';

const categoryIcons: Record<string, React.ReactNode> = {
  Cpu: <Cpu size={22} />,
  Activity: <Activity size={22} />,
  Code: <Code size={22} />,
  CircuitBoard: <CircuitBoard size={22} />,
  Layers: <Layers size={22} />,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>Technical Foundation</span>
          </div>
          <h2 className="section-title">Skills & Engineering Tools</h2>
          <p className="section-subtitle">
            Tools, hardware languages, and engineering concepts practiced across coursework, laboratory sessions, and independent projects.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.75rem',
          }}
          className="skills-grid"
        >
          {SKILL_CATEGORIES.map((category, idx) => (
            <div
              key={idx}
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
                {/* Category Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
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
                      boxShadow: '0 0 16px rgba(0, 242, 254, 0.1)',
                      flexShrink: 0,
                    }}
                  >
                    {categoryIcons[category.iconName] || <Cpu size={22} />}
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.3,
                      }}
                    >
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.5,
                  }}
                >
                  {category.description}
                </p>

                {/* Skill Badges / Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.625rem',
                  }}
                >
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="tech-tag"
                      style={{
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.8125rem',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Chip Indicator */}
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
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dim)',
                  }}
                >
                  {category.skills.length} competencies listed
                </span>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(0, 242, 254, 0.35)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
