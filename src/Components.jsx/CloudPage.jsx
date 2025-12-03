import React from 'react';
import { useParams } from 'react-router-dom';
import clodeData from '../Data/CloudData';
import '../Components.css/CloudPage.css';

const CloudPage = () => {
  const { id } = useParams();
  const pageData = clodeData.find(item => item.id === parseInt(id));

  if (!pageData) return <p>לא נמצא תוכן</p>;

  return (
    <div className="cloud-page">
      {pageData.pages.map((page, index) => (
        <div key={index} className="cloud-page-item">
            <h1>{page.title}</h1>
          {/* קונטיינר יחסי שמחזיק תמונה + טקסט */}
          <div className="cloud-img-wrapper">
            <img
              src={`${process.env.PUBLIC_URL}/Assets/${page.image}`}
              alt={page.title}
              className="cloud-page-img"
            />

            <div className="cloud-text">
              <h3>{page.subtitle}</h3>
              <p>{page.text}</p>
            </div>
          </div>

          {/* הכותרת הראשית מחוץ לתמונה */}
        </div>
      ))}
    </div>
  );
};

export default CloudPage;
