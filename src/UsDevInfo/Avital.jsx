import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Styles/Avital.css';

function Avital({ user }) {
  const navigate = useNavigate();

  return (
    <div className="AvitalPage">
        <h1 className='Dev-Title'>בואי להכיר אותנו!</h1>
        <p className='Nametext'>אביטל:</p>
        <img
          src={`${process.env.PUBLIC_URL}/Assets/Ellipse.png`}
          className="Ellipse"
        />
        <img
          src={`${process.env.PUBLIC_URL}/Assets/People/Avital.png`}
          className='AvitalPic'
        />
        <img
          src={`${process.env.PUBLIC_URL}/Assets/speachBuble.png`}
          className='speachBuble'
        />
          <p className="bubble-text">
                ממש הרגע השתחררתי 
                זה הפרויקט האחרון והכי כיפי שלי בשירות
                כתבתי לכן את כל התכנים של הלומדה  מקווה שתהנו ממנה
                אולי ניפגש במילואים 
        </p>
        <button className='DevInfoBtn' onClick={() => navigate('/DevInfo')}>חזרה לכל המפתחות</button>
    </div>
  );
}


export default Avital;
