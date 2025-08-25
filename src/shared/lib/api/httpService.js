import axios from 'axios';
import logger from '../logger/logger';
import { toast } from 'react-toastify';
import { API_ENDPOINT, IS_FIREBASE } from '../../config/config';
import { httpAuth } from './httpAuth';
import { localStorageService } from '@shared/lib/storage';

const http = axios.create({
  baseURL: API_ENDPOINT,
});

http.interceptors.request.use(
  async function (config) {
    if (IS_FIREBASE) {
      const containSlash = /\/$/gi.test(config.url);

      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json';
      const expiresDate = localStorageService.getTokenExpiresDate();
      const refreshToken = localStorageService.getRefreshToken();

      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post('token', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        });

        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id,
        });
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  if (data === null) return [];
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data;
}

http.interceptors.response.use(
  (res) => {
    if (IS_FIREBASE) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
      logger.log(error);
      toast.error('Something was wrong. Try it later');
    }
    return Promise.reject(error);
  }
);
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpService;
