import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from 'env';
import { camelizeKeys } from 'humps';
import queryString from 'query-string';
import { openAlert } from 'reducers/notificationSlice';
import { signOut } from 'reducers/profileSlice';
import { store } from 'reducers/store';

const beforeRequest = (config: InternalAxiosRequestConfig) => {
  try {
    if (config.data instanceof FormData) {
      Object.assign(config.headers, { 'Content-Type': 'multipart/form-data' });
    }
  } catch {}
  return config;
};

const onError = async (error: AxiosError) => {
  const { response } = error;
  if (response) {
    const { status, data } = response;
    if (status === 401) {
      store.dispatch(signOut({}));
    }

    const message = (data as any).errors ?? 'Đã có lỗi xảy ra';
    store.dispatch(openAlert({ message, variant: 'error' }));
  }
  return Promise.reject(error);
};

const client = axios.create({ baseURL: API_URL });
client.defaults.paramsSerializer = (params) =>
  queryString.stringify(
    Object.keys(params)
      .filter((key) => String(params[key]).trim())
      .reduce((trim, key) => ({ ...trim, [key]: params[key] }), {}),
  );

client.interceptors.request.use(beforeRequest);
client.interceptors.response.use((response) => response.data, onError);

client.defaults.transformResponse = [...(axios.defaults.transformResponse as []), (data) => camelizeKeys(data)];

export { client };
