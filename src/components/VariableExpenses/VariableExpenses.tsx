import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { setTransition, setVariableExpenses } from "../../store/fsmSlice";
import { VariableExpenses } from "../../types";
import {
  Button,
  Container,
  ErrorText,
  Input,
  InputGroup,
  Label,
} from "../../styles/globalStyles";
import { Props } from "../Incomes/Incomes";
import { createValidationSchema } from "../../utils/validationSchema";

const VariableExpensesComponent: React.FC<Props> = ({ currenStep }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <h2>{currenStep.title}</h2>
      <Formik
        initialValues={{ groceries: "", sport: "", entertainment: "" }}
        validationSchema={createValidationSchema(currenStep.inputs || [])}
        onSubmit={(values: {
          groceries: string;
          sport: string;
          entertainment: string;
        }) => {
          const formattedValues: VariableExpenses = {
            groceries: Number(values.groceries),
            sport: Number(values.sport),
            entertainment: Number(values.entertainment),
          };

          dispatch(setVariableExpenses(formattedValues));
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

export default VariableExpensesComponent;
