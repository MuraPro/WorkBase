import qualityService from './api/quality.service';
import { useQualities } from './model/useQualityContext';
import QualitiesProvider from './providers/QualitiesProvider';
import qualitiesReducer, {
  getQualities,
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList,
} from './slices/qualities';
import QualitiesList from './ui/qualitiesList';
import Quality from './ui/quality';

export {
  QualitiesProvider,
  QualitiesList,
  Quality,
  useQualities,
  qualityService,
  qualitiesReducer,
  loadQualitiesList,
  getQualities,
  getQualitiesLoadingStatus,
  getQualitiesByIds,
};
