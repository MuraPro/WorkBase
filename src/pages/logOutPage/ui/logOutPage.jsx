import React, { useEffect } from 'react';
import { logOut } from '@features/user';
import { Loader } from '@shared/ui/loader';
import { useNavigate } from 'react-router-dom';

const LogOutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logOut();
    navigate('/', { replace: true });
  }, [navigate]);
  return <Loader />;
};

export default LogOutPage;
