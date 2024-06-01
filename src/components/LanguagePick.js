import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import './LanguagePick.css'; // Import the CSS file

const LanguageSelectionPage = () => {
  const navigate = useNavigate();

  const handleLanguageSelection = (language) => {
    navigate(`/Home/${language}`);
  };

  return (
    <div>
      <Navbar />
      <h1 ></h1>
      <center className='MT'>
      <div className="language-container">
        <div className="language-button" onClick={() => handleLanguageSelection('English')}>English</div>
        <div className="language-button" onClick={() => handleLanguageSelection('Tamil')}>Tamil</div>
        <div className="language-button" onClick={() => handleLanguageSelection('Malayalam')}>Malayalam</div>
        <div className="language-button" onClick={() => handleLanguageSelection('Hindi')}>Hindi</div>
      </div>
      </center>
    </div>
  );
};

export default LanguageSelectionPage;
