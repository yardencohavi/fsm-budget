export type States =
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

export type InputField = {
  name: string;
  isRequired: boolean;
};
export type Form = {
  title: string;
  inputs: InputField[];
  nextTransition: States;
};
export type BudgetForm = Record<States, Form>;

export interface HighlightText {
  withColor: string;
  title: string;
}

export interface FinancialMessage {
  color: string;
  highlightText: HighlightText;
  message: string;
}
export interface FormComponentProps {
  currentStateForm: Form;
  transition: (state: string) => void;
}
