import React, { useState, useEffect } from "react";
import Fade from "../reveal";
import { Container, Row, Col } from "react-grid-system";

const Typewriter = ({ text, delay = 0 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 50); // fast typing speed
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, started]);

  return <span>{currentText}<span className="cursor-blink">|</span></span>;
};

const Header = ({ data }) => {
  const [showBadge, setShowBadge] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'resume', 'portfolio', 'contact'];
      let current = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!data) return null;

  const { github, name, description, social, email, phone } = data;
  const linkedinUrl = social?.find(s => s.name === "linkedin")?.url;
  const telegramUrl = social?.find(s => s.name === "telegram")?.url;

  return (
    <header id="home" className="modern-hero">
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>

        <ul id="nav" className="nav">
          <li className={activeSection === 'home' ? 'current' : ''}>
            <a className="smoothscroll" href="#home">Home</a>
          </li>
          <li className={activeSection === 'about' ? 'current' : ''}>
            <a className="smoothscroll" href="#about">About</a>
          </li>
          <li className={activeSection === 'resume' ? 'current' : ''}>
            <a className="smoothscroll" href="#resume">Resume</a>
          </li>
          <li className={activeSection === 'portfolio' ? 'current' : ''}>
            <a className="smoothscroll" href="#portfolio">Portfolio</a>
          </li>
          <li className={activeSection === 'contact' ? 'current' : ''}>
            <a className="smoothscroll" href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <Container className="banner">
        <Row style={{ alignItems: "center" }}>
          <Col md={5} className="banner-img">
            <Fade right duration={1000}>
              <div 
                className={`profile-flip-container ${showBadge ? 'is-flipped' : ''}`} 
                onClick={() => setShowBadge(!showBadge)}
              >
                <div className="profile-flip-inner">
                  <div className="profile-flip-front">
                     <img 
                       className="mehbubaimag" 
                       src="images/picture1.jpg" 
                       alt={name} 
                     />
                  </div>
                  <div className="profile-flip-back">
                     <div className="linkedin-custom-badge inline-badge">
                       <div className="badge-cover"></div>
                       <div className="badge-content">
                         <img className="badge-avatar" src="images/picture2.png" alt="Avatar" />
                         <h4>{name}</h4>
                         <p className="badge-desc">{description}</p>
                         <a href={linkedinUrl} target="_blank" rel="noreferrer" className="badge-connect-btn" onClick={(e) => e.stopPropagation()}>
                           <i className="fa fa-linkedin-square"></i> View Profile
                         </a>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            </Fade>
            <Fade bottom duration={1200} delay={3000}>
              <div className="hero-soft-skills-wrapper">
                <span className="floating-skill-pill pill-delay-1"><i className="fa fa-linux"></i> Comfortable working in Linux environments</span>
                <span className="floating-skill-pill pill-delay-2"><i className="fa fa-code"></i> Strong debugging and problem-solving mindset</span>
                <span className="floating-skill-pill pill-delay-3"><i className="fa fa-shield"></i> Trusted with production systems and critical fixes</span>
              </div>
            </Fade>
          </Col>
          <Col md={7} className="banner-text">
            <Fade bottom duration={1000}>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200} delay={300}>
              <h3><Typewriter text={description || ""} delay={1100} /></h3>
            </Fade>
            <Fade bottom duration={1200} delay={600}>
              <div className="modern-actions">
                <a className="smoothscroll modern-btn btn-primary" href="#contact">
                  <i className="fa fa-envelope"></i> Contact Me
                </a>
                <a href={github} className="modern-btn btn-secondary" style={{ marginRight: "10px" }}>
                  <i className="fa fa-github"></i> GitHub
                </a>
                {telegramUrl && (
                  <a href={telegramUrl} className="modern-btn btn-secondary">
                    <i className="fab fa-telegram"></i> Telegram
                  </a>
                )}
              </div>
            </Fade>
            <Fade bottom duration={1200} delay={1500}>
              <div className="hero-contact-card">
                <p>
                  <Typewriter 
                    text={`Odoo-focused Software Developer with hands-on experience in ERP customization, implementation, and optimization (Odoo.sh). Available for ERP services. Contact: ${email} | ${phone}`} 
                    delay={2000} 
                  />
                </p>
              </div>
            </Fade>
          </Col>
        </Row>
      </Container>

      <p className="scrolldown">
        <a className="smoothscroll" href="#about">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
};

export default Header;
