import React from "react";
import Slide from "react-reveal";

const Resume = ({ data }) => {
  if (!data) return null;

  const { skillmessage, education, work, skills } = data;

  const educationList = education.map((edu) => (
    <div key={edu.school} className="resume-item">
      <h3>{edu.school}</h3>
      <p className="info">
        {edu.degree} <span>&bull;</span>
        <em className="date">{edu.graduated}</em>
      </p>
      <p>{edu.description}</p>
    </div>
  ));

  const workList = work.map((job) => (
    <div key={job.company} className="resume-item">
      <h3>{job.company}</h3>
      <p className="info">
        {job.title}
        <span>&bull;</span> <em className="date">{job.years}</em>
      </p>
      <p>{job.description}</p>
    </div>
  ));

  const skillList = skills.map((skill) => {
    return (
      <div key={skill.name} className="skill-chip">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-level-pill">{skill.level}</span>
      </div>
    );
  });

  return (
    <section id="resume">
      <Slide left duration={1300}>
        <div className="row education">
          <div className="three columns header-col">
            <h1>
              <span>Education</span>
            </h1>
          </div>
          <div className="nine columns main-col">
            <div className="timeline-container">{educationList}</div>
          </div>
        </div>
      </Slide>

      <Slide left duration={1300}>
        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Work</span>
            </h1>
          </div>
          <div className="nine columns main-col">
            <div className="timeline-container">{workList}</div>
          </div>
        </div>
      </Slide>

      <Slide left duration={1300}>
        <div className="row skill">
          <div className="three columns header-col">
            <h1>
              <span>Skills</span>
            </h1>
          </div>
          <div className="nine columns main-col">
            <p className="skill-message">{skillmessage}</p>
            <div className="skill-grid">{skillList}</div>
          </div>
        </div>
      </Slide>
    </section>
  );
};

export default Resume;
