import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import * as EmailValidator from 'email-validator';

const useStyles = makeStyles(theme => ({
  formContainer: {
    marginTop: '3%',
  },
  form: {
    marginTop: '3%',
    '& .field-container': {
      margin: theme.spacing(2),
    },
    '& .MuiTextField-root': {
      width: 300,
    },
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  const [form, setForm] = useState({
    email: {
      value: '',
      error: false,
      displayError: false,
      helperText: 'E-mail non valide',
    },
    password: {
      value: '',
      error: false,
      displayError: false,
      helperText: 'Le mot de passe doit faire 8 caractères minimum',
    },
    confirm_password: {
      value: '',
      error: false,
      displayError: false,
      helperText: 'Les mots de passe ne correspondent pas',
    },
  });

  const handleChange = event => {
    let error = false;
    let displayError = false;
    if (
      event.type === 'click' &&
      form[event.target.id].error &&
      form[event.target.id].value !== ''
    ) {
      console.log('wtf');
      displayError = true;
    }
    if (event.target.value !== '') {
      if (event.target.id === 'email') {
        error = !EmailValidator.validate(event.target.value);
      } else if (event.target.id === 'password') {
        error = event.target.value.length < 8;
      } else {
        error = !(event.target.value === form.password.value);
      }
    }
    setForm({
      ...form,
      [event.target.id]: {
        value: event.target.value,
        error: error,
        displayError: displayError,
        helperText: form[event.target.id].helperText,
      },
    });
  };

  const handleDisplayError = event => {
    if (form[event.target.id].error) {
      setForm({
        ...form,
        [event.target.id]: {
          value: form[event.target.id].value,
          error: form[event.target.id].error,
          displayError: true,
          helperText: form[event.target.id].helperText,
        },
      });
    }
  };

  const submit = event => {
    if (event.type === 'click' || event.key === 'Enter') {
      console.log('submit');
    }
  };

  return (
    <Container className={classes.formContainer} maxWidth="sm">
      <Typography variant="h6">Inscription</Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <Box class="field-container">
          <TextField
            color="secondary"
            id="email"
            error={form.email.displayError}
            label="E-mail"
            onChange={handleChange}
            onClick={handleChange}
            onBlur={handleDisplayError}
            onKeyPress={submit}
            size="small"
            variant="outlined"
            helperText={form.email.displayError ? form.email.helperText : ''}
          />
        </Box>
        <Box class="field-container">
          <TextField
            color="secondary"
            id="password"
            error={form.password.displayError}
            label="Mot de passe"
            size="small"
            onChange={handleChange}
            onClick={handleChange}
            onBlur={handleDisplayError}
            onKeyPress={submit}
            variant="outlined"
            helperText={
              form.password.displayError ? form.password.helperText : ''
            }
          />
        </Box>
        <Box class="field-container">
          <TextField
            color="secondary"
            id="confirm_password"
            error={form.confirm_password.displayError}
            label="Confirmer le mot de passe"
            size="small"
            onChange={handleChange}
            onClick={handleChange}
            onBlur={handleDisplayError}
            onKeyPress={submit}
            variant="outlined"
            helperText={
              form.confirm_password.displayError
                ? form.confirm_password.helperText
                : ''
            }
          />
        </Box>
        <Box class="field-container">
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Button onClick={submit} variant="contained" color="secondary">
                S'inscrire
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}
