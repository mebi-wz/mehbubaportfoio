import React, { useState } from "react";
import Fade from "react-reveal";
import { Container, Row, Col } from "react-grid-system";

const Header = ({ data }) => {
  const [showBadge, setShowBadge] = useState(false);
  
  if (!data) return null;

  const { project, github, name, description, social } = data;
  const linkedinUrl = social?.find(s => s.name === "linkedin")?.url;

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
          <li className="current">
            <a className="smoothscroll" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#resume">
              Resume
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <Container className="banner">
        <Row style={{ alignItems: "center" }}>
          <Col md={5} className="banner-img">
            <Fade right duration={1000}>
              <div className="profile-image-container">
                {!showBadge ? (
                  <img 
                    className="mehbubaimag" 
                    src="images/picture1.jpg" 
                    alt={name} 
                    onClick={() => setShowBadge(true)}
                  />
                ) : (
                  <div className="linkedin-custom-badge inline-badge" onClick={() => setShowBadge(false)}>
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
                )}
              </div>
            </Fade>
          </Col>
          <Col md={7} className="banner-text">
            <Fade bottom duration={1000}>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200} delay={300}>
              <h3>{description}</h3>
            </Fade>
            <Fade bottom duration={1200} delay={600}>
              <div className="modern-actions">
                <a href={project} className="modern-btn btn-primary">
                  <i className="fa fa-book"></i> View Projects
                </a>
                <a href={github} className="modern-btn btn-secondary">
                  <i className="fa fa-github"></i> GitHub
                </a>
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
