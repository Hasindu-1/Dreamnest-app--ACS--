import React, { useState } from 'react';
import './Header.css';

function Header({ inValue, setInValue, setSearchInput }) {
  // State for menu toggle
  const [isMenuClick, setIsMenuClick] = useState(false);

  // Handle the button click for filter property data to diplay in propery section
  const handleButtonClick = (type) => {
    setSearchInput((prevState) => ({
      ...prevState,//only changing the type not other subproperties
      type: type, // Update the search type (house, flat, any)
    }));
  };

  // Toggle function for responsive
  const toggleMenu = () => {
    setIsMenuClick(!isMenuClick);
  };

  return (
    <div className="header-container">
      {/* Header Main Content */}
      <div className="header-main">
        <h1 className="header-logo">NestDream</h1> 
        <button className="menu-toggle" onClick={toggleMenu}> {/* Toggle button for responsive  */}
          <i className="bi bi-list"></i> 
        </button>
      </div>

      {/* Caption for website */}
      <div className={`header-info ${isMenuClick ? 'show' : ''}`}>
        <h2 className="header-tagline">Your Dream Home Awaits</h2>
      </div>

      {/* Search bar is toggle button click chnage css className to display the responsive icons*/}
      <div className={`header-search ${isMenuClick ? 'show' : ''}`}>
        <input
          type="text"
          className="header-search-input"
          placeholder="Search by Property Name or Location" 
          value={inValue}
          onChange={(event) => setInValue(event.target.value)} 
        />
        {/* Buttons for that pass the value of the button to filter data */}
        <button
          className="header-search-button"
          onClick={() => handleButtonClick('house')}
        >
          House
        </button>
        <button
          className="header-search-button"
          onClick={() => handleButtonClick('flat')} 
        >
          Flat
        </button>
        <button
          className="header-search-button"
          onClick={() => handleButtonClick('any')}
        >
          Any
        </button>
      </div>
    </div>
  );
}

export default Header;
