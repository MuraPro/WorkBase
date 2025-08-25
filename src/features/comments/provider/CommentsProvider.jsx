import React from 'react';
import PropTypes from 'prop-types';
import { CommentsContext } from '../model/useCommentsContext';
import { useCommentsMethods } from '../model/useCommentsMethods';

export const CommentsProvider = ({ children }) => {
  const { comments, createComment, isLoading, removeComment } =
    useCommentsMethods();

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, isLoading, removeComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
