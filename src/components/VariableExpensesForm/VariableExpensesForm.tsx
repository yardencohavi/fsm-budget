import { FormikValues } from "formik";
import { useDispatch } from "react-redux";
import { setVariableExpenses } from "../../store/fsmSlice";
import { FormComponentProps, VariableExpenses } from "../../types";

import BaseFormComponent from "../BaseFormComponent/BaseFormComponent";
import { useFormHandler } from "../../hooks/useFormHandler";

const VariableExpensesForm: React.FC<FormComponentProps> = ({
  currentStateForm,
  transition,
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values: FormikValues) => {
    const formattedValues: VariableExpenses = currentStateForm.inputs?.reduce(
      (acc, input) => {
        acc[input.name as keyof VariableExpenses] = Number(values[input.name]);
        return acc;
      },
      {} as VariableExpenses
    );
    transition(currentStateForm.nextTransition);
    dispatch(setVariableExpenses(formattedValues));
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

export default VariableExpensesForm;
