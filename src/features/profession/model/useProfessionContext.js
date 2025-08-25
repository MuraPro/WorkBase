import { createContext, useContext } from 'react';

export const ProfessionContext = createContext(null);

export const useProfessions = () => {
  const context = useContext(ProfessionContext);
  if (!context) {
    throw new Error('useProfessions must be used within a ProfessionProvider');
  }
  return context;
};
