import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CircuitBackground } from './components/CircuitBackground';
import { ResumeModal } from './components/ResumeModal';
import { AdminInboxModal } from './components/AdminInboxModal';
import { IntroAnimation } from './components/IntroAnimation';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Listen for #admin in URL and keyboard shortcuts (Ctrl+Shift+A or Alt+A)
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#inbox') {
        setAdminModalOpen(true);
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
          (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        setAdminModalOpen(prev => !prev);
      }
      if ((e.ctrlKey && (e.key === 'I' || e.key === 'i')) ||
          (e.altKey && (e.key === 'I' || e.key === 'i'))) {
        e.preventDefault();
        setShowIntro(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Opening Intro Animation */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      {/* Subtle Circuit Background */}
      <CircuitBackground />

      {/* Main Content Hierarchy */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar onOpenResume={() => setResumeModalOpen(true)} />

        <main id="main-content">
          <Hero onOpenResume={() => setResumeModalOpen(true)} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <Certifications />
          <Education />
          <Contact />
        </main>

        <Footer
          onOpenAdmin={() => setAdminModalOpen(true)}
          onReplayIntro={() => setShowIntro(true)}
        />
      </div>

      {/* Global Modals */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      <AdminInboxModal
        isOpen={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          if (window.location.hash.toLowerCase() === '#admin' || window.location.hash.toLowerCase() === '#inbox') {
            window.history.pushState(null, '', window.location.pathname + window.location.search);
          }
        }}
      />
    </div>
  );
};

export default App;
