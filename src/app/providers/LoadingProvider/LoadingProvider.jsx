import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@shared/ui/loader';
import { LoadingContext } from './model/useLoadingProviderContext';
import './styles/loadingProvider.css';

export const LoadingProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const value = useMemo(() => ({ show, setShow }), [show]);

  useEffect(() => {
    if (!show) return;

    const root = document.documentElement;
    const body = document.body;

    const scrollbarWidth = window.innerWidth - root.clientWidth;

    const prevHtmlOverflow = root.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      root.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
    };
  }, [show]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {show && (
        <div className="page-overlay">
          <Loader />
        </div>
      )}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = { children: PropTypes.node };
