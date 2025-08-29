import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import {
  getCurrentUserData,
  getCurrentUserId,
  getUsersLoadingStatus,
} from '@entities/user';
import { EditUserPage } from '@pages/editUserPage';

const EditPage = () => {
  const { userId } = useParams();
  const currentUser = useSelector(getCurrentUserData());
  const currentUserId = useSelector(getCurrentUserId());
  const isLoading = useSelector(getUsersLoadingStatus());

  if (isLoading) return null;

  if (!currentUser) return <Navigate to="/login" replace />;

  if (currentUserId !== userId) {
    return <Navigate to={`/users/${currentUserId}/edit`} replace />;
  }

  return <EditUserPage />;
};

export default EditPage;
