import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { EditUserPage } from '@pages/editUserPage';
import { useAuth } from '@features/auth';

const EditPage = () => {
  const { userId } = useParams();
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return null;

  if (!currentUser) return <Navigate to="/login" replace />;

  if (currentUser._id !== userId) {
    return <Navigate to={`/users/${currentUser._id}/edit`} replace />;
  }

  return <EditUserPage />;
};

export default EditPage;
