import Decimal from "decimal.js";
import { Incomes, TotalExpenses } from "../types";

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

interface HighlightText {
  withColor: string;
  title: string;
}

interface FinancialMessage {
  color: string;
  highlightText: HighlightText;
  message: string;
}
const financialMessageMap = new Map<number, FinancialMessage>([
  [
    0,
    {
      color: "green",
      highlightText: {
        withColor: " less than half",
        title: " of your salary.",
      },
      message:
        "Good job! You are wasting less than 50% of your income. Your financial management is on track, but continue to monitor and optimize your spending.",
    },
  ],
  [
    1,
    {
      color: "#FFA500", // Orange color
      highlightText: {
        withColor: " a significant portion",
        title: " of your salary.",
      },
      message:
        "You are wasting between 50% and 75% of your income. Your financial situation could be improved by cutting unnecessary expenses.",
    },
  ],
  [
    2,
    {
      color: "red",
      highlightText: {
        withColor: " a large",
        title: " majority of your salary.",
      },
      message:
        "You are wasting more than 75% of your income. This indicates poor financial management. Consider reducing expenses significantly to improve your financial health.",
    },
  ],
  [
    3,
    {
      color: "red",
      highlightText: { withColor: " more than ", title: " your entire salary" },
      message:
        "Your income is not sufficient to cover your expenses. Immediate financial adjustments are needed.",
    },
  ],
]);

const getFinancialMessage = (
  monthlyIncomes: Decimal,
  totalExpenses: Decimal,
  wastePercentage: number
): FinancialMessage => {
  let status: number;

  if (monthlyIncomes.lessThanOrEqualTo(totalExpenses)) {
    status = 3; // Income is not sufficient to cover expenses
  } else {
    status = wastePercentage > 75 ? 2 : wastePercentage > 50 ? 1 : 0; // Waste percentage <= 50
  }

  return (
    financialMessageMap.get(status) || {
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
