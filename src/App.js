import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/footer";
import About from "./components/about";
import Resume from "./components/resume";
import Portfolio from "./components/portfolio";
import Contact from "./components/contact";
import CustomCursor from "./components/CustomCursor";
import NoiseOverlay from "./components/NoiseOverlay";

const App = () => {
  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);

    const getResumeData = async () => {
      try {
        const response = await fetch("./resumeData.json");
        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };

    getResumeData();
  }, []);

  return (
    <div className="App">
      <CustomCursor />
      <NoiseOverlay />
      <Header data={resumeData.main} />
      <About data={resumeData.main} />
      <Resume data={resumeData.resume} />
      {/* Portfolio component was missing in original render but imported, adding it back if needed or keeping structure */}
      <Portfolio data={resumeData.portfolio} />
      <Contact data={resumeData.main} />
      <Footer data={resumeData.main} />
    </div>
  );
};

export default App;
