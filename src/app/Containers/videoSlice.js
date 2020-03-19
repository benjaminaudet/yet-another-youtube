import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'videos',
  initialState: {
    list: [],
    searchFilter: '',
  },
  reducers: {
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },
    addVideosBySearch: (state, action) => {
      state.list = [];
      state.list = action.payload;
    },
    addVideos: (state, action) => {
      state.list = state.list.concat(action.payload);
    },
  },
});

export const { addVideos, addVideosBySearch, setSearchFilter } = slice.actions;

export const getVideos = (offset, infiniteScoll = false) => (
  dispatch,
  getState,
) => {
  const searchFilter = getState().videos.searchFilter;
  axios
    .get(`http://mptv.fr/fap/?offset=${offset}&limit=20&filter=${searchFilter}`)
    .then(
      videos => {
        if (searchFilter !== '' && !infiniteScoll) {
          dispatch(addVideosBySearch(videos.data));
          return;
        }
        dispatch(addVideos(videos.data));
      },
      error => console.error(error),
    );
};

export const selectVideos = state => state.videos.list;
export const selectSearchFilter = state => state.videos.searchFilter;

export default slice.reducer;
