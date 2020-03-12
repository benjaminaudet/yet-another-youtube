/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_VIDEOS = 'yet_another_youtube/HomePage/LOAD_VIDEOS';
export const LOAD_VIDEOS_SUCCESS =
  'yet_another_youtube/HomePage/LOAD_VIDEOS_SUCCESS';
export const LOAD_VIDEOS_ERROR =
  'yet_another_youtube/HomePage/LOAD_VIDEOS_ERROR';
