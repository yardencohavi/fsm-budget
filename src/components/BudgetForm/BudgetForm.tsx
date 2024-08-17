import { Container } from "./styles";
import { useEffect, useState } from "react";
import Steps from "../Steps/Steps";
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
      <h1>Budget management calculator</h1>
      {data && <Steps data={data} />}
    </Container>
  );
};

export default Budget;
