import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { setLivingExpenses, setTransition } from "../../store/fsmSlice";
import { LivingExpenses } from "../../types";
import {
  Button,
  Container,
  ErrorText,
  Input,
  InputGroup,
  Label,
} from "../../styles/globalStyles";
import React from "react";
import { Props } from "../Incomes/Incomes";
import { createValidationSchema } from "../../utils/validationSchema";

const LivingExpensesComponent: React.FC<Props> = ({ currenStep }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <h2>{currenStep.title}</h2>
      <Formik
        initialValues={{ rent: "", mortgage: "", insurance: "" }}
        validationSchema={createValidationSchema(currenStep.inputs || [])}
        onSubmit={(values) => {
          const formattedValues: LivingExpenses = {
            rent: Number(values.rent),
            mortgage: Number(values.mortgage),
            insurance: Number(values.insurance),
          };
          dispatch(setLivingExpenses(formattedValues));
          dispatch(setTransition(currenStep.nextTransition));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {currenStep.inputs?.map((input) => (
              <InputGroup key={input.name}>
                <Label htmlFor={input.name}>{input.name}:</Label>
                <Input type="text" name={input.name} />
                <ErrorText name={input.name} component="div" />
              </InputGroup>
            ))}
            <Button type="submit" disabled={isSubmitting}>
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LivingExpensesComponent;
