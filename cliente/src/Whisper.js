import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usaFlag from './images/us-flag.png';
import spanishFlag from './images/es-flag.png';
import './Whisper.css';

const Whisper = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate('/conversation', { state: { selectedLanguage } });

  };

  return (
    <div className="whisper-container">
      <form onSubmit={handleSubmit}>
        <div className="flag-container">
          <label>
            <img src={usaFlag} alt="US Flag" className="flag" />
            <input
              type="radio"
              value="en"
              checked={selectedLanguage === 'en'}
              onChange={handleLanguageChange}
            />
            English
          </label>
        </div>
        <div className="flag-container">
          <label>
            <img src={spanishFlag} alt="Spanish Flag" className="flag" />
            <input
              type="radio"
              value="es"
              checked={selectedLanguage === 'es'}
              onChange={handleLanguageChange}
            />
            Spanish
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Whisper;
