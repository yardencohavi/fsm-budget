import { render, screen, waitFor } from "@testing-library/react";
import * as api from "../api/api"; // Import the API module

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { fsmReducer } from "../store/fsmSlice";
import { BudgetForm } from "../types";
import Budget from "../components/BudgetForm/BudgetForm";

jest.mock("../api/api");

const store = configureStore({
  reducer: { fsm: fsmReducer },
  // middleware: [thunk],
});
const mockData: BudgetForm = {
  incomes: {
    title: "Incomes",
    inputs: [
      { name: "Salary", isRequired: true },
      { name: "Other", isRequired: true },
    ],
    nextTransition: "livingExpenses",
  },
  livingExpenses: {
    title: "Living Expenses",
    inputs: [
      { name: "Rent", isRequired: true },
      { name: "Mortgage", isRequired: true },
      { name: "Insurance", isRequired: true },
    ],
    nextTransition: "variableExpenses",
  },
  variableExpenses: {
    title: "Variable Expenses",
    inputs: [
      { name: "Groceries", isRequired: true },
      { name: "Sport", isRequired: true },
      { name: "Entertainment", isRequired: true },
    ],
    nextTransition: "summary",
  },
  summary: {
    title: "Summary",
    inputs: [],
    nextTransition: "incomes",
  },
};

describe("Budget Component", () => {
  it("renders the title", async () => {
    (api.getBudgetFormData as jest.Mock).mockResolvedValue(mockData);

    render(
      <Provider store={store}>
        <Budget />
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Budget management calculator")
      ).toBeInTheDocument();
    });
  });

  it("renders StepsComponent with data when API call is successful", async () => {
    (api.getBudgetFormData as jest.Mock).mockResolvedValue(mockData);

    render(
      <Provider store={store}>
        <Budget />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Incomes")).toBeInTheDocument();
    });
  });

  it("handles API failure gracefully", async () => {
    (api.getBudgetFormData as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    render(
      <Provider store={store}>
        <Budget />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Incomes")).not.toBeInTheDocument();
    });
  });
});
