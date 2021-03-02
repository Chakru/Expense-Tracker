import React from 'react';

const InfoCard = () => {
  const isIncome = Math.round(Math.random());
  return (
    <div style={{ textAlign: 'center', padding: '0 10%' }}>
      Try Saying: <br />
      Add {isIncome ? 'Income ' : 'Expense '}
      of &#8377; {isIncome ? '100 ' : '50 '}
      in category {isIncome ? 'Salary ' : 'House '}
      for {isIncome ? 'Monday ' : 'Tuesday '}
    </div>
  );
};

export default InfoCard;
