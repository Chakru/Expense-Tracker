import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Grid,
} from '@material-ui/core';

import makeStyles from './style';
import Forms from './Forms/Forms';
import Lists from './Lists/Lists';

const Main = () => {
  const classes = makeStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title="Expense Tracker" />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance &#8377;
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ lineHeight: '1.5em', marginTop: '20px' }}
        >
          {/* <InfoCard /> */}
          Try Saying: Add income of &#8377;100 as salary on Monday
        </Typography>
        <Divider />
        <Forms />
      </CardContent>
      <CardContent className={classes.cardContainer}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Lists />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
