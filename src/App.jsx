import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import GitHubStats from './components/GitHubStats';
import FaultyTerminal from './components/FaultyTerminal';

function App() {
  const [activeTab, setActiveTab] = useState('_hello');
  const scrollContainerRef = useRef(null);

  const sections = ['_hello', '_about-me', '_projects', '_experience', '_contact-me'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { root: scrollContainerRef.current, threshold: 0.5 }
    );

    const sectionElements = document.querySelectorAll('.portfolio-section');
    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    setActiveTab(targetId);
    const element = document.getElementById(targetId);
    if (element && scrollContainerRef.current) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="ide-frame">
      <nav className="ide-navbar">
        <div className="ide-navbar-left">
          <div className="ide-navbar-brand">joseph-johnson</div>
          <div className="ide-nav-links">
            <a href="#_hello" className={`ide-nav-item ${activeTab === '_hello' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, '_hello')}>_hello</a>
            <a href="#_about-me" className={`ide-nav-item ${activeTab === '_about-me' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, '_about-me')}>_about-me</a>
            <a href="#_projects" className={`ide-nav-item ${activeTab === '_projects' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, '_projects')}>_projects</a>
            <a href="#_experience" className={`ide-nav-item ${activeTab === '_experience' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, '_experience')}>_experience</a>
            <a href="#_github" className={`ide-nav-item ${activeTab === '_github' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, '_github')}>_github</a>
          </div >
        </div >
        <div className="ide-navbar-right">
          <a href="#_contact-me" className={`ide-nav-contact ${activeTab === '_contact-me' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, '_contact-me')}>_contact-me</a>
        </div >
      </nav >

      <FaultyTerminal
        scale={1.5}
        gridMul={[2, 1]}
        digitSize={1.2}
        timeScale={0.5}
        pause={false}
        scanlineIntensity={0.5}
        glitchAmount={1}
        flickerAmount={1}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        curvature={0.1}
        tint="#A7EF9E"
        mouseReact
        mouseStrength={0.5}
        pageLoadAnimation
        brightness={0.6}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.15 }}
      />
      <main className="ide-content-scrollable" ref={scrollContainerRef}>
        <section id="_hello" className="portfolio-section">
          <Hero />
        </section>
        <section id="_about-me" className="portfolio-section auto-height" style={{ display: 'flex', flexDirection: 'column', gap: '50px', paddingBottom: '100px' }}>
          <About />
          <Skills />
        </section>
        <section id="_projects" className="portfolio-section auto-height" style={{ paddingBottom: '100px' }}>
          <Projects />
        </section>
        <section id="_experience" className="portfolio-section auto-height" style={{ paddingBottom: '100px' }}>
          <Experience />
        </section>
        <section id="_github" className="portfolio-section auto-height" style={{ paddingBottom: '100px' }}>
          <GitHubStats />
        </section>
        <section id="_contact-me" className="portfolio-section">
          <Contact />
        </section>
      </main>

      <footer className="ide-footer">
        <div className="ide-footer-left">
          <div className="ide-footer-text">find me in:</div>
          <div className="ide-footer-socials">
            <a href="https://x.com/J0sefStack" target="_blank" rel="noreferrer" title="X">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 5.89501C21.2415 6.22384 20.43 6.44297 19.5855 6.54471C20.4578 6.02102 21.1274 5.20182 21.4426 4.22596C20.6253 4.70817 19.7348 5.06037 18.7997 5.25049C18.0267 4.42621 16.9209 3.90381 15.6983 3.90381C13.352 3.90381 11.4497 5.79727 11.4497 8.13459C11.4497 8.46618 11.4871 8.78877 11.5593 9.09893C8.03437 8.92212 4.90906 7.24355 2.82283 4.73507C2.4586 5.35824 2.24949 6.07921 2.24949 6.84501C2.24949 8.31295 3.0033 9.61054 4.1444 10.3691C3.47353 10.3479 2.82565 10.1652 2.2223 9.83383C2.2223 9.8516 2.2223 9.86937 2.2223 9.88713C2.2223 11.9331 3.68165 13.639 5.62677 14.0259C5.27151 14.121 4.89849 14.1729 4.51268 14.1729C4.24036 14.1729 3.9748 14.1462 3.71536 14.0957C4.25708 15.7725 5.81267 17.0006 7.66619 17.0343C6.21639 18.1691 4.38575 18.8475 2.40422 18.8475C2.06227 18.8475 1.72522 18.8274 1.39343 18.7888C3.27216 19.986 5.50361 20.6865 7.9015 20.6865C15.7118 20.6865 19.9823 14.218 19.9823 8.61111C19.9823 8.42878 19.9779 8.24645 19.9692 8.06648C20.7981 7.4691 21.5204 6.73238 22 5.89501Z" fill="currentColor" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/joseph-johnson-ba5808277" target="_blank" rel="noreferrer" title="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://github.com/JosefStack/" target="_blank" rel="noreferrer" title="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.873 20.17 8.84 21.46C9.34 21.55 9.52 21.24 9.52 20.98C9.52 20.75 9.51 20.14 9.51 19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.92 18.01 9.48 17.76C9.57 17.13 9.82 16.7 10.1 16.45C7.88 16.2 5.54 15.34 5.54 11.53C5.54 10.45 5.93 9.55 6.55 8.84C6.45 8.59 6.11 7.58 6.65 6.22C6.65 6.22 7.47 5.96 9.51 7.34C10.29 7.12 11.14 7.01 12 7.01C12.86 7.01 13.71 7.12 14.49 7.34C16.53 5.96 17.35 6.22 17.35 6.22C17.89 7.58 17.55 8.59 17.45 8.84C18.07 9.55 18.46 10.45 18.46 11.53C18.46 15.35 16.11 16.2 13.89 16.45C14.25 16.76 14.57 17.37 14.57 18.31C14.57 19.65 14.56 20.73 14.56 21.05C14.56 21.31 14.74 21.63 15.25 21.54C19.18 20.17 22 16.43 22 12C22 6.477 17.523 2 12 2Z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="ide-footer-right">
          <a href="https://github.com/JosefStack/" className="github-link" target="_blank" rel="noreferrer">
            <span>@JosefStack</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.873 20.17 8.84 21.46C9.34 21.55 9.52 21.24 9.52 20.98C9.52 20.75 9.51 20.14 9.51 19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.92 18.01 9.48 17.76C9.57 17.13 9.82 16.7 10.1 16.45C7.88 16.2 5.54 15.34 5.54 11.53C5.54 10.45 5.93 9.55 6.55 8.84C6.45 8.59 6.11 7.58 6.65 6.22C6.65 6.22 7.47 5.96 9.51 7.34C10.29 7.12 11.14 7.01 12 7.01C12.86 7.01 13.71 7.12 14.49 7.34C16.53 5.96 17.35 6.22 17.35 6.22C17.89 7.58 17.55 8.59 17.45 8.84C18.07 9.55 18.46 10.45 18.46 11.53C18.46 15.35 16.11 16.2 13.89 16.45C14.25 16.76 14.57 17.37 14.57 18.31C14.57 19.65 14.56 20.73 14.56 21.05C14.56 21.31 14.74 21.63 15.25 21.54C19.18 20.17 22 16.43 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </footer>
    </div >
  );
}

export default App;
