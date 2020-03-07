/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1,
    marginTop: '2%',
  },
  paper: {
    height: 191,
    width: 344,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    color: theme.palette.text.primary,
  },
  cardWrapper: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  control: {
    padding: theme.spacing(6),
  },
}));

export default function HomePage() {
  const [spacing] = React.useState(2);
  const classes = useStyles();

  return (
    <Box>
      <Container maxWidth="xl">
        <Typography variant="h6" noWrap className={classes.title}>
          Recommandations
        </Typography>
        <Grid container className={classes.grid}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
                <Grid key={value} item className={classes.cardWrapper}>
                  <Card xs={12} className={classes.paper} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
