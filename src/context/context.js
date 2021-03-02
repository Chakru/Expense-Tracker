import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [
  {
    amount: 20,
    type: 'Expense',
    category: 'Food',
    date: '2021-03-01',
    id: 'f934ae5a-4d27-45bf-ad46-9b8aa95fa9f9',
  },
  {
    amount: 300,
    type: 'Expense',
    category: 'House',
    date: '2021-03-01',
    id: '559bff5e-7053-4612-af10-5751a4106541',
  },
  {
    amount: 500,
    type: 'Income',
    category: 'Deposits',
    date: '2021-03-01',
    id: 'adfdb96c-71cc-4256-a917-2ab95ce36ce3',
  },
  {
    amount: 1000,
    type: 'Income',
    category: 'Salary',
    date: '2021-03-01',
    id: '005ba0b9-0989-4cc8-910c-a100824a44b9',
  },
];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = id => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const addTransaction = transaction => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const balance = transactions.reduce((acc, currValue) => {
    return currValue.type === 'Expense'
      ? acc - currValue.amount
      : acc + currValue.amount;
  }, 0);
  return (
    <ExpenseTrackerContext.Provider
      value={{ deleteTransaction, addTransaction, transactions, balance }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
