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
): { score: number; surplus: number } => {
  const monthlyIncomes = getIncomes(incomes);
  const totalExpenses = getExpenses(expenses);
  // Calculate the percentage of expenses relative to income
  const percentageOfIncome = totalExpenses.div(monthlyIncomes).mul(100);
  const surplus = monthlyIncomes.minus(totalExpenses).toNumber();
  return {
    score: percentageOfIncome.floor().toNumber(),
    surplus,
  };
};

export default calculateScore;
