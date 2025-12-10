import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../FireBase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../ComponentsCss/Map.css";

export default function Map({ user: propUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(propUser); 
  const [currentStep, setCurrentStep] = useState(null);

  const steps = [
    { id: 0, label: "מבוא", right: 80, top: 700, path: null }, // לא לוחץ
    { id: 1, label: "היום יום", right: 350, top: 600, path: "/cloudsPage" },
    { id: 2, label: "השפה של המכללה", right: 600, top: 500, path: "/collageLanguge" },
    { id: 3, label: "ללמוד REACT", right: 800, top: 400, path: "/LearnReact" },
    { id: 4, label: "עיצובים וכלי עבודה", right: 1000, top: 300, path: "/FlipPage" },
    { id: 5, label: "התקנות", right: 1200, top: 200, path: "/cloudsPage5" },
    { id: 6, label: "פרויקט חפיפה", right: 1400, top: 20, path: "/cloudsPage6" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setUser({ uid: auth.currentUser.uid, ...docSnap.data() });
      }
    };
    fetchUser();
  }, [user]);

 useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      const ref = doc(db, "users", user.uid, "progress", "map");
      const snap = await getDoc(ref);
      if (snap.exists()) setCurrentStep(snap.data().currentStep);
      else {
        await setDoc(ref, { currentStep: 0 });
        setCurrentStep(0);
      }
    };
    fetchProgress();
  }, [user]);

  const updateProgress = async (newStep) => {
    const ref = doc(db, "users", user.uid, "progress", "map");
    await setDoc(ref, { currentStep: newStep });
    setCurrentStep(newStep);
  };

  if (!user || currentStep === null) return <div>טוען...</div>;


  return (
    <div className="Map">
      <h1 className="map-title">התקדמות בלומדה </h1>
      {steps.map((step) => {
        const isCurrent = step.id === currentStep;
        const isNext = step.id === currentStep + 1;
        const isCompleted = step.id < currentStep;
        const isLast = step.id === steps.length - 1;

        // הענן עצמו – רק למעט האחרון
        let cloudImage = null;
        let cloudClass = "cloud-img";

        if (!isLast) {
          if (isCurrent || isCompleted) {
            cloudImage = `${process.env.PUBLIC_URL}/Assets/pinkCloud.png`;
            cloudClass = "pink-cloud";
          } else {
            cloudImage = `${process.env.PUBLIC_URL}/Assets/whiteCloud.png`;
            cloudClass = "cloud-img";
          }
        }

        // קלאס טקסט – רק השלב הבא אחרי הנוכחי מקבל ורוד
        const labelClass = isNext ? "cloud-label unlocked" : "cloud-label";

        // האם ניתן ללחוץ? רק אם זה הנוכחי, הבא, או אם כבר הושלם
        const canClick = isCurrent || isNext || isCompleted || isLast;

        // דמות
        let personImg = null;
        let personClass = null;
        if (isLast) {
          personImg = `${process.env.PUBLIC_URL}/Assets/People/AvitalSIT.png`;
          personClass = "avitalCLOUD";
        } else if (isCurrent) {
          personImg = `${process.env.PUBLIC_URL}/Assets/People/Alma.png`;
          personClass = "alma";
        }

        const handleClick = () => {
          if (!canClick) return;

          updateProgress(step.id);

          if (step.path) {
            navigate(step.path, { state: { user} });
          }
        };

        return (
          <div
            key={step.id}
            className={`cloud-step ${!canClick ? "locked" : ""}`}
            style={{ right: step.right, top: step.top }}
            onClick={handleClick}
          >
            {cloudImage && <img src={cloudImage} className={cloudClass} alt="" />}
            <div className={labelClass}>{step.label}</div>
            {personImg && <img src={personImg} className={personClass} alt="person" />}
            {isCurrent && !isLast && <div className="here">אני כאן</div>}
          </div>
        );
      })}
    </div>
  );
}
