import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  Grid,
  Avatar,
  CardMedia,
  Box,
  Chip,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import computeRenderDateAdded from '../utils/computeRenderDateAdded';
import computeRenderNumber from '../utils/computeRenderNumber';
import computeRenderVideoLength from '../utils/computeRenderVideoLength';

const useStyles = makeStyles(theme => ({
  paper: {
    height: 191,
    width: 344,
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
    fontSize: '14px !important',
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
  thumb: {
    objectFit: 'contain',
    width: '100%',
  },
  videoLength: {
    position: 'absolute',
    marginTop: 164,
    marginLeft: 294,
    background: 'rgba(0, 0, 0, 0.8)',
    fontSize: '0.8rem',
    fontWeight: '500',
    borderRadius: 2,
    height: '1rem',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
      right: 30,
    },
  },
}));

function VideoItem({ video }) {
  const classes = useStyles();
  const history = useHistory();
  let thumbIndex = 0;
  let [carouselInterval, setCarouselInterval] = useState(0);
  let [thumbImg, setThumbImg] = useState(video.thumbs[thumbIndex]);

  function onMouseEnterCarousel(e) {
    function rollCarousel() {
      thumbIndex++;
      if (thumbIndex === video.thumbs.length - 1) {
        thumbIndex = 0;
      }
      setThumbImg(video.thumbs[thumbIndex]);
    }
    rollCarousel();
    setCarouselInterval(setInterval(rollCarousel, 500));
  }

  function onMouseOutCarousel() {
    thumbIndex = 0;
    setThumbImg(video.thumbs[thumbIndex]);
    clearInterval(carouselInterval);
  }

  function onClickImage() {
    history.push(`/video/${video.id}`);
  }

  function onClickTitle() {
    window.open(video.link, '_blank');
  }

  return (
    <Grid item className={classes.cardWrapper}>
      <Card xs={12} className={classes.paper}>
        <Chip
          size="small"
          className={classes.videoLength}
          label={computeRenderVideoLength(video.videoLength)}
        />
        <img
          onMouseEnter={onMouseEnterCarousel}
          onMouseOut={onMouseOutCarousel}
          onClick={onClickImage}
          src={thumbImg}
          className={classes.thumb}
          alt="cover"
        />
      </Card>
      <Grid
        container
        wrap="nowrap"
        alignItems="flex-start"
        spacing={2}
        className={classes.gridInfos}
      >
        <Grid item>
          <Avatar xs={12} />
        </Grid>
        <Grid item>
          <Typography onClick={onClickTitle} className={classes.title} noWrap>
            {video.title}
          </Typography>
          <Box>
            <Typography className={classes.smallInfos}>Auteur</Typography>
            <Grid container>
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
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

VideoItem.propTypes = {
  video: PropTypes.any,
};

export default VideoItem;
