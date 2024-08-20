import { Form } from "../types";
import { createValidationSchema } from "../utils/validationSchema";

interface FormHandlerProps {
  currentStateForm: Form;
}

export const useFormHandler = ({ currentStateForm }: FormHandlerProps) => {
  console.log(currentStateForm, "currentStateForm");

  const initialValues =
    currentStateForm.inputs?.reduce(
      (acc, input) => ({ ...acc, [input.name]: "" }),
      {} as Record<string, string>
    ) || {};

  const validationSchema = createValidationSchema(
    currentStateForm.inputs || []
  );

  return {
    initialValues,
    validationSchema,
  };
};
