import professionService from './api/profession.service';
import { useProfessions } from './model/useProfessionContext';
import { useProfessionMethods } from './model/useProfessionMethods';
import ProfessionProvider from './providers/ProfessionProvider';
import professionsReducer, {
  getProfessionById,
  getProfessions,
  getProfessionsLoadingStatus,
  loadProfessionsList,
} from './slices/professions';
import Profession from './ui/profession';

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
