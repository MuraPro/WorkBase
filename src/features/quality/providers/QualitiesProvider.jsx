import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import qualityService from '../api/quality.service';
import { QualitiesContext } from '../model/useQualityContext';
import { handleFirebaseError } from '@shared/lib/errors';

const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getQualities = useCallback(async () => {
    try {
      const { content } = await qualityService.fetchAll();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      handleFirebaseError(error);
    }
  }, []);

  useEffect(() => {
    getQualities();
  }, [getQualities]);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  return (
    <QualitiesContext.Provider value={{ qualities, getQuality, isLoading }}>
      {children}
    </QualitiesContext.Provider>
  );
};

QualitiesProvider.propTypes = {
  children: PropTypes.node,
};

export default QualitiesProvider;
