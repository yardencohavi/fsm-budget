import IncomesComponent from "../IncomesForm/IncomesForm";
import LivingExpensesForm from "../LivingExpensesForm/LivingExpensesForm";
import VariableExpensesForm from "../VariableExpensesForm/VariableExpensesForm";
import Summary from "../Summary/Summary";
import React from "react";
import { BudgetForm, States } from "../../types";
import useFSM from "../../hooks/useFsm";

interface StepsProps {
  data: BudgetForm;
}
const StatesComponent: React.FC<StepsProps> = ({ data }) => {
  const { transition, currentState } = useFSM();

  const componentMap: Record<States, React.ComponentType<any>> = {
    incomes: IncomesComponent,
    livingExpenses: LivingExpensesForm,
    variableExpenses: VariableExpensesForm,
    summary: Summary,
  };

  const currentStateForm = data[currentState];

  const ComponentToRender = componentMap[currentState];

  return (
    <ComponentToRender
      transition={transition}
      currentStateForm={currentStateForm}
    />
  );
};

export default StatesComponent;
