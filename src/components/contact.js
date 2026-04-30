import React, { useState } from "react";
import { Fade, Slide } from "../reveal";
import useMagnetic from "../hooks/useMagnetic";

const Contact = ({ data }) => {
  const magneticBtn = useMagnetic();
  const [formData, setFormData] = useState({
    fname: "",
    uemail: "",
    Subject: "",
    message1: ""
  });

  if (!data) return null;

  const { phone, email, contactmessage, address } = data;
  const { city, state } = address;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMail = (e) => {
    e.preventDefault();

    if (formData.fname && formData.uemail && formData.message1) {
      fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fname,
          email: formData.uemail,
          subject: formData.Subject || "Portfolio Contact Message",
          message: formData.message1
        })
      })
      .then(response => response.json())
      .then(result => {
        if (result.success === "true") {
          alert("Your message is sent to Mehbuba. She will communicate with you as soon as possible.");
          setFormData({ fname: "", uemail: "", Subject: "", message1: "" });
        } else {
          alert("Failed to send message: " + result.message);
        }
      })
      .catch(error => {
        console.error("Formsubmit Error:", error);
        alert("Failed to send message.");
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <section id="contact">
      <Fade bottom duration={1000}>
        <div className="row section-head">
          <div className="twelve columns">
            <h1><span>Get In Touch</span></h1>
            <p className="lead">{contactmessage}</p>
          </div>
        </div>
      </Fade>

      <div className="row">
        <Slide left duration={1000}>
          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <div className="contact-info-card">
                <div className="info-item">
                  <i className="fa fa-map-marker"></i>
                  <div>
                    <h4>Location</h4>
                    <p>{city}, {state}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fa fa-envelope"></i>
                  <div>
                    <h4>Email</h4>
                    <p>{email}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fa fa-phone"></i>
                  <div>
                    <h4>Phone</h4>
                    <p>{phone}</p>
                  </div>
                </div>
              </div>

              <div className="social-card">
                <h4>Social Network</h4>
                <ul className="social-links">
                  {data.social.map((network) => (
                    <li key={network.name}>
                      <a href={network.url}>
                        <i className={network.className}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </Slide>

        <Slide right duration={1000}>
          <div className="eight columns">
            <div className="contact-form-wrapper">
              <form id="contactForm" onSubmit={sendMail}>
                <div className="form-group">
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder=" "
                    value={formData.fname}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="fname">Your Name</label>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="uemail"
                    name="uemail"
                    placeholder=" "
                    value={formData.uemail}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="uemail">Your Email</label>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="Subject"
                    name="Subject"
                    placeholder=" "
                    value={formData.Subject}
                    onChange={handleChange}
                  />
                  <label htmlFor="Subject">Subject</label>
                </div>

                <div className="form-group">
                  <textarea
                    id="message1"
                    name="message1"
                    placeholder=" "
                    value={formData.message1}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <label htmlFor="message1">Message</label>
                </div>

                <button className="submit premium-btn" type="submit" ref={magneticBtn}>
                  Send Message <i className="fa fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default Contact;
