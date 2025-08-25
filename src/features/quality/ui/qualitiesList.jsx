import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useQualities } from '../model/useQualityContext';
import { LoaderWave } from '@shared/ui/loaderWave';

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQualities();

  if (!qualities?.length) return null;

  if (isLoading) return <LoaderWave />;

  return (
    <>
      {qualities.map((qual) => {
        const id = typeof qual === 'string' ? qual : qual._id;
        return <Quality key={id} id={id} />;
      })}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array,
};

export default QualitiesList;
