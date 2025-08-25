import axios from 'axios';
import { FIREBASE_KEY } from '../../config/config';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: FIREBASE_KEY,
  },
});
