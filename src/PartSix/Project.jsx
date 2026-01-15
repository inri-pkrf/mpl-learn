import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Styles/Project.css';

function Project({ user }) {
  const navigate = useNavigate();

  return (
    <div className="Project"
      style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/Assets/PinkBackground.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
      }}
    >
        <h1 className='Dev-Title'>בשעה טובה!</h1>
        <p className='Dev-Title2'>סיימת את הלומדה בהצלחה! הגיע הזמן קצת לתרגל את כל מה שלמדת ולהתנסות בעצמך. תיעזרי בנו בכל מה שאת צריכה, אנחנו תמיד כאן בשבילך, בשיהיה בהצלחה ❤️</p>
        <p className='Dev-Text'> בלחיצה על הכפתור "לפרויקט החפיפה" יפתח לך הדרייב עם התיקייה הנכונה, בתוך התיקייה יש מסמך דרישות הלקוח, סטוריבורד וחומר מקצועי. עליך לעבור ולקרוא את כל המסמכים ואז למלא את הסטוריבורד, אחרי שתסיימי תקראי לי לעזרה והמלצות ואז תתחילי לעצב את הלומדה. תחילה תעצבי את כל הלומדה למסך מחשב ולמובייל בפיגמה ואז תעברי לvscode.</p>
        <h2 className='Dev-Title3'>בהצלחה!</h2>
        <button className='projectBtn' onClick={() => window.open('https://drive.google.com/drive/folders/1df18CiMLS1aTDhqTLSTktCn5dcySRO-Z?usp=drive_link', '_blank')}>לפרויקט החפיפה</button>
    </div>
  );
}


export default Project;
