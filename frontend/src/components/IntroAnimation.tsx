import React, { useState, useEffect, useCallback } from 'react';
import { Cpu, ArrowRight, Sparkles } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

interface GreetingItem {
  text: string;
  lang: string;
  sub: string;
}

const GREETINGS: GreetingItem[] = [
  { text: 'నమస్కారం', lang: 'Telugu', sub: 'Namaskāram' },
  { text: 'नमस्ते', lang: 'Hindi', sub: 'Namaste' },
  { text: 'Hello', lang: 'English', sub: 'Welcome' },
  { text: 'வணக்கம்', lang: 'Tamil', sub: 'Vanakkam' },
  { text: 'Bonjour', lang: 'French', sub: 'Bienvenue' },
  { text: 'こんにちは', lang: 'Japanese', sub: 'Konnichiwa' },
  { text: 'Hola', lang: 'Spanish', sub: 'Bienvenido' },
  { text: 'Willkommen', lang: 'German', sub: 'Willkommen' },
  { text: 'Welcome', lang: 'ECE Hardware Lab', sub: 'System Initialized' },
];

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [stage, setStage] = useState<'greetings' | 'name' | 'exiting' | 'done'>('greetings');
  const [isSkipped, setIsSkipped] = useState(false);

  // Skip handler
  const handleSkip = useCallback(() => {
    if (isSkipped) return;
    setIsSkipped(true);
    setStage('exiting');
    setTimeout(() => {
      setStage('done');
      onComplete();
    }, 450);
  }, [isSkipped, onComplete]);

  // Keyboard shortcut listener (ESC or Space to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  // Stage 1: Cycle through greetings
  useEffect(() => {
    if (stage !== 'greetings') return;

    if (greetingIndex < GREETINGS.length - 1) {
      const timer = setTimeout(() => {
        setGreetingIndex((prev) => prev + 1);
      }, 260); // 260ms per greeting
      return () => clearTimeout(timer);
    } else {
      // Finished all greetings -> move to Name Reveal
      const timer = setTimeout(() => {
        setStage('name');
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [greetingIndex, stage]);

  // Stage 2: Name reveal display duration
  useEffect(() => {
    if (stage !== 'name') return;

    const timer = setTimeout(() => {
      setStage('exiting');
      setTimeout(() => {
        setStage('done');
        onComplete();
      }, 700);
    }, 1800); // 1.8s for name reveal

    return () => clearTimeout(timer);
  }, [stage, onComplete]);

  // Lock body scroll while intro is playing
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (stage === 'done') {
    return null;
  }

  const currentGreeting = GREETINGS[greetingIndex];
  const isExiting = stage === 'exiting';

  return (
    <div
      className={`intro-overlay ${isExiting ? 'intro-overlay-exiting' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#040812',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Circuit Grid Background Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.08) 0%, transparent 60%),
            linear-gradient(rgba(56, 189, 248, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 36px 36px, 36px 36px',
          opacity: 0.85,
        }}
      />

      {/* Ambient Silicon Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, rgba(56, 189, 248, 0.03) 50%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'pulseGlow 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Top Skip Button */}
      <button
        onClick={handleSkip}
        className="intro-skip-btn"
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '24px',
          background: 'rgba(14, 25, 45, 0.65)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          color: '#94a3b8',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono, monospace)',
          letterSpacing: '0.05em',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#00f2fe';
          e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.6)';
          e.currentTarget.style.background = 'rgba(14, 25, 45, 0.9)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#94a3b8';
          e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
          e.currentTarget.style.background = 'rgba(14, 25, 45, 0.65)';
        }}
      >
        <span>SKIP</span>
        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>[Esc]</span>
        <ArrowRight size={13} />
      </button>

      {/* Main Center Stage */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '24px',
          maxWidth: '850px',
          width: '100%',
        }}
      >
        {stage === 'greetings' && (
          <div
            key={currentGreeting.text}
            className="intro-greeting-container"
            style={{
              animation: 'greetingSlide 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            {/* Live Indicator Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(0, 242, 254, 0.08)',
                border: '1px solid rgba(0, 242, 254, 0.2)',
                color: '#38bdf8',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#00f2fe',
                  boxShadow: '0 0 10px #00f2fe',
                }}
              />
              <span>{currentGreeting.lang}</span>
            </div>

            {/* Large Animated Greeting Word */}
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: 0,
                textShadow: '0 0 35px rgba(0, 242, 254, 0.45)',
                fontFamily: 'var(--font-sans, sans-serif)',
              }}
            >
              {currentGreeting.text}
            </h1>

            {/* Pronunciation / Subtitle */}
            <p
              style={{
                margin: 0,
                fontSize: '1rem',
                color: '#94a3b8',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.06em',
              }}
            >
              {currentGreeting.sub}
            </p>

            {/* Progress Dots */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                marginTop: '18px',
              }}
            >
              {GREETINGS.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: idx === greetingIndex ? '20px' : '6px',
                    height: '5px',
                    borderRadius: '4px',
                    backgroundColor: idx === greetingIndex ? '#00f2fe' : 'rgba(148, 163, 184, 0.2)',
                    transition: 'all 0.25s ease',
                    boxShadow: idx === greetingIndex ? '0 0 8px #00f2fe' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {stage === 'name' && (
          <div
            className="intro-name-reveal"
            style={{
              animation: 'nameGrandReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Engineering Chip Monogram Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '8px',
                background: 'rgba(14, 25, 45, 0.85)',
                border: '1px solid rgba(0, 242, 254, 0.4)',
                boxShadow: '0 0 20px rgba(0, 242, 254, 0.2)',
                marginBottom: '16px',
                color: '#00f2fe',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.12em',
                animation: 'chipPulse 1.8s ease-in-out infinite',
              }}
            >
              <Cpu size={15} style={{ color: '#00f2fe' }} />
              <span>&lt;ASC /&gt; PORTFOLIO INITIALIZED</span>
              <Sparkles size={14} style={{ color: '#38bdf8' }} />
            </div>

            {/* Glowing Name Reveal - Fully Responsive with Protected Word Breaks */}
            <h1
              className="intro-name-title"
              style={{
                fontSize: 'clamp(1.85rem, 5.5vw, 4rem)',
                fontWeight: 900,
                letterSpacing: 'clamp(0.02em, 0.4vw, 0.05em)',
                margin: '0 0 14px 0',
                lineHeight: 1.2,
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #ffffff 0%, #00f2fe 45%, #38bdf8 85%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'var(--font-sans, sans-serif)',
                animation: 'textGlowShimmer 2.4s ease-in-out infinite',
                padding: '0 8px',
                textAlign: 'center',
                maxWidth: '100%',
              }}
            >
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>AITHARAJU</span>{' '}
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>SRI CHARAN</span>
            </h1>

            {/* Dynamic Circuit Line Divider */}
            <div
              style={{
                width: 'clamp(180px, 55vw, 480px)',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, #00f2fe 50%, transparent 100%)',
                boxShadow: '0 0 14px #00f2fe',
                margin: '10px 0 18px 0',
                animation: 'lineGlow 1.4s ease-in-out infinite',
              }}
            />

            {/* Domain Specialization Tag */}
            <p
              style={{
                fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)',
                fontWeight: 600,
                color: '#cbd5e1',
                margin: '0 0 10px 0',
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-sans, sans-serif)',
                padding: '0 12px',
              }}
            >
              Electronics &amp; Communication Engineer
            </p>

            {/* Sub-specialization Badges */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '6px',
                maxWidth: '560px',
                padding: '0 12px',
              }}
            >
              {['VLSI Design', 'RTL Synthesis', 'Embedded Systems', 'IoT Solutions'].map((spec, i) => (
                <span
                  key={spec}
                  style={{
                    padding: '5px 14px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(14, 25, 45, 0.8)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    color: '#38bdf8',
                    fontSize: 'clamp(0.75rem, 1.8vw, 0.825rem)',
                    fontFamily: 'var(--font-mono, monospace)',
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    animation: `tagPulse 2.5s ease-in-out ${i * 0.2}s infinite`,
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Status Line */}
            <div
              style={{
                marginTop: '22px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.78rem',
                color: '#34d399',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.06em',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                  animation: 'pulseGlow 1.5s ease-in-out infinite',
                }}
              />
              <span>ENTERING HARDWARE SHOWCASE...</span>
            </div>
          </div>
        )}
      </div>

      {/* Embedded CSS Keyframes for High-Performance Hardware Animation */}
      <style>{`
        @keyframes greetingSlide {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes nameGrandReveal {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(18px);
            filter: blur(8px);
          }
          60% {
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }

        @keyframes chipPulse {
          0%, 100% {
            border-color: rgba(0, 242, 254, 0.35);
            box-shadow: 0 0 15px rgba(0, 242, 254, 0.2);
          }
          50% {
            border-color: rgba(0, 242, 254, 0.8);
            box-shadow: 0 0 25px rgba(0, 242, 254, 0.45);
          }
        }

        @keyframes lineGlow {
          0%, 100% {
            opacity: 0.6;
            box-shadow: 0 0 10px #00f2fe;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px #00f2fe;
          }
        }

        @keyframes textGlowShimmer {
          0%, 100% {
            filter: drop-shadow(0 0 18px rgba(0, 242, 254, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 35px rgba(0, 242, 254, 0.85)) drop-shadow(0 0 55px rgba(56, 189, 248, 0.45));
          }
        }

        @keyframes tagPulse {
          0%, 100% {
            border-color: rgba(56, 189, 248, 0.25);
            transform: translateY(0);
          }
          50% {
            border-color: rgba(0, 242, 254, 0.65);
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  );
};
