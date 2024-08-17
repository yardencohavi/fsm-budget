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

  const { score, surplus } = calculateScore(incomes, {
    livingExpenses,
    variableExpenses,
  });

  return (
    <Container>
      <Header>
        <h2>Summary</h2>
        {surplus > 0 ? (
          <div>
            <p>Great! Your income is higher than your expenses.</p>
            <p> You're managing your finances well.</p>
          </div>
        ) : surplus === 0 ? (
          <div>
            <p>Your income matches your expenses.</p>
            <p>
              Be cautious as any additional expense could lead to overspending.
            </p>
          </div>
        ) : (
          <div>
            <p>Your expenses exceed your income. </p>
            <p>Consider adjusting your budget to avoid overspending.</p>
          </div>
        )}
      </Header>
      <ScoreLevel limit={score} />
    </Container>
  );
};

export default Summary;
