import React from "react";
import FlipCard from "../ComponentsJsx/FlipCards";
import "./Styles/FlipPage.css";

const FlipPage = () => {
  return (
    <div className="flip-page">

      <FlipCard title="פונטים, אייקונים, תמונות וגרפיקות">
        <p>
          פונטים: משתמשים ב־Karantina לכותרות וב־Assistant לטקסט.
          אפשר להטמיע בקלות דרך Google Fonts בלי להוריד למחשב.
        </p>

        <p>
          אייקונים: Flaticon – אתר חינמי עם מלא אייקונים.  
          אפשר לשנות צבע ולהטמיע SVG.
        </p>

        <p>
          תמונות: Freepik – הרבה גרפיקות, תמונות ואילוסטרציות.  
          מורידים ומתקנים באילוסטרייטור לפי הצורך.
        </p>

        <p>
          למשחק חווה:  
          יש צורך ב־3 גרפיקות למחשב ו־3 לטלפון:  
          • אסם סגור  
          • אסם פתוח (Hover)  
          • אחו ריק  
          וגם התאמת צבעים לאתר של הלקוח.
        </p>
      </FlipCard>

      <FlipCard title="BASE44 + קוד אינטראקטיבי">
        <p>
          BASE44 הוא כלי חדש שמייצר אתרים מטורפים לפי טקסט.  
          הגרסה החינמית – 20 פרומפטים ביום.  
          הוא לא מחליף אותך – הוא מחזק אותך.
        </p>

        <p>
          משתמשות בו בעיקר לכיתה האימרסיבית בגלל המורכבות.
        </p>

        <p>
          קוד לדוגמה שנתת (React): ניהול קלפים שנפתחים, בדיקת התקדמות,
          Firestore, ניווט ל־/map — הכל עובד מצוין ומסודר.
        </p>
      </FlipCard>

    </div>
  );
};

export default FlipPage;
