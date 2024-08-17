import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ScoreLevel from "../ScoreLevel/ScoreLevel";
import calculateScore from "../../utils/calculateScore";
import { Container } from "../../styles/globalStyles";
import { Header } from "./styles";

const Summary = () => {
  const { incomes, livingExpenses, variableExpenses } = useSelector(
    (state: RootState) => state.fsm
  );

  const { score, color, message } = calculateScore(incomes, {
    livingExpenses,
    variableExpenses,
  });

  return (
    <Container>
      <Header>
        <h2>Summary</h2>
        <p>{message}</p>
      </Header>
      <ScoreLevel color={color} limit={score} />
    </Container>
  );
};

export default Summary;
