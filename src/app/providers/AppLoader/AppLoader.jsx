import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfessionsLoadingStatus,
  loadProfessionsList,
} from '@entities/profession';
import {
  getQualitiesLoadingStatus,
  loadQualitiesList,
} from '@entities/quality';
import {
  getDataStatus,
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList,
} from '@entities/user';
import { useGlobalLoading } from '../LoadingProvider/model/useLoadingProviderContext';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const dataLoaded = useSelector(getDataStatus());
  const usersLoading = useSelector(getUsersLoadingStatus());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());

  const { setShow } = useGlobalLoading();

  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && !dataLoaded) {
      dispatch(loadUsersList());
    }
  }, [dispatch, isLoggedIn, dataLoaded]);

  useEffect(() => {
    const bootLoading = usersLoading || qualitiesLoading || professionsLoading;
    const t = setTimeout(() => setShow(bootLoading), bootLoading ? 100 : 0);
    return () => clearTimeout(t);
  }, [usersLoading, qualitiesLoading, professionsLoading, setShow]);

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
