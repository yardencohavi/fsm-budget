import { RootState } from "../../store/store";
import IncomesComponent from "../Incomes/Incomes";
import LivingExpensesComponent from "../LivingExpenses/LivingExpenses";
import VariableExpensesComponent from "../VariableExpenses/VariableExpenses";
import Summary from "../Summary/Summary";
import { useSelector } from "react-redux";
import React from "react";
import { BudgetForm } from "../../types";

interface StepsProps {
  data: BudgetForm;
}
const Steps: React.FC<StepsProps> = ({ data }) => {
  const currentState = useSelector(
    (state: RootState) => state.fsm.currentState
  );
  const componentMap = {
    incomes: IncomesComponent,
    livingExpenses: LivingExpensesComponent,
    variableExpenses: VariableExpensesComponent,
    summary: Summary,
  };
  const currenStep = data[currentState];

  const ComponentToRender = componentMap[currentState];

  return <ComponentToRender currenStep={currenStep} />;
};

export default Steps;
