import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Styles/Eliora.css';

function Eliora({ user }) {
  const navigate = useNavigate();

  return (
    <div className="Eliora">
        <h1 className='Dev-Title'>בואי להכיר אותנו!</h1>
        <p className='Nametext'>אליאורה:</p>
        <img
          src={`${process.env.PUBLIC_URL}/Assets/Ellipse.png`}
          className="Ellipse"
        />
        <img
          src={`${process.env.PUBLIC_URL}/Assets/People/Eliora.png`}
          className='ElioraPic'
        />
        <img
          src={`${process.env.PUBLIC_URL}/Assets/speachBuble.png`}
          className='speachBuble'
        />
          <p className="bubble-text">
                בטח הכרת אותי קצת כבר,
                איתי את תבלי את רוב השירות
                אני כאן להכל ואשמח לעזור בכל רגע אם רק תרצי.
                מחכה כבר לפגוש אותך.
        </p>
        <button className='DevInfoBtn' onClick={() => navigate('/DevInfo')}>חזרה לכל המפתחות</button>
    </div>
  );
}


export default Eliora;
