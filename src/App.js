import React, { useEffect, useRef } from 'react';
import Details from './Components/Details/Details';
import { Grid } from '@material-ui/core';
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel,
} from '@speechly/react-ui';
import { SpeechState, useSpeechContext } from '@speechly/react-client';
import makeStyles from './style';
import Main from './Components/Main.js/Main';

const App = () => {
  const classes = makeStyles();
  const { speechState } = useSpeechContext();
  const main = useRef(null);
  const executeScroll = () => {
    main.current.scrollIntoView();
  };
  useEffect(() => {
    if (speechState === speechState.Recording) {
      executeScroll();
    }
  }, [speechState]);
  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ height: '100vh' }}
      >
        <Grid item xs={12} sm={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid ref={main} item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last}>
          <Details title="Expense" />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </div>
  );
};

export default App;
