import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@shared/ui/loader';
import { logOut } from '@entities/user';

const LogOutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
    navigate('/', { replace: true });
  }, [dispatch, navigate]);
  return <Loader />;
};

export default LogOutPage;
