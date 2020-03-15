/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography, Grid } from '@material-ui/core/';
import VideoItem from '../components/VideoItem';
import { selectVideos, getVideos } from './videoSlice';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1,
    marginTop: '2%',
  },
  box: {
    marginTop: '9vh',
    color: theme.palette.text.primary,
  },
  title: {
    paddingTop: '3vh',
    color: theme.palette.text.primary,
  },
  control: {
    padding: theme.spacing(6),
  },
}));

export default function VideoPage(props) {
  const videos = useSelector(selectVideos);
  const dispatch = useDispatch();
  const history = useHistory();
  const [video, setVideo] = useState({});
  const classes = useStyles();

  useEffect(() => {
    if (videos.length === 0) {
      history.push('/');
    }
    const id = parseInt(props.match.params.id);
    setVideo(...videos.filter(video => video.id === id));
  }, []);

  return (
    <Box className={classes.box}>
      <Container maxWidth="xl" className={classes.grid}>
        <div dangerouslySetInnerHTML={{ __html: video && video.embed }} />
        <Typography>{video.title}</Typography>
      </Container>
    </Box>
  );
}
