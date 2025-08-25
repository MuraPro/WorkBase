import { createContext, useContext } from 'react';

export const CommentsContext = createContext(null);

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentsProvider');
  }
  return context;
};
