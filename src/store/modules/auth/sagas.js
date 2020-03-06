import { all, put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { signInSuccess, signFailure } from './actions';

import history from '~/services/history';
import api from '~/services/api';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const {
      data: { user, token },
    } = yield call(api.post, 'session', { email, password });

    api.defaults.headers.authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    history.push('/deliveries');
  } catch (err) {
    const { error } = err.response.data;
    toast.error(error);
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
