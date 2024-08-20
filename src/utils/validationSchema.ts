import * as Yup from "yup";
import { InputField } from "../types";

export const createValidationSchema = (inputFields: InputField[]) => {
  const shape: Record<string, any> = {};
  inputFields.forEach((field) => {
    shape[field.name] = Yup.number()
      .typeError("Must be a number")
      .min(0, "Cannot be less than zero");
    if (field.isRequired) {
      shape[field.name] = shape[field.name].required("Required");
    }
  });
  return Yup.object().shape(shape);
};
