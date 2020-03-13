import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'videos',
  initialState: {
    list: [],
  },
  reducers: {
    addVideos: (state, action) => {
      state.list = state.list.concat(action.payload);
    },
  },
});

export const { addVideos } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getVideos = offset => dispatch => {
  axios.get(`http://mptv.fr/fap/?offset=${offset}&limit=20`).then(
    videos => {
      dispatch(addVideos(videos.data));
    },
    error => console.error(error),
  );
};

// The function below is called a selector and allows us to select a list from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.list)`
export const selectVideos = state => state.videos.list;

export default slice.reducer;
