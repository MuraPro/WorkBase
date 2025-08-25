import { createContext, useContext } from 'react';

export const QualitiesContext = createContext(null);

export const useQualities = () => {
  const context = useContext(QualitiesContext);
  if (!context) {
    throw new Error('useQualities must be used within a QualitiesProvider');
  }
  return context;
};
