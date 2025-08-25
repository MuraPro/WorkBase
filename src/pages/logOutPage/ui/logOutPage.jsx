import React, { useEffect } from 'react';
import { useAuth } from '@features/auth';
import { Loader } from '@shared/ui/loader';

const LogOutPage = () => {
  const { logOut } = useAuth();
  useEffect(() => {
    logOut();
  }, [logOut]);
  return <Loader />;
};

export default LogOutPage;
