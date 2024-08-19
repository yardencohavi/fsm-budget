import { FormikValues } from "formik";
import { useDispatch } from "react-redux";
import { setVariableExpenses } from "../../store/fsmSlice";
import { StepForm, VariableExpenses } from "../../types";

import BaseFormComponent from "../BaseFormComponent/BaseFormComponent";
import { useFormHandler } from "../../hooks/useFormHandler";

interface VariableExpensesComponentProps {
  currenStep: StepForm;
  transition: (step: string) => void;
}
const VariableExpensesComponent: React.FC<VariableExpensesComponentProps> = ({
  currenStep,
  transition,
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values: FormikValues) => {
    const formattedValues: VariableExpenses = currenStep.inputs?.reduce(
      (acc, input) => {
        acc[input.name as keyof VariableExpenses] = Number(values[input.name]);
        return acc;
      },
      {} as VariableExpenses
    );
    transition(currenStep.nextTransition);
    dispatch(setVariableExpenses(formattedValues));
  };

  const { initialValues, validationSchema } = useFormHandler({
    currenStep,
  });
  return (
    <BaseFormComponent
      title={currenStep.title}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      inputs={currenStep.inputs}
    />
  );
};

export default VariableExpensesComponent;
