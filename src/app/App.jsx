import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UsersRoutes } from '@app/providers/router/usersRoutes';
import ProtectedRoute from './providers/ProtectedRoute/ProtectedRoute';
import Layout from './layouts/layouts';
import { AuthPage } from '@pages/authPage';
import { MainPage } from '@pages/mainPage';
import { LogOutPage } from '@pages/logOutPage';
import { UserProvider } from '@features/user';
import { QualitiesProvider } from '@features/quality';
import { ProfessionProvider } from '@features/profession';
import { AuthProvider } from '@features/auth';
import { AppGate } from './providers/AppGate/AppGate';
import { UsersGate } from '@app/providers/UsersGate/UsersGate';
import { LoadingProvider } from '@app/providers/LoadingProvider';
import { AppLoader } from './providers/AppLoader';

function App() {
  return (
    <AppLoader>
      <AuthProvider>
        <ProfessionProvider>
          <LoadingProvider>
            <AppGate>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<MainPage />} />
                  <Route path="login/:type?" element={<AuthPage />} />
                  <Route
                    path="users/*"
                    element={
                      <ProtectedRoute>
                        <UserProvider>
                          <UsersGate>
                            <UsersRoutes />
                          </UsersGate>
                        </UserProvider>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/logout" element={<LogOutPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </AppGate>
          </LoadingProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </AppLoader>
  );
}

export default App;
