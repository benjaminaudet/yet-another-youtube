import React, { useEffect } from 'react';
import { Drawer } from '@material-ui/core/';
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function AuthDrawer(props) {
  const { openDrawer, toggleDrawer } = props;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token);
    }
  }, []);

  return (
    <React.Fragment key={'right'}>
      <Drawer anchor={'right'} open={openDrawer} onClose={toggleDrawer(false)}>
        <SignUp />
        <SignIn />
      </Drawer>
    </React.Fragment>
  );
}
