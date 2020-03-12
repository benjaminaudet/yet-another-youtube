/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_VIDEOS_SUCCESS,
  LOAD_VIDEOS,
  LOAD_VIDEOS_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  videos: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_VIDEOS:
        draft.loading = true;
        draft.error = false;
        draft.videos = false;
        break;

      case LOAD_VIDEOS_SUCCESS:
        draft.videos = action.videos;
        draft.loading = false;
        break;

      case LOAD_VIDEOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
