import React, { useContext } from 'react';
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
import { ExpenseTrackerContext } from '../../context/context';
import InfoCard from './InfoCard';

const Main = () => {
  const classes = makeStyles();
  const { balance } = useContext(ExpenseTrackerContext);
  return (
    <Card className={classes.root}>
      <CardHeader title="Expense Tracker" />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance &#8377; {balance}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ lineHeight: '1.5em', marginTop: '20px' }}
        >
          <InfoCard />
        </Typography>
        <Divider className={classes.divider} />
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
