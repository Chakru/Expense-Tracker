import React, { useState, useContext, useEffect } from 'react';
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
import { useSpeechContext } from '@speechly/react-client';
import makeStyles from './style';
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuid } from 'uuid';
import {
  incomeCategories,
  expenseCategories,
} from '../../../constants/Categories';
import DateFormat from '../../../utils/DateFormat';
import CustomizedSnackbar from '../../Snackbar/CustomizedSnackbar';

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
  const { segment, toggleRecording } = useSpeechContext();
  const [open, setOpen] = useState(false);

  const selectedCategory =
    formData.type === 'Income' ? incomeCategories : expenseCategories;

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) {
      return;
    }
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuid(),
    };
    setOpen(true);
    addTransaction(transaction);
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === 'add_expense') {
        setFormData({ ...formData, type: 'Expense' });
      } else if (segment.intent.intent === 'add_income') {
        setFormData({ ...formData, type: 'Income' });
      } else if (
        segment.isFinal.intent &&
        segment.intent.intent === 'create_transaction'
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === 'cancel_transaction'
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach(e => {
        const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase}`;
        switch (e.type) {
          case 'amount':
            setFormData({ ...formData, amount: e.value });
            break;
          case 'category':
            if (incomeCategories.map(ic => ic.type).includes(category)) {
              setFormData({ ...formData, type: 'Income', category });
            } else if (
              expenseCategories.map(ec => ec.type).includes(category)
            ) {
              setFormData({ ...formData, type: 'Expense', category });
            }
            setFormData({ ...formData, category });
            break;
          case 'date':
            setFormData({ ...formData, date: e.value });
            break;
          default:
            break;
        }
      });
      if (
        segment.isFinal &&
        formData.type &&
        formData.category &&
        formData.amount &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <CustomizedSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && segment.words.map(w => w.value).join(' ')}
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
