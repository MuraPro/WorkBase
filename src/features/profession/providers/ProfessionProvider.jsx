import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@shared/ui/loader';
import { ProfessionContext } from '../model/useProfessionContext';
import { useProfessionMethods } from '../model/useProfessionMethods';

const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { getProfessionsList, getProfession } = useProfessionMethods(
    setProfessions,
    setLoading
  );

  useEffect(() => {
    getProfessionsList();
  }, [getProfessionsList]);

  return (
    <ProfessionContext.Provider
      value={{
        professions,
        isLoading,
        getProfession: (id) => getProfession(id, professions),
      }}
    >
      {!isLoading ? children : <Loader />}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.node,
};

export default ProfessionProvider;
