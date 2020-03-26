import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formContainer: {
    marginTop: '3%',
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  const [email] = useState(
    localStorage.getItem('token') &&
      JSON.parse(localStorage.getItem('token')).fields.email.value,
  );
  useEffect(() => {}, []);

  return (
    <Container className={classes.formContainer} maxWidth="sm">
      Hello {email}
    </Container>
  );
}
