import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import useStyles from './style';
import useTransactions from '../../Hooks/useTransactions';

const Details = ({ title }) => {
  const classes = useStyles();
  const { total, chartData } = useTransactions(title);
  return (
    <Card className={title === 'Income' ? classes.income : classes.expenses}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="h5">&#8377;{total}</Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
};

export default Details;
