// src/app/providers/AppGate.jsx
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUsersLoadingStatus } from '@features/user';
import { getQualitiesLoadingStatus } from '@features/quality';
import { getProfessionsLoadingStatus } from '@features/profession';
import { useGlobalLoading } from '@app/providers/LoadingProvider';
getQualitiesLoadingStatus;

export const AppGate = ({ children }) => {
  const isUsersLoading = useSelector(getUsersLoadingStatus());
  const isQualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const isProfLoading = useSelector(getProfessionsLoadingStatus());
  const { setShow } = useGlobalLoading();

  const isBootLoading = isUsersLoading || isQualitiesLoading || isProfLoading;

  useEffect(() => {
    setShow(isBootLoading);
  }, [isBootLoading, setShow]);

  return children;
};

AppGate.propTypes = {
  children: PropTypes.node.isRequired,
};
