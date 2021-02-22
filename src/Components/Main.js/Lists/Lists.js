import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from '@material-ui/core';

import { Delete, MoneyOff } from '@material-ui/icons';

import useStyles from './style';

const Lists = () => {
  const classes = useStyles();

  const transaction = [
    {
      id: 1,
      type: 'Expense',
      catagory: 'Business',
      amount: 50,
      date: 'Wed Dec 16',
    },
    { id: 2, type: 'Expense', catagory: 'Pet', amount: 50, date: 'Wed Dec 16' },
    {
      id: 3,
      type: 'Income',
      catagory: 'Salary',
      amount: 150,
      date: 'Wed Dec 16',
    },
  ];
  return (
    <List dense={false} className={classes.list}>
      {transaction.map(transaction => (
        <Slide
          direction="down"
          in
          mountOnEnter
          unmountOnExit
          key={transaction.id}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={
                  transaction.type === 'Income'
                    ? classes.avatarIncome
                    : classes.avatarExpense
                }
              >
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={transaction.catagory}
              secondary={`$${transaction.amount} - ${transaction.date}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick="">
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </List>
  );
};

export default Lists;
