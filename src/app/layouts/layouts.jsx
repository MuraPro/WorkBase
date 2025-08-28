import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { CustomLink } from '@shared/ui/customLink';
import { NavProfile } from '@features/navProfile';
import { getCurrentUserData } from '@features/user';
import Logo from '@assets/home.png';
import './style/layouts.css';

const Layout = () => {
  const currentUser = useSelector(getCurrentUserData());

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-white shadow-sm py-3 border-bottom site-header">
        <div className="container d-flex flex-wrap justify-content-between align-items-center responsive-center">
          <Link
            to="/"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <img
              src={Logo}
              alt="Logo"
              width="40"
              height="40"
              className="me-2"
            />
          </Link>
          <nav className="d-flex align-items-center mt-2 mt-md-0">
            <ul className="nav">
              <li className="nav-item ms-3 ms-sm-5">
                <CustomLink to="/" className="nav-link px-2 text-dark ms-5">
                  Главная
                </CustomLink>
              </li>
              {currentUser && (
                <li className="nav-item ms-3 ms-sm-5">
                  <CustomLink to="/users" className="nav-link px-2 text-dark">
                    Кандидаты
                  </CustomLink>
                </li>
              )}
            </ul>
            <div className="ms-3 ms-sm-5">
              {currentUser ? (
                <NavProfile />
              ) : (
                <CustomLink to="/login" className="nav-link px-2 text-dark">
                  Авторизация
                </CustomLink>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="container flex-grow-1 my-2 main-wrap">
        <Outlet />
      </main>

      <footer className="bg-white text-center py-4 mt-auto border-top shadow-sm site-footer">
        <div className="container">
          <p className="mb-0 text-muted small">
            © 2025 MuraPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
