import Decimal from "decimal.js";
import { Incomes, TotalExpenses } from "../types";

const getIncomes = (incomes: Incomes): Decimal => {
  const salary = new Decimal(incomes.salary || 0);
  const otherSources = new Decimal(incomes.other || 0);
  const monthlyIncomes = salary.plus(otherSources);
  return monthlyIncomes;
};

const getExpenses = (expenses: TotalExpenses): Decimal => {
  const livingExpenses = expenses.livingExpenses || {};
  const rent = new Decimal(livingExpenses.rent || 0);
  const mortgage = new Decimal(livingExpenses.mortgage || 0);
  const insurance = new Decimal(livingExpenses.insurance || 0);
  const livingExpensesTotal = rent.plus(mortgage).plus(insurance);

  const variableExpenses = expenses.variableExpenses || {};
  const groceries = new Decimal(variableExpenses.groceries || 0);
  const sport = new Decimal(variableExpenses.sport || 0);
  const entertainment = new Decimal(variableExpenses.entertainment || 0);
  const variableExpensesTotal = groceries.plus(sport).plus(entertainment);

  const totalExpenses = livingExpensesTotal.plus(variableExpensesTotal);
  return totalExpenses;
};
const calculateScore = (
  incomes: Incomes,
  expenses: TotalExpenses
): { score: number; color: string; message: string } => {
  const monthlyIncomes = getIncomes(incomes);
  const totalExpenses = getExpenses(expenses);
  const wastePercentage = new Decimal(
    totalExpenses.div(monthlyIncomes).mul(100)
  ).toNumber();

  let color: string;
  let message: string;

  if (monthlyIncomes.greaterThan(0)) {
    if (wastePercentage > 75) {
      color = "red";
      message =
        "Alert: You are wasting more than 75% of your income. This indicates poor financial management. Consider reducing expenses significantly to improve your financial health.";
    } else if (wastePercentage > 50) {
      color = "yellow";
      message =
        "Caution: You are wasting between 50% and 75% of your income. Your financial situation could be improved by cutting unnecessary expenses.";
    } else {
      color = "green";
      message =
        "Good job: You are wasting less than 50% of your income. Your financial management is on track, but continue to monitor and optimize your spending.";
    }
  } else {
    // If income is zero or less
    color = "red";
    message =
      "Critical: Your income is not sufficient to cover your expenses. Immediate financial adjustments are needed.";
  }

  return {
    score: Math.floor(wastePercentage),
    color,
    message,
  };
};

export default calculateScore;
