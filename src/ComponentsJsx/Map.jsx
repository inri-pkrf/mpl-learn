import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../FireBase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../ComponentsCss/Map.css";

export default function Map({ user: propUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(propUser);
  const [loadingDelay, setLoadingDelay] = useState(true);
  const [currentStep, setCurrentStep] = useState(null);

  const steps = [
    { id: 0, label: "מבוא", right: 80, top: 700, path: "/FirstPage" },
    { id: 1, label: "היום יום", right: 350, top: 600, path: "/cloudsPage" },
    { id: 2, label: "השפה של המכללה", right: 600, top: 500, path: "/collageLanguge" },
    { id: 3, label: "ללמוד REACT", right: 800, top: 400, path: "/LearnReact",   state: {user,startStep: 0} },
    { id: 4, label: "עיצובים וכלי עבודה", right: 1000, top: 300, path: "/FlipPage" },
    { id: 5, label: "התקנות", right: 1200, top: 200, path: "/Downloads" },
    { id: 6, label: "פרויקט חפיפה", right: 1400, top: 20, path: "/cloudsPage6" },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setUser({ uid: currentUser.uid, ...docSnap.data() });
        else setUser({ uid: currentUser.uid });
      } else setUser(null);
    });
    return () => unsubscribe();
  }, []);

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

  useEffect(() => {
    const timer = setTimeout(() => setLoadingDelay(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const updateProgress = async (newStep) => {
    const ref = doc(db, "users", user.uid, "progress", "map");
    await setDoc(ref, { currentStep: newStep });
    setCurrentStep(newStep);
  };

  if (loadingDelay || !user || currentStep === null)
    return (
      <div className="Loading">
        <img className="Cat" src={`${process.env.PUBLIC_URL}/Assets/download.gif`} />
        <p>טוען...</p>
      </div>
    );

  return (
    <div className="Map">
      <h1 className="map-title">התקדמות בלומדה</h1>

      {steps.map((step) => {
        const isCurrent = step.id === currentStep;
        const isNext = step.id === currentStep + 1;
        const isCompleted = step.id < currentStep;
        const isLast = step.id === steps.length - 1;

        let cloudImage = null;
        let cloudClass = "cloud-img";

        if (!isLast) {
          if (isCurrent || isCompleted) {
            cloudImage = `${process.env.PUBLIC_URL}/Assets/pinkCloud.png`;
            cloudClass = "pink-cloud";
          } else {
            cloudImage = `${process.env.PUBLIC_URL}/Assets/whiteCloud.png`;
          }
        }

        const labelClass = isNext ? "cloud-label unlocked" : "cloud-label";
        const canClick = isCurrent || isNext || isCompleted || isLast;

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
            navigate(step.path, {
              state: {
                user,
                startStep: step.startStep ?? 0, // שולח את startStep ל-LearnReact
              },
            });
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
