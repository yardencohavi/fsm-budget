import { StepForm } from "../types";
import { createValidationSchema } from "../utils/validationSchema";

interface FormHandlerProps {
  currenStep: StepForm;
}

export const useFormHandler = ({ currenStep }: FormHandlerProps) => {
  const initialValues =
    currenStep.inputs?.reduce(
      (acc, input) => ({ ...acc, [input.name]: "" }),
      {} as Record<string, string>
    ) || {};

  const validationSchema = createValidationSchema(currenStep.inputs || []);

  return {
    initialValues,
    validationSchema,
  };
};
