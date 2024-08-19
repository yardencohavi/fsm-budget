import Decimal from "decimal.js";
import { FinancialMessage, Incomes, TotalExpenses } from "../types";
import { financialMessageMap } from "../consts/consts";

const sumValues = (valueObject: {
  [key: string]: number | undefined;
}): Decimal =>
  Object.values(valueObject).reduce(
    (total, value) => total.plus(new Decimal(value || 0)),
    new Decimal(0)
  );

const getIncomes = (incomes: Incomes): Decimal => {
  return sumValues(incomes as { [key: string]: number | undefined });
};

const getExpenses = (expenses: TotalExpenses): Decimal => {
  const { livingExpenses, variableExpenses } = expenses;

  const livingExpensesTotal = sumValues(
    livingExpenses as { [key: string]: number | undefined }
  );
  const variableExpensesTotal = sumValues(
    variableExpenses as { [key: string]: number | undefined }
  );

  return livingExpensesTotal.plus(variableExpensesTotal);
};

const getFinancialMessage = (
  monthlyIncomes: Decimal,
  totalExpenses: Decimal,
  wastePercentage: number
): FinancialMessage => {
  let status: number;

  if (totalExpenses.isZero()) {
    status = 4;
  } else if (monthlyIncomes.lessThanOrEqualTo(totalExpenses)) {
    status = 3; // Income is not sufficient to cover expenses
  } else {
    status = wastePercentage > 75 ? 2 : wastePercentage > 50 ? 1 : 0; // Waste percentage <= 50
  }

  return (
    financialMessageMap[status] || {
      color: "gray",
      highlightText: { withColor: "", title: "" },
      message: "Unknown financial situation.",
    }
  );
};
const calculateScore = (
  incomes: Incomes,
  expenses: TotalExpenses
): {
  highlightText: { withColor: string; title: string };
  score: number;
  color: string;
  message: string;
} => {
  const monthlyIncomes = getIncomes(incomes);
  const totalExpenses = getExpenses(expenses);
  const wastePercentage = new Decimal(
    totalExpenses.div(monthlyIncomes).mul(100)
  ).toNumber();

  const financialMessage = getFinancialMessage(
    monthlyIncomes,
    totalExpenses,
    wastePercentage
  );

  return {
    score: Math.floor(wastePercentage),
    ...financialMessage,
  };
};

export default calculateScore;
