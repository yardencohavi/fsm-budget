import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BudgetForm,
  Incomes,
  LivingExpenses,
  Steps,
  VariableExpenses,
} from "../types";

interface FSMState {
  currentState: Steps;
  budgetForm: BudgetForm | null;
  incomes: Incomes;
  livingExpenses: LivingExpenses;
  variableExpenses: VariableExpenses;
}

const initialState: FSMState = {
  currentState: "incomes",
  budgetForm: null,
  incomes: {},
  livingExpenses: {},
  variableExpenses: {},
};

const fsmSlice = createSlice({
  name: "fsm",
  initialState,
  reducers: {
    setTransition(state, action: PayloadAction<Steps>) {
      state.currentState = action.payload;
    },
    setFormData(state, action: PayloadAction<BudgetForm>) {
      state.budgetForm = action.payload;
    },
    setLivingExpenses(state, action: PayloadAction<LivingExpenses>) {
      state.livingExpenses = action.payload;
    },
    setIncomes(state, action: PayloadAction<Incomes>) {
      state.incomes = action.payload;
    },
    setVariableExpenses(state, action: PayloadAction<VariableExpenses>) {
      state.variableExpenses = action.payload;
    },
  },
});

export const {
  setTransition,
  setLivingExpenses,
  setIncomes,
  setVariableExpenses,
  setFormData,
} = fsmSlice.actions;
export const fsmReducer = fsmSlice.reducer;
