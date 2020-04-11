import React, { useEffect, useState } from 'react';
import { Drawer, Grid, Button } from '@material-ui/core/';
import Form from './Form';
import Profile from './Profile';
import * as EmailValidator from 'email-validator';

export default function AuthDrawer(props) {
  const { openDrawer, toggleDrawer } = props;
  const [switchTypeAuth, setSwitchTypeAuth] = useState('signup');
  const [labelActionButton, setLabelActionButton] = useState('');
  const [isConnected, setIsConnected] = useState(
    sessionStorage.getItem('token'),
  );

  const [formSignIn] = useState({
    name: 'Connexion',
    fields: {
      email: {
        label: 'E-mail',
        value: '',
        error: false,
        displayError: false,
        helperText: 'E-mail non valide',
        conditionError: value => !EmailValidator.validate(value),
      },
      password: {
        label: 'Mot de passe',
        value: '',
        error: false,
        displayError: false,
        helperText: 'Le mot de passe doit faire 8 caractères minimum',
        conditionError: value => value.length < 8,
      },
    },
    button: {
      label: 'Se connecter',
      onClick: form => {
        console.log('signin');
        sessionStorage.setItem('token', JSON.stringify(form));
        window.dispatchEvent(new Event('token'));
      },
    },
  });

  const [formSignUp] = useState({
    name: 'Inscription',
    fields: {
      email: {
        label: 'E-mail',
        value: '',
        error: false,
        displayError: false,
        helperText: 'E-mail non valide',
        conditionError: value => !EmailValidator.validate(value),
      },
      password: {
        label: 'Mot de passe',
        value: '',
        error: false,
        displayError: false,
        helperText: 'Le mot de passe doit faire 8 caractères minimum',
        conditionError: value => value.length < 8,
      },
      confirm_password: {
        label: 'Confirmation du mot de passe',
        value: '',
        error: false,
        displayError: false,
        helperText: 'Les mots de passe ne correspondent pas',
        conditionError: (value, formFields) =>
          value !== formFields['password'].value,
      },
    },
    button: {
      label: "S'incrire",
      onClick: form => {
        console.log('signup');
        sessionStorage.setItem('token', JSON.stringify(form));
        window.dispatchEvent(new Event('token'));
      },
    },
  });

  const onStorageChanged = e => {
    if (e.type === 'token') {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setIsConnected(false);
        return;
      }
      setIsConnected(true);
    }
  };

  useEffect(() => {
    window.addEventListener('token', onStorageChanged);
    const token = sessionStorage.getItem('token');
    if (token) {
      console.log(token);
    }
  }, []);

  useEffect(() => {
    console.log(isConnected);
    if (isConnected) {
      setSwitchTypeAuth('connected');
    }
    const table = {
      connected: 'Se déconnecter',
      signup: 'Se connecter',
      signin: "S'inscrire",
    };
    setLabelActionButton(table[switchTypeAuth]);
  }, [switchTypeAuth, isConnected]);

  const actionButton = type => {
    if (isConnected) {
      sessionStorage.removeItem('token');
      window.dispatchEvent(new Event('token'));
      return;
    }
    if (switchTypeAuth === 'signin') {
      setSwitchTypeAuth('signup');
    } else {
      setSwitchTypeAuth('signin');
    }
  };

  const ComponentToRender = props => {
    const { switchTypeAuth } = props;

    if (isConnected) {
      return <Profile></Profile>;
    }

    return switchTypeAuth === 'signup' ? (
      <Form form={formSignUp} />
    ) : (
        <Form form={formSignIn} />
      );
  };

  return (
    <React.Fragment key={'right'}>
      <Drawer anchor={'right'} open={openDrawer} onClose={toggleDrawer(false)}>
        <ComponentToRender switchTypeAuth={switchTypeAuth} />
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Button onClick={actionButton} color="secondary">
              {labelActionButton}
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </React.Fragment>
  );
}
