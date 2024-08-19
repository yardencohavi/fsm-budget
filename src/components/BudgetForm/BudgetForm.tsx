import { Container, Title } from "./styles";
import { useEffect, useState } from "react";
import StepsComponent from "../Steps/Steps";
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
      {data && <StepsComponent data={data} />}
      {/* //add loader */}
    </Container>
  );
};

export default Budget;
