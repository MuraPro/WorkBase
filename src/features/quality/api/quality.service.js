import httpService from '@shared/lib/api/httpService';

const qualityEndpoint = 'quality/';

const qualityService = {
  fetchAll: async () => {
    const { data } = await httpService.get(qualityEndpoint);
    return data;
  },
};
export default qualityService;
