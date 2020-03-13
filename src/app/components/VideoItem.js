import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Typography, Card, Grid, Avatar, CardMedia } from '@material-ui/core';

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
}));

function VideoItem({ video }) {
  const classes = useStyles();
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

  function computeRenderViewNumber(viewNumber) {
    if (viewNumber > 1000000) {
      return `${(viewNumber / 1000000).toFixed(1)} M`;
    }
    return viewNumber < 1000
      ? viewNumber
      : `${Math.floor(viewNumber / 1000)} k`;
  }

  function computeRenderDateAdded(dateAdd) {
    const dateAdded = moment(new Date(dateAdd));
    const dateNow = moment(new Date());
    const duration = moment.duration(dateNow.diff(dateAdded));
    const durationScale = {
      years: {
        value: duration.asYears(),
        translation: 'ans',
      },
      months: {
        value: duration.asMonths(),
        translation: 'mois',
      },
      days: {
        value: duration.asDays(),
        translation: 'jours',
      },
      hours: {
        value: duration.asHours(),
        translation: 'heures',
      },
      minutes: {
        value: duration.asMinutes(),
        translation: 'minutes',
      },
      seconds: {
        value: duration.asSeconds(),
        translation: 'secondes',
      },
    };
    let goodScale = '';
    Object.keys(durationScale).every(key => {
      if (durationScale[key].value >= 1) {
        goodScale = key;
        return false;
      }
      return true;
    });
    return `${dateNow.diff(dateAdded, goodScale)} ${
      durationScale[goodScale].translation
    }`;
  }

  return (
    <Grid item className={classes.cardWrapper}>
      <Card xs={12} className={classes.paper}>
        <img
          onMouseEnter={onMouseEnterCarousel}
          onMouseOut={onMouseOutCarousel}
          src={thumbImg}
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
        <Grid item xs zeroMinWidth>
          <Typography noWrap>{video.title}</Typography>
          <Typography>Auteur</Typography>
          <Typography>
            {computeRenderViewNumber(video.viewNumber)} vues
          </Typography>
          <Typography>
            Il y a {computeRenderDateAdded(video.dateAdd)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

VideoItem.propTypes = {
  video: PropTypes.any,
};

export default VideoItem;
