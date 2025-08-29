import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderWave } from '@shared/ui/loaderWave';
import { QualityBadge } from '@shared/ui/quality';
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList,
} from '../slices/qualities';

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualities));

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, [dispatch]);

  if (!qualities?.length) return null;

  if (isLoading) return <LoaderWave />;

  return (
    <>
      {qualitiesList.map((qual) => {
        return <QualityBadge key={qual._id} {...qual} />;
      })}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array,
};

export default QualitiesList;
