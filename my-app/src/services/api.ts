import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';

const StatusCodeMapping: Record<number , boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://dummyjson.com' ;
const REQUEST_TIMEOUT = 5000;


export const createAPI = ():AxiosInstance =>{
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });


  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError (error.response)) {
        const errorMessage = (error.response.data as { error: string }).error;
        toast.warn(errorMessage);
      }
      throw error;
    }
  );

  return api;
};


