import React from "react";
import { setIncomes } from "../../store/fsmSlice";
import { useDispatch } from "react-redux";
import { FormikValues } from "formik";
import BaseFormComponent from "../BaseFormComponent/BaseFormComponent";
import { Incomes, StepForm } from "../../types";
import { useFormHandler } from "../../hooks/useFormHandler";

interface IncomesFormProps {
  currenStep: StepForm;
  transition: (step: string) => void;
}
const IncomesForm: React.FC<IncomesFormProps> = ({
  currenStep,
  transition,
}) => {
  const dispatch = useDispatch();
  const onSubmit = (values: FormikValues) => {
    const formattedValues: Incomes = currenStep.inputs?.reduce((acc, input) => {
      acc[input.name as keyof Incomes] = Number(values[input.name]);
      return acc;
    }, {} as Incomes);
    transition(currenStep.nextTransition);
    dispatch(setIncomes(formattedValues));
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

export default IncomesForm;
