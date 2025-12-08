import React from 'react';
import buttonsData from '../Data/CloudButtonsData';
import './Styles/CloudButtonsPage.css';
import { useNavigate } from 'react-router-dom';

const CloudButtonsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="CloudButtonsPage">
      <div className="buttons-container">
        {buttonsData.map((btn) => (
          <button
            key={btn.id}
            className="cloud-button"
            onClick={() => navigate(`/page/${btn.id}`)}
          >
            <div className="cloud-image-wrapper">
              <img
                src={`${process.env.PUBLIC_URL}/PartOne/${btn.image}`}
                alt={btn.title}
                className="cloud-image"
              />
              <span className="cloud-text">{btn.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CloudButtonsPage;
