import React, { useState, useEffect } from 'react';
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

export default function SignIn(props) {
  const classes = useStyles();
  const [submitable, setSubmitable] = useState(true);

  const [form, setForm] = useState({
    email: {
      value: '',
      error: false,
      displayError: false,
      helperText: 'E-mail non valide',
      conditionError: (value) => !EmailValidator.validate(value)
    },
    password: {
      value: '',
      error: false,
      displayError: false,
      helperText: 'Le mot de passe doit faire 8 caractères minimum',
      conditionError: (value) => value.length < 8
    },
  });

  const checkNoErrors = () => {
    let noError = true;
    Object.keys(form).forEach(field => {
      if (form[field].value === '') {
        noError = false;
        return true;
      }
      if (form[field].error) {
        noError = false;
        return true;
      }
      return false;
    });
    return noError;
  };

  const handleChange = event => {
    let error = false;
    let displayError = false;
    if (
      event.type === 'click' &&
      form[event.target.id].error &&
      form[event.target.id].value !== ''
    ) {
      displayError = true;
    }
    if (event.target.value !== '') {
      if (event.target.id === 'email') {
        error = ;
      } else if (event.target.id === 'password') {
        error = ;
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

  useEffect(() => {
    setSubmitable(checkNoErrors());
  }, [form]);

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
    if ((event.type === 'click' || event.key === 'Enter') && submitable) {
      console.log('submit');
    }
  };

  return (
    <Container className={classes.formContainer} maxWidth="sm">
      <Typography variant="h6">Connexion</Typography>
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
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Button
                onClick={submit}
                disabled={!submitable}
                variant="contained"
                color="secondary"
              >
                Se connecter
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}
