import React from 'react';
import ContactList from './ContactList';
import './App.css';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#f5f5f5',
    height: '100%'
  }
}))

function App() {
  const classes = useStyles();
  return (
    <div>

      <Container className={classes.root}>
        <ContactList />
      </Container>
    </div>
  );
}
export default App;
