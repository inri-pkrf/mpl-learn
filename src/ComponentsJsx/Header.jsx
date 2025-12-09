import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../ComponentsCss/Header.css';

// import Hamburger from '../componentsJS/Hamburger';

function Header() {
  const navigate = useNavigate();


  return (
    <div className="header">
    
      <img
        src={`${process.env.PUBLIC_URL}/Assets/i-icon.png`}
        className="i-logo"
        alt="logo"
      />
     

      
      <div
        className="back-homeNav"
        onClick={() => navigate('/menu')} 
      >
              <img
        src={`${process.env.PUBLIC_URL}/Assets/pinkCloud.png`}
        className="menu-logo"
        alt="logo"
      />
      <p className='menu-back'>חזרה למפה</p>
      </div>

    
    </div>
  );
}

export default Header;
