import React from "react";
import { Formik, Form, FormikValues } from "formik";
import {
  Button,
  Container,
  ErrorText,
  Input,
  InputGroup,
  Label,
} from "../../styles/globalStyles";
import { InputField } from "../../types";

interface BaseFormProps {
  initialValues: object;
  validationSchema: object;
  onSubmit: (values: FormikValues) => void;
  inputs: InputField[];
  title: string;
}

const BaseFormComponent: React.FC<BaseFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  inputs,
  title,
}) => {
  return (
    <Container>
      <h2>{title}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {inputs.map((input) => (
              <InputGroup key={input.name}>
                <Label htmlFor={input.name}>{input.name}:</Label>
                <Input
                  data-testid={`input-${input.name}`}
                  type="text"
                  name={input.name}
                />
                <ErrorText name={input.name} component="div" />
              </InputGroup>
            ))}
            <Button disabled={isSubmitting} type="submit">
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default BaseFormComponent;
