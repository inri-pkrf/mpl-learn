import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Styles/Project.css';

function Project({ user }) {
  const navigate = useNavigate();

  return (
    <div className="Project">
        <h1 className='Dev-Title'>בשעה טובה!</h1>
        <p className='Dev-Title2'>סיימת את הלומדה בהצלחה! הגיע הזמן קצת לתרגל את כל מה שלמדת ולהתנסות בעצמך. תיעזרי בנו בכל מה שאת צריכה, אנחנו תמיד כאן בשבילך, בשיהיה בהצלחה ❤️</p>

    </div>
  );
}


export default Project;
