export type Steps =
  | "incomes"
  | "livingExpenses"
  | "variableExpenses"
  | "summary";

export interface LivingExpenses {
  rent?: number;
  mortgage?: number;
  insurance?: number;
}
export interface VariableExpenses {
  groceries?: number;
  sport?: number;
  entertainment?: number;
}
export interface TotalExpenses {
  livingExpenses: LivingExpenses;
  variableExpenses: VariableExpenses;
}

export interface Incomes {
  salary?: number;
  other?: number;
}

export type InputObj = {
  name: string;
  isRequired: boolean;
};
export type StepForm = {
  title: string;
  inputs: InputObj[];
  nextTransition: Steps;
};
export type BudgetForm = Record<Steps, StepForm>;

export interface HighlightText {
  withColor: string;
  title: string;
}

export interface FinancialMessage {
  color: string;
  highlightText: HighlightText;
  message: string;
}
