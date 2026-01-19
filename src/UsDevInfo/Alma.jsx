import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Styles/Alma.css';

function Alma({ user }) {
  const navigate = useNavigate();

  return (
    <div className="Alma">
        <h1 className='Dev-Title'>בואי להכיר אותנו!</h1>
        <p className='Nametext'>עלמה: </p>
        <img
          src={`${process.env.PUBLIC_URL}/Assets/Ellipse.png`}
          className="Ellipse"
        />
        <img
          src={`${process.env.PUBLIC_URL}/Assets/People/Alma.png`}
          className='AlmaPic'
        />
        <img
          src={`${process.env.PUBLIC_URL}/Assets/speachBuble.png`}
          className='speachBuble'
        />
        <p className="bubble-text">
            הפז”ם עולם 
            בעיקרון הקמתי את היחידה. עברתי מלא מלחמות וקשיים עד שהגענו עד למשרד המהמם שאת יושבת בו.
            עשיתי שנתיים סדיר ומעל לחודש מילואים.
            אולי ניפגש בעתיד?
        </p>
        <button className='DevInfoBtn' onClick={() => navigate('/DevInfo')}>חזרה לכל המפתחות</button>
    </div>
  );
}


export default Alma;
