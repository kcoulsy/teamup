import clientEnv from '../constants/config';

export const API_GET = 'GET';
export const API_POST = 'POST';
export const API_PUT = 'PUT';
export const API_PATCH = 'PATCH';
export const API_DELETE = 'DELETE';

export type ApiMethod =
  | typeof API_GET
  | typeof API_POST
  | typeof API_PUT
  | typeof API_PATCH
  | typeof API_DELETE;

interface ConfigBody extends RequestInit {
  method: ApiMethod;
  body?: string;
}

export const api = async (path: string, method: ApiMethod, bodyObject = {}) => {
  const config: ConfigBody = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  const token = localStorage.getItem('userToken');

  if (typeof token === 'string') {
    config.headers = { ...config.headers, 'x-auth': token };
  }

  if (method !== API_GET) {
    config.body = JSON.stringify(bodyObject);
  }

  // TODO remove this slash
  const response = await fetch(
    `${clientEnv.BASE_URL + clientEnv.API_PATH}/${path}`,
    config,
  );

  return response.json();
};
