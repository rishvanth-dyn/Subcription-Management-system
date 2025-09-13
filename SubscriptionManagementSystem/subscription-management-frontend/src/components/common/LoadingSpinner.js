import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClass = {
    small: '20px',
    medium: '50px',
    large: '80px'
  };

  return (
    <div className="spinner-container">
      <div 
        className="spinner" 
        style={{ width: sizeClass[size], height: sizeClass[size] }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
