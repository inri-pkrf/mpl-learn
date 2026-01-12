import React from "react";
import FlipCard from "../ComponentsJsx/FlipCards";
import "./Styles/FlipPage.css";
import { useLocation ,useNavigate } from 'react-router-dom';

const FlipPage = () => {
 const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

  const handleNavigate = () => {
  navigate('/map', { state: { user } });
};
  return (
    <div className="flip-page">
      <h1 className="FlipPage-title">
עיצובים וכלי עבודה עוד בתפקיד       </h1>
   <FlipCard title="התאמה למובייל">
        <p>
          <u>  אז איך מתאימים למובייל?:</u><br/>
         <a
            className="link-flip"
            href="https://docs.google.com/document/d/1Y3D4kBwS89CDxgFkJ48vF_-dbeAOFVaJ/edit"
            target="_blank"
            rel="noopener noreferrer"
          >
  כנסי לקישור ותלמדי (קצת כמו בל"ע אבל מה אני אעשה כותבת לומדה ביומיים חח)        </a>
       
        </p>


       
      </FlipCard>

      <FlipCard title="פונטים, אייקונים, תמונות וגרפיקות">
        <p>
          <u>  פונטים:</u><br/>
          משתמשים ב־Karantina לכותרות וב־Assistant לטקסט.
          אפשר להטמיע בקלות דרך Google Fonts בלי להוריד למחשב.
        </p>

        <p>
          <u>  אייקונים:</u><br/>
 <a
            className="link-flip"
            href="https://www.flaticon.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
   Flaticon –          </a>
       
           אתר חינמי עם מלא אייקונים.
          אפשר לשנות צבע ולהטמיע SVG.
        </p>

        <p>
          <u>תמונות:</u><br/>

           <a
            className="link-flip"
            href="https://www.freepik.com/"
            target="_blank"
            rel="noopener noreferrer"
          >  
          Freepik –    </a>
          
          הרבה גרפיקות, תמונות ואילוסטרציות.
          מורידים ומתקנים באילוסטרייטור לפי הצורך.
        </p>

        <p>
          <u>תרגול חמוד   </u><br/>
למשחק חווה צריך 3 גרפיקות למחשב ולטלפון<br/>
          • אסם סגור
          <br/>
          • אסם פתוח (Hover)
          <br/>
          • אחו ריק
          <br/>
          וגם התאמת צבעים לאתר של הלקוח.
        </p>
      </FlipCard>

      <FlipCard title="BASE44 + קוד אינטראקטיבי">
        <p>
          
          <a
            className="link-flip"
            href="https://base44.com/"
            target="_blank"
            rel="noopener noreferrer"
          >  
       BASE44  </a>
          
          הוא כלי חדש שמייצר אתרים מטורפים לפי טקסט.
          הגרסה החינמית – 5 פרומפטים ביום.
          הוא לא מחליף אותך – הוא מחזק אותך.    <br/>
           <u> המשתמש שלו במייל :  </u>  
          <br/>
        
          inriimersive@gmail.com    <br/>
                     <u> 
          הסיסמה שלו  :  </u>  

          <br/>
          inri2025
        </p>
          (יש לנו גרסה בתשלום במייל הזה- אין הגבלה של פרומפטים)
        <p>
          משתמשות בו בעיקר ל
          
          <a
            className="link-flip"
            href="https://docs.google.com/presentation/d/182JdeagibyzIY_Khqox9xrzAWr-BALwER5K0iIOKfmU/edit?slide=id.g3afac18b343_0_21#slide=id.g3afac18b343_0_21"
            target="_blank"
            rel="noopener noreferrer"
          >  
        כיתה האימרסיבית  </a>
         
           בגלל המורכבות.
        </p>

       
      </FlipCard>
 <button
          className="next-button-fil"
          onClick={handleNavigate}
          style={{ cursor: "pointer", marginTop: "20px" }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/Assets/Arrow.png`}
            alt="המשך למפה"
          />
        </button>
    </div>
  );
};

export default FlipPage;
