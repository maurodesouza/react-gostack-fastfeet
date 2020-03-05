import { all, put, call, takeLatest } from 'redux-saga/effects';

import { signInSuccess, signFailure } from './actions';

import history from '~/services/history';
import api from '~/services/api';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const {
      data: { user, token },
    } = yield call(api.post, 'session', { email, password });

    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (err) {
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
