import React, { useState, useContext } from 'react';
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import makeStyles from './style';
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuid } from 'uuid';
import {
  incomeCategories,
  expenseCategories,
} from '../../../constants/Categories';
import DateFormat from '../../../utils/DateFormat';

const initialState = {
  amount: '',
  type: 'Income',
  category: '',
  date: DateFormat(new Date()),
};

const Forms = () => {
  const classes = makeStyles();
  const [formData, setFormData] = useState(initialState);
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const selectedCategory =
    formData.type === 'Income' ? incomeCategories : expenseCategories;

  const createTransaction = () => {
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuid(),
    };
    addTransaction(transaction);
    setFormData(initialState);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          ...
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={e => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={e =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategory.map(c => (
              <MenuItem key={c.type} value={c.type}>
                {c.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={e =>
            setFormData({
              ...formData,
              amount: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={e =>
            setFormData({
              ...formData,
              date: DateFormat(e.target.value),
            })
          }
        />
      </Grid>
      <Button
        fullWidth
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Forms;
