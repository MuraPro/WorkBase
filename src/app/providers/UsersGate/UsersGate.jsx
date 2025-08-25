import { useEffect } from 'react';
import { useUser } from '@features/user';
import { useGlobalLoading } from '../LoadingProvider/model/useLoadingProviderContext';

export const UsersGate = ({ children }) => {
  const { isLoading } = useUser();
  const { setShow } = useGlobalLoading();
  useEffect(() => {
    setShow(isLoading);
  }, [isLoading, setShow]);
  return children;
};
