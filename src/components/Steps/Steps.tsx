import IncomesComponent from "../Incomes/Incomes";
import LivingExpensesComponent from "../LivingExpenses/LivingExpenses";
import VariableExpensesComponent from "../VariableExpenses/VariableExpenses";
import Summary from "../Summary/Summary";
import React from "react";
import { BudgetForm, Steps } from "../../types";
import useFSM from "../../hooks/useFsm";

interface StepsProps {
  data: BudgetForm;
}
const StepsComponent: React.FC<StepsProps> = ({ data }) => {
  const { transition, currentState } = useFSM();

  const componentMap: Record<Steps, React.FC<any>> = {
    incomes: IncomesComponent,
    livingExpenses: LivingExpensesComponent,
    variableExpenses: VariableExpensesComponent,
    summary: Summary,
  };
  const currenStep = data[currentState];

  const ComponentToRender = componentMap[currentState];

  return <ComponentToRender transition={transition} currenStep={currenStep} />;
};

export default StepsComponent;
