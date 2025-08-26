import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { QualityBadge } from '@shared/ui/quality';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQualitiesLoadingStatus,
  getQualitiesByIds,
  loadQualitiesList,
} from '../slices/qualities';
import { LoaderWave } from '@shared/ui/loaderWave';

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
