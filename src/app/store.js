import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import videosReducer from './Containers/videoSlice';
import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    videos: videosReducer,
    counter: counterReducer,
  },
});
