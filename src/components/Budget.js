import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Budget = () => {
  const { budget, currency, dispatch } = useContext(AppContext);

  const handleBudgetChange = (event) => {
    const value = parseInt(event.target.value);
    dispatch({
      type: "SET_BUDGET",
      payload: value,
    });
  };
  return (
    <div className="alert alert-secondary">
      <label htmlFor="budget-input">Budget: {currency}</label>
      <input
        id="budget-input"
        style={{ marginLeft: "2px" }}
        type="number"
        step="10"
        value={budget}
        onChange={handleBudgetChange}
        max="20000"
        min="0"
      />
    </div>
  );
};
export default Budget;
