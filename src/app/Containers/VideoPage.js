/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Avatar,
  Divider,
} from '@material-ui/core/';
import { ThumbUp, ThumbDown } from '@material-ui/icons/';
import VideoItem from '../components/VideoItem';
import { selectVideos, getVideos } from './videoSlice';
import { useHistory } from 'react-router-dom';
import computeRenderDateAdded from '../utils/computeRenderDateAdded';
import computeRenderNumber from '../utils/computeRenderNumber';

const useStyles = makeStyles(theme => ({
  box: {
    marginTop: '10vh',
  },
  paper: {
    maxHeight: 668,
    maxWidth: 1188,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  cardWrapper: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  gridInfos: {
    color: theme.palette.text.primary,
    marginTop: '1vh',
  },
  title: {
    fontSize: '18px !important',
    fontWeight: 500,
    cursor: 'pointer',
  },
  smallInfos: {
    fontSize: '14px !important',
    color: theme.palette.text.secondary,
  },
  separatorSmallInfos: {
    margin: '0px 4px',
    fontSize: '14px !important',
  },
  voteText: {
    display: 'inline-block',
    paddingLeft: 10,
  },
  vote: {
    display: 'inline-block',
    marginLeft: 10,
  },
  thumb: {
    objectFit: 'contain',
    width: '100%',
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
      return;
    }
    const sizesVideo = { width: '100%', height: 668 };
    const id = parseInt(props.match.params.id);
    const videoToDisplay = Object.assign(
      {},
      videos.filter(video => video.id === id)[0],
    );
    console.log(videoToDisplay.embed);
    videoToDisplay.embed = videoToDisplay.embed
      .replace(/(width=")(\d+)(")/i, `$1${sizesVideo.width}$3`)
      .replace(/(height=")(\d+)(")/i, `$1${sizesVideo.height}$3`)
      .replace(/(height="\d+")/i, '$1 max-height="668"');
    console.log(videoToDisplay);
    setVideo(videoToDisplay);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box className={classes.box}>
        <Grid item className={classes.cardWrapper}>
          <Card className={classes.paper}>
            <div dangerouslySetInnerHTML={{ __html: video && video.embed }} />
          </Card>
          <Grid
            container
            wrap="nowrap"
            alignItems="flex-start"
            spacing={2}
            className={classes.gridInfos}
          >
            <Grid item>
              <Typography className={classes.title} noWrap>
                {video.title}
              </Typography>
              <Box>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  alignContent="flex-start"
                  spacing={1}
                >
                  <Grid item>
                    <Typography className={classes.smallInfos}>
                      {computeRenderNumber(video.viewNumber)} vues
                    </Typography>
                  </Grid>
                  <Box className={classes.separatorSmallInfos} alignItems="top">
                    •
                  </Box>
                  <Grid item>
                    <Typography className={classes.smallInfos}>
                      Il y a {computeRenderDateAdded(video.dateAdd)}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.vote}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <ThumbUp />
                      </Grid>
                      <Grid item>
                        <Typography
                          className={[...classes.smallInfos, classes.voteText]}
                        >
                          {video.upVote}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.vote}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <ThumbDown />
                      </Grid>
                      <Grid item>
                        <Typography
                          className={[...classes.smallInfos, classes.voteText]}
                        >
                          {video.downVote}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
