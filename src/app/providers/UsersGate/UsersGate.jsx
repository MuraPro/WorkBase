import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsersLoadingStatus,
  getDataStatus,
  loadUsersList,
} from '@features/user';
import { useGlobalLoading } from '../LoadingProvider/model/useLoadingProviderContext';

export const UsersGate = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getUsersLoadingStatus());
  const dataStatus = useSelector(getDataStatus());
  const { setShow } = useGlobalLoading();

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
    setShow(isLoading);
  }, [dispatch, isLoading, setShow, dataStatus]);

  return children;
};
