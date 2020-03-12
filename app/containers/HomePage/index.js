/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box, Container, Typography, Button } from '@material-ui/core/';
import PropTypes from 'prop-types';
import VideoItem from 'components/VideoItem';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectVideos,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { loadVideos } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'home';
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

export function HomePage({ loading, error, videos, loadVideos }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [spacing] = useState(2);
  const classes = useStyles();

  const videosListProps = {
    loading,
    error,
    videos,
    loadVideos,
  };

  useEffect(() => {
    loadVideos();
  });

  const mockData = [
    {
      id: 0,
      title: 'test_0',
      videoLength: 15,
      link: 'https://ibp.epitech.eu',
      embed:
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/lFemA_xjkuQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      tags: ['word_0', 'word_1', 'word_2', 'word_3', 'word_4'],
      thumbs: [
        'https://www.scan-vf.co/uploads/manga/dragon-Ball-Super/chapters/chapitre-47/03.png',
        'https://www.scan-vf.co/uploads/manga/dragon-Ball-Super/chapters/chapitre-47/05.png',
        'https://www.scan-vf.co/uploads/manga/dragon-Ball-Super/chapters/chapitre-47/07.png',
        'https://www.scan-vf.co/uploads/manga/dragon-Ball-Super/chapters/chapitre-47/08.png',
        'https://www.scan-vf.co/uploads/manga/dragon-Ball-Super/chapters/chapitre-47/08.png',
      ],
      upVote: 42,
      downVote: 21,
      rating: 2.1,
      viewNumber: 1337,
      mainTag: 'test',
      dateAdd: '1998-07-24T19:18:48+02:00',
      videoResolution: '480p',
    },
    {
      id: 1,
      title: 'test_1',
      videoLength: 16,
      link: 'https://fr.wikipedia.org/wiki/EIP',
      embed:
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/lFemA_xjkuQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      tags: ['word_0', 'word_1', 'word_2', 'word_3', 'word_4'],
      thumbs: [
        'https://www.scan-vf.co/uploads/manga/nanatsu-no-taizai/chapters/chapitre-307/03.png',
        'https://www.scan-vf.co/uploads/manga/nanatsu-no-taizai/chapters/chapitre-307/08.png',
        'https://www.scan-vf.co/uploads/manga/nanatsu-no-taizai/chapters/chapitre-307/09.png',
        'https://www.scan-vf.co/uploads/manga/nanatsu-no-taizai/chapters/chapitre-307/07.png',
        'https://www.scan-vf.co/uploads/manga/nanatsu-no-taizai/chapters/chapitre-307/04.png',
      ],
      upVote: 43,
      downVote: 22,
      rating: 3.1,
      viewNumber: 1338,
      mainTag: 'test',
      dateAdd: '2013-03-12T19:47:45+01:00',
      videoResolution: '480p',
    },
    {
      id: 2,
      title: 'test_2',
      videoLength: 17,
      link: 'https://cei.zendesk.com/hc/en-us',
      embed:
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/lFemA_xjkuQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      tags: ['word_0', 'word_1', 'word_2', 'word_3', 'word_4'],
      thumbs: [
        'https://www.scan-vf.co/uploads/manga/dragon-Ball-Super/chapters/chapitre-47/05.png',
        'https://www.scan-vf.co/uploads/manga/dragon-Ball-Super/chapters/chapitre-47/04.png',
        'https://www.scan-vf.co/uploads/manga/dragon-Ball-Super/chapters/chapitre-47/07.png',
        'https://www.scan-vf.co/uploads/manga/dragon-Ball-Super/chapters/chapitre-47/08.png',
        'https://www.scan-vf.co/uploads/manga/dragon-Ball-Super/chapters/chapitre-47/08.png',
      ],
      upVote: 44,
      downVote: 23,
      rating: 4.1,
      viewNumber: 1339,
      mainTag: 'test',
      dateAdd: '1973-09-27T04:59:46+01:00',
      videoResolution: '480p',
    },
  ];

  return (
    <Box className={classes.box}>
      <Container maxWidth="xl">
        <Typography variant="h6" noWrap className={classes.title}>
          Recommandations
        </Typography>
        <Grid container className={classes.grid}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
              {videos && videos.map(value => <VideoItem video={value} />)}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  videos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadVideos: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  videos: makeSelectVideos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadVideos: () => {
      dispatch(loadVideos());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
