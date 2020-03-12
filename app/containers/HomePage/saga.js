/**
 * Gets the videos from the API
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_VIDEOS } from './constants';
import { videosLoaded, videoLoadingError } from './actions';

/**
 * Github videos request/response handler
 */
export function* getVideos() {
  const requestURL = `http://mptv.fr/fap/`;

  try {
    // Call our request helper (see 'utils/request')
    const videos = yield call(request, requestURL);
    yield put(videosLoaded(videos));
  } catch (err) {
    yield put(videoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* videosData() {
  // Watches for LOAD_VIDEOS actions and calls getVideos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_VIDEOS, getVideos);
}
