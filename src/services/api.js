import axios from 'axios';
import { toast } from 'react-toastify';
import { signOut } from '~/store/modules/auth/actions';

const api = axios.create({
  baseURL: 'http://localhost:5656',
});

export function configInterceptor(store) {
  api.interceptors.response.use(
    response => response,
    error => {
      const {
        response: {
          status,
          data: { type },
        },
      } = error;

      if (status === 401 && type === 'TokenExpiredError') {
        store.dispatch(signOut());
        toast.error('Seu token expirou, por favor faça login novamente!');
      }

      return Promise.reject(error);
    }
  );
}

export default api;
