import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Incomes, LivingExpenses, VariableExpenses } from "../types";

interface FSMState {
  incomes: Incomes;
  livingExpenses: LivingExpenses;
  variableExpenses: VariableExpenses;
}

const initialState: FSMState = {
  incomes: {},
  livingExpenses: {},
  variableExpenses: {},
};

const fsmSlice = createSlice({
  name: "fsm",
  initialState,
  reducers: {
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

export const { setLivingExpenses, setIncomes, setVariableExpenses } =
  fsmSlice.actions;
export const fsmReducer = fsmSlice.reducer;
