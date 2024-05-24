import React, { createContext, useReducer } from "react";

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
  let newTotalExpenses;

  switch (action.type) {
    case "ADD_EXPENSE":
      newTotalExpenses = state.totalExpenses + action.payload.cost;
      if (newTotalExpenses <= state.budget) {
        const updatedExpenses = state.expenses.map((expense) =>
          expense.name === action.payload.name
            ? { ...expense, cost: expense.cost + action.payload.cost }
            : expense
        );
        return {
          ...state,
          expenses: updatedExpenses,
          totalExpenses: newTotalExpenses,
          remaining: state.budget - newTotalExpenses,
        };
      } else {
        alert("Cannot increase the allocation! Out of funds");
        return state;
      }

    case "RED_EXPENSE":
      newTotalExpenses = state.totalExpenses - action.payload.cost;
      const expenseNegative = state.expenses.find(
        (expense) =>
          expense.name === action.payload.name &&
          expense.cost < action.payload.cost
      );

      if (expenseNegative) {
        alert("Expenses cannot be negative");
        return state;
      } else {
        const updatedExpenses = state.expenses.map((expense) =>
          expense.name === action.payload.name
            ? { ...expense, cost: expense.cost - action.payload.cost }
            : expense
        );
        return {
          ...state,
          expenses: updatedExpenses,
          totalExpenses: newTotalExpenses,
          remaining: state.budget - newTotalExpenses,
        };
      }

    case "DELETE_EXPENSE":
      const deleteExpenses = state.expenses.map((expense) =>
        expense.id === action.payload ? { ...expense, cost: 0 } : expense
      );

      newTotalExpenses = deleteExpenses.reduce((total, expense) => {
        return total + expense.cost;
      }, 0);

      return {
        ...state,
        totalExpenses: newTotalExpenses,
        remaining: state.budget - newTotalExpenses,
        expenses: deleteExpenses,
      };

    case "SET_BUDGET":
      if (action.payload > 20000) {
        alert(`Maximal budget value is ${state.currency}20000`);
        return state;
      } else if (action.payload < state.totalExpenses) {
        alert("Budget cannot be lower than expenses");
        return state;
      }
      return {
        ...state,
        budget: action.payload,
      };

    case "CHG_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };

    default:
      return state;
  }
};

// 1. Sets the initial state when the app loads
const initialState = {
  budget: 2000,
  expenses: [
    { id: "Marketing", name: "Marketing", cost: 50 },
    { id: "Finance", name: "Finance", cost: 300 },
    { id: "Sales", name: "Sales", cost: 70 },
    { id: "Human Resource", name: "Human Resource", cost: 40 },
    { id: "IT", name: "IT", cost: 500 },
  ],
  currency: "£",
  totalExpenses: 960,
  remaining: 1040,
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
  // 4. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);
  let remaining = 0;
  let totalExpenses = 0;

  if (state.expenses) {
    totalExpenses = state.expenses.reduce((total, item) => {
      return (total = total + item.cost);
    }, 0);

    remaining = state.budget - totalExpenses;
  }

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        budget: state.budget,
        remaining: remaining,
        totalExpenses: totalExpenses,
        dispatch,
        currency: state.currency,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
