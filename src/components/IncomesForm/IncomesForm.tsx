import React from "react";
import { setIncomes } from "../../store/fsmSlice";
import { useDispatch } from "react-redux";
import { FormikValues } from "formik";
import BaseFormComponent from "../BaseFormComponent/BaseFormComponent";
import { Incomes, FormComponentProps } from "../../types";
import { useFormHandler } from "../../hooks/useFormHandler";

const IncomesForm: React.FC<FormComponentProps> = ({
  currentStateForm,
  transition,
}) => {
  const dispatch = useDispatch();
  const onSubmit = (values: FormikValues) => {
    const formattedValues: Incomes = currentStateForm.inputs?.reduce(
      (acc, input) => {
        acc[input.name as keyof Incomes] = Number(values[input.name]);
        return acc;
      },
      {} as Incomes
    );
    transition(currentStateForm.nextTransition);
    dispatch(setIncomes(formattedValues));
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

export default IncomesForm;
