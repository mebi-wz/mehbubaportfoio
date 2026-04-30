import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);



  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="theme-toggle-wrapper">
      <button 
        className={`theme-toggle-btn ${isDarkMode ? 'dark' : 'light'}`} 
        onClick={toggleTheme}
        aria-label="Toggle Dark/Light Mode"
      >
        <div className="toggle-track">
          <div className="toggle-thumb">
            {isDarkMode ? (
              <i className="fa fa-moon-o"></i>
            ) : (
              <i className="fa fa-sun-o"></i>
            )}
          </div>
        </div>
      </button>

      <style jsx>{`
        .theme-toggle-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 20px;
        }

        .theme-toggle-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          outline: none;
          transition: transform 0.2s ease;
        }

        .theme-toggle-btn:hover {
          transform: scale(1.1);
        }

        .toggle-track {
          width: 50px;
          height: 26px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--glass-border);
          border-radius: 13px;
          position: relative;
          transition: background-color 0.3s ease;
          backdrop-filter: blur(5px);
        }

        [data-theme="light"] .toggle-track {
          background: rgba(0, 0, 0, 0.05);
        }

        .toggle-thumb {
          width: 20px;
          height: 20px;
          background: var(--primary-color);
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .toggle-thumb i {
          color: #fff;
          font-size: 12px;
        }

        .theme-toggle-btn.light .toggle-thumb {
          transform: translateX(24px);
          background: #f59e0b; /* Amber for sun */
        }

        @media only screen and (max-width: 768px) {
          .theme-toggle-wrapper {
            margin: 10px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ThemeToggle;
