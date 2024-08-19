import { FormikValues } from "formik";
import { setLivingExpenses } from "../../store/fsmSlice";
import BaseFormComponent from "../BaseFormComponent/BaseFormComponent";
import { LivingExpenses, StepForm } from "../../types";
import { useDispatch } from "react-redux";
import { useFormHandler } from "../../hooks/useFormHandler";

interface LivingExpensesComponentProps {
  currenStep: StepForm;
  transition: (step: string) => void;
}
const LivingExpensesComponent: React.FC<LivingExpensesComponentProps> = ({
  currenStep,
  transition,
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values: FormikValues) => {
    const formattedValues: LivingExpenses = currenStep.inputs?.reduce(
      (acc, input) => {
        acc[input.name as keyof LivingExpenses] = Number(values[input.name]);
        return acc;
      },
      {} as LivingExpenses
    );
    transition(currenStep.nextTransition);
    dispatch(setLivingExpenses(formattedValues));
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

export default LivingExpensesComponent;
