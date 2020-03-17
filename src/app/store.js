import { configureStore } from '@reduxjs/toolkit';
import videosReducer from './Containers/videoSlice';

export default configureStore({
  reducer: {
    videos: videosReducer,
  },
});
