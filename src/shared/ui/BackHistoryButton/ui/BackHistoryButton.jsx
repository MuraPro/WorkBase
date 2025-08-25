import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackHistoryButton = () => {
  const navigate = useNavigate();

  return (
    <button className="btn btn-primary" onClick={() => navigate(-1)}>
      <i className="bi bi-caret-left"></i>
      Назад
    </button>
  );
};

export default BackHistoryButton;
