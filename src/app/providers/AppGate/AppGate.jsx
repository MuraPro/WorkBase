// src/app/providers/AppGate.jsx
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '@features/auth';
import { useQualities } from '@features/quality';
import { useProfessions } from '@features/profession';
import { useGlobalLoading } from '@app/providers/LoadingProvider';

export const AppGate = ({ children }) => {
  const { isLoading: isAuthLoading } = useAuth();
  const { isLoading: isQualitiesLoading } = useQualities();
  const { isLoading: isProfLoading } = useProfessions();
  const { setShow } = useGlobalLoading();
  const isBootLoading = isAuthLoading || isQualitiesLoading || isProfLoading;

  useEffect(() => {
    setShow(isBootLoading);
  }, [isBootLoading, setShow]);

  return children;
};

AppGate.propTypes = {
  children: PropTypes.node.isRequired,
};
