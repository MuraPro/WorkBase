import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginForm, RegisterForm } from '@features/authForm';

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
    <div className="container d-flex justify-content-center mt-3 mb-3">
      {formType === 'register' ? (
        <RegisterForm toggleFormType={toggleFormType} />
      ) : (
        <LoginForm toggleFormType={toggleFormType} />
      )}
    </div>
  );
};

export default AuthPage;
