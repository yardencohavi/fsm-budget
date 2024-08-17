import { RootState } from "../../store/store";
import IncomesComponent from "../Incomes/Incomes";
import LivingExpensesComponent from "../LivingExpenses/LivingExpenses";
import VariableExpensesComponent from "../VariableExpenses/VariableExpenses";
import Summary from "../Summary/Summary";
import { useSelector } from "react-redux";
import { FormContainer } from "../BudgetForm/styles";
import React from "react";
import { BudgetForm } from "../../types";

interface StepsProps {
  data: BudgetForm;
}
const Steps: React.FC<StepsProps> = ({ data }) => {
  const currentState = useSelector(
    (state: RootState) => state.fsm.currentState
  );
  const currenStep = data[currentState];
  return (
    <FormContainer>
      {currentState === "incomes" && (
        <IncomesComponent currenStep={currenStep} />
      )}
      {currentState === "livingExpenses" && (
        <LivingExpensesComponent currenStep={currenStep} />
      )}
      {currentState === "variableExpenses" && (
        <VariableExpensesComponent currenStep={currenStep} />
      )}
      {currentState === "summary" && <Summary />}
    </FormContainer>
  );
};

export default Steps;
