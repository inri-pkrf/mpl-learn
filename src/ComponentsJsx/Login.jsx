import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FireBase";
import { doc, getDoc } from "firebase/firestore";
import "../ComponentsCss/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      const docRef = doc(db, "users", userCredential.user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) throw new Error("משתמש לא נמצא");

      const userData = { uid: userCredential.user.uid, name: docSnap.data().full_name, ...docSnap.data() };
alert(`ברוכה הבאה, ${userData.name}!`);


      // מעבר ל-FirstPage עם שם והתקדמות
      navigate("/firstPage", { state: { user: userData } });
    } catch (error) {
      alert(`שגיאה בכניסה: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">עמוד התחברות</h1>
      <img
        src={`${process.env.PUBLIC_URL}/Assets/People/Avital.png`}
        className="Avital"
      />
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "טוען..." : "כניסה"}
        </button>
      </form>
    </div>
  );
};

export default Login;
