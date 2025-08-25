import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { UsersListPage } from '@pages/usersListPage';
import { UserPage } from '@pages/userPage';
import { EditPage } from '@app/providers/router/editRoute';

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
