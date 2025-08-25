import React, { useState, useRef, useEffect } from 'react';
import { CustomLink } from '@shared/ui/customLink';
import { useAuth } from '@features/auth';
import '../styles/main.css';

const NavProfile = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownWidth, setDropdownWidth] = useState(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth);
    }
  }, [currentUser?.name]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className="btn d-flex align-items-center bg-transparent custom-link"
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
      >
        <span className="me-2 fw-medium">{currentUser.name}</span>
        <img
          src={currentUser.image}
          alt="User avatar"
          height="30"
          width="30"
          className="rounded-circle me-2"
        />
        <i
          className={`bi bi-caret-down-fill transition-icon ${
            isOpen ? 'rotate-icon' : ''
          }`}
        ></i>
      </button>

      <ul
        className={`dropdown-menu dropdown-menu-end text-center animated-dropdown${
          isOpen ? ' show' : ''
        }`}
        style={{ minWidth: dropdownWidth || 'auto' }}
      >
        <li>
          <CustomLink
            className="dropdown-item py-2 nav-link text-dark"
            to={`/users/${currentUser._id}`}
          >
            Профиль
          </CustomLink>
        </li>
        <li>
          <CustomLink
            className="dropdown-item py-2 nav-link px-2 text-dark"
            to="/logout"
          >
            Выйти
          </CustomLink>
        </li>
      </ul>
    </div>
  );
};

export default NavProfile;
