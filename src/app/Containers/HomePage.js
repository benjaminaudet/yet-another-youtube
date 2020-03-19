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
import { selectVideos, selectSearchFilter, getVideos } from './videoSlice';

const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1,
    marginTop: '2%',
  },
  box: {
    marginTop: '6vh',
  },
  title: {
    paddingTop: '3vh',
    color: theme.palette.text.primary,
  },
  control: {
    padding: theme.spacing(6),
  },
}));

export default function HomePage(props) {
  const videos = useSelector(selectVideos);
  const dispatch = useDispatch();
  const [spacing] = useState(2);
  const classes = useStyles();
  let offset = 0;

  function getVideosWithSearch() {
    dispatch(getVideos(offset, true));
  }

  const isBottom = el => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  const trackScrolling = () => {
    const wrappedElement = document.getElementById('root');
    if (isBottom(wrappedElement)) {
      offset++;
      getVideosWithSearch();
      document.removeEventListener('scroll', this);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', trackScrolling);
    dispatch(getVideos(offset));
  }, []);

  return (
    <Box className={classes.box}>
      <Container maxWidth="xl">
        <Typography variant="h6" noWrap className={classes.title}>
          Recommandations
        </Typography>
        <Grid container className={classes.grid}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
              {videos &&
                videos.map(value => (
                  <VideoItem key={value.id + value.title} video={value} />
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
