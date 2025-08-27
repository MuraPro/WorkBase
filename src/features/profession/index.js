import { useProfessions } from './model/useProfessionContext';
import { useProfessionMethods } from './model/useProfessionMethods';
import ProfessionProvider from './providers/ProfessionProvider';
import professionService from './api/profession.service';
import Profession from './ui/profession';
import {
  loadProfessionsList,
  getProfessions,
  getProfessionsLoadingStatus,
  getProfessionById,
} from './slices/professions';
import professionsReducer from './slices/professions';

export {
  Profession,
  ProfessionProvider,
  useProfessions,
  professionService,
  useProfessionMethods,
  professionsReducer,
  loadProfessionsList,
  getProfessions,
  getProfessionsLoadingStatus,
  getProfessionById,
};
