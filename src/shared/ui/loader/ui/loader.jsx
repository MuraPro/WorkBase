import React from 'react';

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center container"
      style={{
        height: 'min(100vh, 600px)',
      }}
    >
      <div
        className="spinner-border text-primary"
        style={{ width: '3rem', height: '3rem' }}
        role="status"
      >
        <span className="visually-hidden">Загрузка...</span>
      </div>
    </div>
  );
};

export default Loader;
