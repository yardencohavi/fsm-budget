import { Container, Title } from "./styles";
import { useEffect, useState } from "react";
import StatesComponent from "../StatesComponent/StatesComponent";
import { getBudgetFormData } from "../../api/api";
import { BudgetForm } from "../../types";

const Budget = () => {
  const [data, setData] = useState<BudgetForm>();

  useEffect(() => {
    getBudgetFormData()
      .then((response) => {
        setData(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Title>Budget management calculator</Title>
      {data && <StatesComponent data={data} />}
    </Container>
  );
};

export default Budget;
