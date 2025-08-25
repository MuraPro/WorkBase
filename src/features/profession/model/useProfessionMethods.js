import { useCallback } from 'react';
import { handleFirebaseError } from '@shared/lib/errors';
import ProfessionService from '../api/profession.service';

export function useProfessionMethods(setProfessions, setLoading) {
  const getProfessionsList = useCallback(async () => {
    try {
      const { content } = await ProfessionService.get();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      handleFirebaseError(error);
    }
  }, [setLoading, setProfessions]);

  const getProfession = (id, list) => list.find((p) => p._id === id);

  return { getProfessionsList, getProfession };
}
