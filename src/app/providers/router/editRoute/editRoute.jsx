import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { EditUserPage } from '@pages/editUserPage';
import { useSelector } from 'react-redux';
import { getCurrentUserData, getUsersLoadingStatus } from '@features/user';

const EditPage = () => {
  const { userId } = useParams();
  const currentUser = useSelector(getCurrentUserData());
  const isLoading = useSelector(getUsersLoadingStatus());

  if (isLoading) return null;

  if (!currentUser) return <Navigate to="/login" replace />;

  if (currentUser._id !== userId) {
    return <Navigate to={`/users/${currentUser._id}/edit`} replace />;
  }

  return <EditUserPage />;
};

export default EditPage;
