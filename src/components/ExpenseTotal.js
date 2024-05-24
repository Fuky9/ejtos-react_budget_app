import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ExpenseTotal = () => {
  const { totalExpenses, currency } = useContext(AppContext);

  return (
    <div className="alert alert-primary">
      <span>
        Spent so far: {currency}
        {totalExpenses}
      </span>
    </div>
  );
};

export default ExpenseTotal;
