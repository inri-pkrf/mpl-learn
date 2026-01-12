import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../ComponentsCss/DevInfo.css';

function DevInfo({ user }) {
  const navigate = useNavigate();

  return (
    <div className="DevInfo">
        <h1 className='Dev-Title'>בואי להכיר אותנו!</h1>
        <p className='Dev-Title2'>לחצי על הבועה המתאימה להסבר נוסף על המפתחת</p>
        <img
          src={`${process.env.PUBLIC_URL}/Assets/People/Together.png`}
          className="Together"
        />

        <div className="image-container" id="NameCloud-1">
            <img
                src={`${process.env.PUBLIC_URL}/Assets/NameCloud.png`}
                alt="NameCloud"
            />
            <span className="text">אביטל</span>
        </div>
        
        <div className="image-container" id="NameCloud-2">
            <img
                src={`${process.env.PUBLIC_URL}/Assets/NameCloud.png`}
                alt="NameCloud"
            />
            <span className="text">אליאורה</span>
        </div>

        <div className="image-container" id="NameCloud-3">
            <img
                src={`${process.env.PUBLIC_URL}/Assets/NameCloud.png`}
                alt="NameCloud"
                className="mirror-img"
            />
            <span className="text">עלמה</span>
        </div>

        <img
          src={`${process.env.PUBLIC_URL}/Assets/Ellipse.png`}
          className="Ellipse"
        />

    </div>
  );
}


export default DevInfo;
