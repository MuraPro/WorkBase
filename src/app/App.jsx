import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthPage } from '@pages/authPage';
import { LogOutPage } from '@pages/logOutPage';
import { MainPage } from '@pages/mainPage';
import Layout from './layouts/layouts';
import { AppLoader } from './providers/AppLoader';
import { LoadingProvider } from './providers/LoadingProvider';
import ProtectedRoute from './providers/ProtectedRoute/ProtectedRoute';
import { UsersRoutes } from './providers/router/usersRoutes';

function App() {
  return (
    <LoadingProvider>
      <AppLoader>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="login/:type?" element={<AuthPage />} />
            <Route
              path="users/*"
              element={
                <ProtectedRoute fallback={<div />}>
                  <UsersRoutes />
                </ProtectedRoute>
              }
            />
            <Route path="/logout" element={<LogOutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <ToastContainer />
      </AppLoader>
    </LoadingProvider>
  );
}

export default App;
