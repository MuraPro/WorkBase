import { createContext, useContext } from 'react';

export const LoadingContext = createContext(null);

export const useGlobalLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) return { show: false, setShow: () => {} };
  return ctx;
};
