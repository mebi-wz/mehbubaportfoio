import React, { useState } from "react";
import Fade from "../reveal";
import ImageLightbox from "./ImageLightbox";

const Portfolio = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!data) return null;

  const projectsList = data.projects.map((project, index) => {
    let projectImage = "images/portfolio/" + project.image;

    return (
      <div key={index} className="columns portfolio-item">
        <div 
          className="item-wrap" 
          onClick={() => setSelectedImage({ src: projectImage, title: project.title })}
          style={{ cursor: "zoom-in" }}
        >
          <img alt={project.title} src={projectImage} />

          <div className="portfolio-item-meta">
            <h5>{project.title}</h5>
            <p>{project.category}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section id="portfolio">
      <Fade left duration={1000} distance="40px">
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>Check Out Some of My Works.</h1>
            <div
              id="portfolio-wrapper"
              className="bgrid-halves s-bgrid-halves cf"
            >
              {projectsList}
            </div>
          </div>
        </div>
      </Fade>

      <ImageLightbox 
        src={selectedImage?.src}
        alt={selectedImage?.title}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
};

export default Portfolio;
