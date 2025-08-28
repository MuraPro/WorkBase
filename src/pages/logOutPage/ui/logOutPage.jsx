import React, { useEffect } from 'react';
import { logOut } from '@features/user';
import { Loader } from '@shared/ui/loader';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
