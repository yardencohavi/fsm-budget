import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { setIncomes, setTransition } from "../../store/fsmSlice";
import { Incomes, StepForm } from "../../types";
import {
  Button,
  Container,
  ErrorText,
  Input,
  InputGroup,
  Label,
} from "../../styles/globalStyles";
import { createValidationSchema } from "../../utils/validationSchema";

export interface Props {
  currenStep: StepForm;
}

const IncomesComponent: React.FC<Props> = ({ currenStep }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <h2>{currenStep.title}</h2>
      <Formik
        initialValues={{
          salary: "",
          other: "",
          ...currenStep.inputs?.reduce(
            (acc, input) => ({ ...acc, [input.name]: "" }),
            {}
          ),
        }} // Initialize form fields dynamically
        validationSchema={createValidationSchema(currenStep.inputs || [])}
        onSubmit={(values) => {
          const formattedValues: Incomes = {
            salary: Number(values.salary),
            other: Number(values.other),
          };

          dispatch(setIncomes(formattedValues));
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

export default IncomesComponent;
