import { FormikValues } from "formik";
import { setLivingExpenses } from "../../store/fsmSlice";
import BaseFormComponent from "../BaseFormComponent/BaseFormComponent";
import { LivingExpenses, FormComponentProps } from "../../types";
import { useDispatch } from "react-redux";
import { useFormHandler } from "../../hooks/useFormHandler";

const LivingExpensesForm: React.FC<FormComponentProps> = ({
  currentStateForm,
  transition,
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values: FormikValues) => {
    const formattedValues: LivingExpenses = currentStateForm.inputs?.reduce(
      (acc, input) => {
        acc[input.name as keyof LivingExpenses] = Number(values[input.name]);
        return acc;
      },
      {} as LivingExpenses
    );
    transition(currentStateForm.nextTransition);
    dispatch(setLivingExpenses(formattedValues));
  };
  const { initialValues, validationSchema } = useFormHandler({
    currentStateForm,
  });

  return (
    <BaseFormComponent
      title={currentStateForm.title}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      inputs={currentStateForm.inputs}
    />
  );
};

export default LivingExpensesForm;
