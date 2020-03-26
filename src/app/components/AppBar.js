import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  ButtonGroup,
  Box,
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import youtubeLogo from '../assets/images/youtube.svg';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getVideos, setSearchFilter } from '../Containers/videoSlice';
import AuthDrawer from './AuthDrawer';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    width: 80,
    cursor: 'pointer',
  },
  title: {
    color: theme.palette.text.primary,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
  search: {
    position: 'relative',
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '25%',
      width: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const onClickLogo = () => {
    if (location.pathname === '/') {
      window.location.reload();
      return;
    }
    window.location.reload();
    history.push('/');
  };

  const handleSearchOnChange = evt => {
    setSearch(evt.target.value);
  };

  const handleSearchOnSubmit = evt => {
    if (evt.key === 'Enter' || evt === 'button-submit') {
      if (location.pathname !== '/') {
        history.push('/');
      }
      dispatch(setSearchFilter(search));
      dispatch(getVideos(0));
    }
  };

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  return (
    <Box className={classes.grow}>
      <AuthDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img
            onClick={onClickLogo}
            className={classes.logo}
            src={youtubeLogo}
            alt="logo"
          />
          <Box className={classes.search}>
            <ButtonGroup aria-label="outlined primary button group">
              <InputBase
                placeholder="Rechercher"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={search}
                onChange={handleSearchOnChange}
                onKeyPress={handleSearchOnSubmit}
                disableRipple={true}
                inputProps={{ 'aria-label': 'search' }}
              />
              <Button onClick={() => handleSearchOnSubmit('button-submit')}>
                <SearchIcon />
              </Button>
            </ButtonGroup>
          </Box>
          <Box className={classes.grow} />
          <Box className={classes.sectionDesktop}>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          <Box className={classes.sectionMobile}>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
