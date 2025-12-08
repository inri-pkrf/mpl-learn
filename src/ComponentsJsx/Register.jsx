import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../FireBase";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../ComponentsCss/Register.css";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!fullName || !email || !password) {
      setError("אנא מלא את כל השדות");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // עדכון פרופיל עם שם מלא
      await updateProfile(userCredential.user, { displayName: fullName });

      // שליחת אימייל אימות
      await sendEmailVerification(userCredential.user);

      // שמירה ב-Firestore עם שם והתקדמות התחלתית
      await setDoc(doc(db, "users", userCredential.user.uid), {
        full_name: fullName,
        email: email,
        progress: 0,
      });

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div className="register-container">
        <h2 className="Enternce-title">נרשמת בהצלחה!</h2>
        <p className="register-text">
          נשלח אליך מייל לאימות. אנא בדוק את תיבת המייל (כולל ספאם) ולחץ על הקישור לאישור החשבון.
        </p>
        <button className="register-button" onClick={() => navigate("/login")}>
          עבור להתחברות
        </button>
      </div>
    );
  }

  return (
    <div className="register-container">
      <h2 className="Register-title">הרשמה</h2>
      <img
        src={`${process.env.PUBLIC_URL}/Assets/People/Avital.png`}
        className="Avital"
        alt="Avital"
      />
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="שם מלא"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="סיסמה לפחות 6 תווים"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        {error && <p className="register-error">{error}</p>}
        <button className="register-button" type="submit">
          הרשמה
        </button>
      </form>
    </div>
  );
}
