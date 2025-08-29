import professionService from './api/profession.service';
import professionsReducer, {
  getProfessionById,
  getProfessions,
  getProfessionsLoadingStatus,
  loadProfessionsList,
} from './slices/professions';
import Profession from './ui/profession';

export {
  Profession,
  professionService,
  professionsReducer,
  loadProfessionsList,
  getProfessions,
  getProfessionsLoadingStatus,
  getProfessionById,
};
