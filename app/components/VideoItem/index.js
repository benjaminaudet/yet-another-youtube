import React from 'react';
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
    <Grid key={video} item className={classes.cardWrapper}>
      <Card xs={12} className={classes.paper}>
        <CardMedia image={video.thumbs[0]} title="Contemplative Reptile" />
      </Card>
      <Grid
        container
        wrap="nowrap"
        alignItems="top"
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
