import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Button } from 'react-bootstrap';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <Button 
      variant={darkMode ? "light" : "dark"} 
      onClick={toggleTheme} 
      className="theme-toggle-btn"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? '☀️' : '🌙'}
    </Button>
  );
};

export default ThemeToggle;
