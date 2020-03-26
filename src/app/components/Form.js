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

export default function Form(props) {
  const classes = useStyles();
  const [submitable, setSubmitable] = useState(true);

  const [form, setForm] = useState(props.form);

  const checkNoErrors = () => {
    let noError = true;
    Object.keys(form.fields).forEach(field => {
      if (form.fields[field].value === '') {
        noError = false;
        return true;
      }
      if (form.fields[field].error) {
        noError = false;
        return true;
      }
      return false;
    });
    return noError;
  };

  const handleChange = event => {
    if (!event || !form.fields[event.target.id]) {
      return;
    }
    let error = false;
    let displayError = false;
    if (
      event.type === 'click' &&
      form.fields[event.target.id].error &&
      form.fields[event.target.id].value !== ''
    ) {
      displayError = true;
    }
    if (event.target.value !== '') {
      error = form.fields[event.target.id].conditionError(
        event.target.value,
        form.fields,
      );
    }
    setForm({
      ...form,
      fields: {
        ...form.fields,
        [event.target.id]: {
          value: event.target.value,
          error: error,
          displayError: displayError,
          label: form.fields[event.target.id].label,
          helperText: form.fields[event.target.id].helperText,
          conditionError: form.fields[event.target.id].conditionError,
        },
      },
    });
  };

  useEffect(() => {
    setSubmitable(checkNoErrors());
  }, [form]);

  const handleDisplayError = event => {
    if (form.fields[event.target.id].error) {
      setForm({
        ...form,
        fields: {
          ...form.fields,
          [event.target.id]: {
            value: event.target.value,
            error: form.fields[event.target.id].error,
            label: form.fields[event.target.id].label,
            displayError: true,
            helperText: form.fields[event.target.id].helperText,
            conditionError: form.fields[event.target.id].conditionError,
          },
        },
      });
    }
  };

  return (
    <Container className={classes.formContainer} maxWidth="sm">
      <Typography variant="h6">{form.name}</Typography>
      <form className={classes.form} noValidate autoComplete="off">
        {form.fields &&
          Object.keys(form.fields).map(key => {
            return (
              <Box key={key} className="field-container">
                <TextField
                  color="secondary"
                  id={key}
                  error={form.fields[key].displayError}
                  label={form.fields[key].label}
                  onChange={handleChange}
                  onClick={handleChange}
                  onBlur={handleDisplayError}
                  onKeyPress={form.fields[key].onClick}
                  size="small"
                  variant="standard"
                  helperText={
                    form.fields[key].displayError
                      ? form.fields[key].helperText
                      : ''
                  }
                />
              </Box>
            );
          })}

        <Box className="field-container">
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Button
                onClick={() => form.button.onClick(form)}
                disabled={!submitable}
                variant="contained"
                color="secondary"
              >
                {form.button.label}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}
