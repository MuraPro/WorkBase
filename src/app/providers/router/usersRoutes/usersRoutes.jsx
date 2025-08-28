import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserPage } from '@pages/userPage';
import { UsersListPage } from '@pages/usersListPage';
import EditPage from '../editRoute/editRoute';

const UsersRoutes = () => {
  return (
    <Routes>
      <Route index element={<UsersListPage />} />
      <Route path=":userId" element={<UserPage />} />
      <Route path=":userId/edit" element={<EditPage />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
};

export default UsersRoutes;
