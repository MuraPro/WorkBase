import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RegisterForm, LoginForm } from '@features/auth';

const AuthPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [formType, setFormType] = useState(
    type === 'register' ? 'register' : 'login'
  );

  const toggleFormType = () => {
    const newFormType = formType === 'register' ? 'login' : 'register';
    setFormType(newFormType);
    navigate(`/login/${newFormType}`);
  };

  useEffect(() => {
    setFormType(type === 'register' ? 'register' : 'login');
  }, [type]);

  return (
    <div className="container d-flex justify-content-center mt-1">
      {formType === 'register' ? (
        <RegisterForm toggleFormType={toggleFormType} />
      ) : (
        <LoginForm toggleFormType={toggleFormType} />
      )}
    </div>
  );
};

export default AuthPage;
