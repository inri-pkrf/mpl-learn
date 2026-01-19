import React, { useState, useEffect } from 'react';
import './Styles/LearnReact.css';
import { db } from '../FireBase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useLocation , useNavigate } from 'react-router-dom';

const LearnReact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const startStep = location.state?.startStep ?? 0; // אם לא נשלח, 0

  const [currentStep, setCurrentStep] = useState(startStep);
  const [maxStep, setMaxStep] = useState(startStep);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // טען את ההתקדמות של המשתמש מ-Firestore
  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      const ref = doc(db, 'users', user.uid, 'progress', 'learnReact');
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const firestoreMaxStep = docSnap.data().maxStep || 0;

        // אם startStep הגיע מהניווט והוא יותר גדול מה־Firestore, נשאר בו
        const initialStep = startStep >= 0 ? startStep : firestoreMaxStep;

        setCurrentStep(initialStep);
        setMaxStep(Math.max(firestoreMaxStep, initialStep));
      }
    };
    fetchProgress();
  }, [user, startStep]);

  // שמירה ב-Firestore
  const saveProgress = async (step) => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'progress', 'learnReact');
    await setDoc(ref, { maxStep: step }, { merge: true });
  };

  const handleNext = () => {
    if (currentStep < 2) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setAnswerSelected(false);
      setIsCorrect(false);
      if (nextStep > maxStep) {
        setMaxStep(nextStep);
        saveProgress(nextStep);
      }
    } else if (currentStep === 2) {
      navigate("/map", { state: { user } });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnswerSelected(false);
      setIsCorrect(false);
    }
  };

  const handleAnswer = (choice) => {
    const correctChoice = "ג";
    setAnswerSelected(true);
    setIsCorrect(choice === correctChoice);
  };

  return (
    <div className="LearnReact">

      {/* שלב ראשון */}
      {currentStep === 0 && (
        <div className='fisrt'>
          <h1 className="react-title">ללמוד ריאקט</h1>
          <p className='react-txt'>
            לא יודעת אם את יודעת React מהקורס או לא. חלק עצום מהעבודה שלנו כאן הוא התכנות, 
            אז הנה <a href="https://scrimba.com/learn-react-c0e" target="_blank" rel="noopener noreferrer">קישור</a> לאתר שילמד אותך React רק שניישר קו.
          </p>
          <p className='react-txt-2'>
            חשוב מאוד במהלך הקורס יגידו לך אם בא לך תעבדי על המחשב שלך אז לא בכלל לא את עובדת אך ורק על הדפדפן של הקורס סופר נוח כמו VSCODE .
          </p>
          <img
            className='react1-img'
            src={`${process.env.PUBLIC_URL}/Assets/PartThree/react1.png`}
            alt="React Step 1"
          />
          <p className='order'>
            את לומדת עד לכאן, אם את מרגישה שאת יודעת כי יש שם דברים בסיסיים מוזמנת להתקדם אבל סופר חשוב שתשלטי בדאטה, פרופס. לא חושבת שמלמדים את זה בבסמ”ח
          </p>
        </div>
      )}

      {/* שלב שני – בוחן */}
      {currentStep === 1 && (
        <div className='second'>
          <h1 className="react-title">בוחן</h1>
          <p className='react-txt'>
            לפניך הקטע קוד הבא:
          </p>
          <img
            className='react2-img'
            src={`${process.env.PUBLIC_URL}/Assets/PartThree/react2.png`}
            alt="React Step 2"
          />
          <p className='order-2'>
            מה יקרה כאשר לוחצים על הכפתור?
          </p>

          <div className="quiz-buttons">
            <button className="quiz-btn" onClick={() => handleAnswer("א")}>
              א. הקומפוננטה Child יעדכן את props.number ישירות ולכן count יעלה.
            </button>
            <button className="quiz-btn" onClick={() => handleAnswer("ב")}>
              ב. לא יקרה כלום כי קומפוננטת Child לא יכול לשנות את הערכים של ההורה.
            </button>
            <button className="quiz-btn" onClick={() => handleAnswer("ג")}>
              ג. הפונקציה props.change תופעל, תעדכן את ה־state בהורה, והערך count יעלה ב־1.
            </button>
            <button className="quiz-btn" onClick={() => handleAnswer("ד")}>
              ד. React תזרוק שגיאה כי אסור להעביר פונקציה דרך props.
            </button>
          </div>

          {answerSelected && (
            <div className={`answer-feedback ${isCorrect ? "correct" : "wrong"}`}>
              {isCorrect ? "נכון!" : "לא נכון"}
              <p className='exp'>    למה:
            Child לא משנה את ה‑props ישירות.
            הכפתור מפעיל את props.change(), שמעדכן את ה‑state של Parent.
            React מרנדרת מחדש את Parent עם הערך החדש, וה‑Child מקבל את ה‑prop המעודכן (number).
            לכן, כל לחיצה על הכפתור מעלה את count ב‑1 ומעדכנת את המסך.</p>
            </div>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div className='third'>
          <h1 className="react-title">איך אנחנו עובדות בריאקט</h1>
          <p className='react-txt'>
           טוב אחרי שלמדת והבנת מה עשית בקוד הגיע הזמן שתעברי על 
            <a href="https://docs.google.com/document/d/1g6IxFzz1aj-rvDfyRQXNzfvUI7jnAJvzf9cGgA6jS1c/edit?tab=t.0" target="_blank" rel="noopener noreferrer"> סיכום </a> לאתר שילמד אותך React רק שניישר קו.
          של הכל ותביני בגדול איך אנחנו עובדות .
בהמשך תתחברי לגיטהאב שלנו ותוכלי לראות קודים שלנו ולהשתמש בהם בתור התחלה            
          </p>
          <img             
          className='react3-img'
          src={`${process.env.PUBLIC_URL}/Assets/People/Avital.png`}
          alt="React Step 3"
          />
        </div>
      )}

      <div className='navigation-btn'>
       {(currentStep < 3 || (currentStep === 1 && answerSelected)) && (
          <div onClick={handleNext} className='next'>
            <img className="arrow left" src={`${process.env.PUBLIC_URL}/Assets/Arrow.png`} />
          </div>
       )}
      </div>

    </div>
  );
};

export default LearnReact;

        // <button
        //   onClick={handleNext}
        //   className='next'
        //   style={{ cursor: "pointer", marginTop: "20px" }} >
        //   <img className="arrow left" src={`${process.env.PUBLIC_URL}/Assets/Arrow.png`} />
        // </button>