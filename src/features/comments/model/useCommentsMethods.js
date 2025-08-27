import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import commentService from '../api/comment.service';
import { handleFirebaseError } from '@shared/lib/errors';
import { useSelector } from 'react-redux';
import { getCurrentUserData } from '@features/user';

export function useCommentsMethods() {
  const { userId } = useParams();
  const currentUser = useSelector(getCurrentUserData());
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const getComments = useCallback(async () => {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id,
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
    } catch (error) {
      handleFirebaseError(error);
    }
  }

  async function removeComment(id) {
    try {
      await commentService.removeComment(id);
      setComments((prevState) => prevState.filter((c) => c._id !== id));
    } catch (error) {
      handleFirebaseError(error);
    }
  }

  useEffect(() => {
    getComments();
  }, [userId, getComments]);

  return {
    comments,
    createComment,
    removeComment,
    isLoading,
  };
}
