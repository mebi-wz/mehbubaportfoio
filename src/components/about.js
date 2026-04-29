import React from "react";
import Fade from "react-reveal";
import useMagnetic from "../hooks/useMagnetic";

const About = ({ data }) => {
  const magneticButton = useMagnetic();
  if (!data) return null;

  const { name, image, bio, address, phone, email, resumedownload } = data;
  const profilepic = "images/" + image;
  const { street, city, state, zip } = address;

  return (
    <section id="about">
      <Fade duration={1000}>
        <div className="row">
          <div className="three columns about-left-col">
            <img
              className="profile-pic"
              src={profilepic}
              alt={name}
            />
            <div className="contact-card-small">
              <h3>Contact Details</h3>
              <ul className="address">
                <li><i className="fa fa-map-marker"></i> <span>{city}{state ? `, ${state}` : ""}</span></li>
                <li><i className="fa fa-phone"></i> <span>{phone}</span></li>
                <li><i className="fa fa-envelope"></i> <span>{email}</span></li>
              </ul>
            </div>
          </div>
          <div className="nine columns main-col">
            <div className="about-bio-modern">
              <h2>About Me</h2>
              <p>{bio}</p>
              <div className="download-section">
                <a
                  href={resumedownload}
                  target="_blank"
                  rel="noreferrer"
                  className="modern-btn btn-primary"
                  ref={magneticButton}
                >
                  <i className="fa fa-download"></i> Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default About;
