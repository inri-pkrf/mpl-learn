import React, { useState, useEffect } from 'react';
import CardsData from '../Data/CardsData';
import './Styles/CollageLang.css';
import { db } from '../FireBase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useLocation ,useNavigate } from 'react-router-dom';

const CollageLang = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;

  const [openCard, setOpenCard] = useState(null);
  const [completedCards, setCompletedCards] = useState([]);

  // טען את ההתקדמות של המשתמש מ-Firestore
  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      const ref = doc(db, 'users', user.uid, 'progress', 'completedCards');
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setCompletedCards(docSnap.data().cards || []);
      }
    };
    fetchProgress();
  }, [user]);

  const handleCardClick = async (cardId) => {
    setOpenCard(cardId);
    if (!completedCards.includes(cardId)) {
      const newCompleted = [...completedCards, cardId];
      setCompletedCards(newCompleted);

      // שמירה ב-Firestore
      const ref = doc(db, 'users', user.uid, 'progress', 'completedCards');
      await setDoc(ref, { cards: newCompleted }, { merge: true });
    }
  };

  const handleClose = () => {
    setOpenCard(null);
  };

  const allCompleted = completedCards.length === CardsData.length;

const handleNavigate = () => {
  navigate('/map', { state: { user } });
};
  return (
    <div className="CollageLang">
      {CardsData.map((card, index) => (
        <div
          key={card.id}
          className={`card ${openCard === card.id ? 'open' : ''}`}
          style={{ transform: openCard ? 'rotate(0deg)' : `rotate(${(index - 1) * 15}deg)` }}
          onClick={() => handleCardClick(card.id)}
        >
          <h2>{card.title}</h2>
          {completedCards.includes(card.id) && <span className="checkmark">✔</span>}
        </div>
      ))}

      {/* Overlay שחור על כל העמוד */}
     {openCard && (
  <div className="page-overlay">
    <div className="card-overlay">
      <img
        className='closeCard'
        onClick={handleClose}
        src={`${process.env.PUBLIC_URL}/Assets/close.png`}
        alt="Close"
      />
      
      {/* אם יש link בכרטיס, הופך את התמונה ללחיצה על קישור */}
      {CardsData.find(c => c.id === openCard).link ? (
        <a 
          href={CardsData.find(c => c.id === openCard).link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img
            className='img-overlay'
            src={process.env.PUBLIC_URL + CardsData.find(c => c.id === openCard).img}
            alt="Card"
          />
        </a>
      ) : (
        <img
          className='img-overlay'
          src={process.env.PUBLIC_URL + CardsData.find(c => c.id === openCard).img}
          alt="Card"
        />
      )}
    </div>
  </div>
)}


      {allCompleted && (
        <button
          className="next-button-col"
          onClick={handleNavigate}
          style={{ cursor: "pointer", marginTop: "20px" }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/Assets/Arrow.png`}
            alt="המשך למפה"
          />
        </button>
      )}
    </div>
  );
};

export default CollageLang;
