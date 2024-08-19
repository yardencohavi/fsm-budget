import { Incomes, TotalExpenses } from "../types";
import calculateScore from "../utils/calculateScore";

describe("calculateScore", () => {
  it("calculates the score and returns the correct financial message when waste percentage is less than 50%", () => {
    const incomes: Incomes = { salary: 5000, other: 1000 };
    const expenses: TotalExpenses = {
      livingExpenses: { rent: 1000, mortgage: 500, insurance: 200 },
      variableExpenses: { groceries: 300, sport: 100, entertainment: 100 },
    };

    const result = calculateScore(incomes, expenses);

    expect(result.score).toBe(36); // Waste percentage is 2200/6000 * 100 = 36.67 ~ 36
    expect(result.color).toBe("green");
    expect(result.message).toMatch(/good job/i);
    expect(result.highlightText.withColor).toMatch(/less than half/i);
  });

  it("calculates the score and returns the correct financial message when waste percentage is between 50% and 75%", () => {
    const incomes: Incomes = { salary: 4000, other: 1000 };
    const expenses: TotalExpenses = {
      livingExpenses: { rent: 1500, mortgage: 700, insurance: 300 },
      variableExpenses: { groceries: 400, sport: 200, entertainment: 200 },
    };

    const result = calculateScore(incomes, expenses);

    expect(result.score).toBe(66); // Waste percentage is 3300/5000 * 100 = 66
    expect(result.color).toBe("#FFA500"); // Orange color
    expect(result.message).toMatch(/could be improved/i);
    expect(result.highlightText.withColor).toMatch(/a significant portion/i);
  });

  it("calculates the score and returns the correct financial message when waste percentage is more than 75%", () => {
    const incomes: Incomes = { salary: 3000, other: 500 };
    const expenses: TotalExpenses = {
      livingExpenses: { rent: 2000, mortgage: 700, insurance: 300 },
      variableExpenses: { groceries: 400, sport: 200, entertainment: 100 },
    };

    const result = calculateScore(incomes, expenses);

    expect(result.score).toBe(105); // Waste percentage is 3700/3500 * 100 = 105.7 ~ 105
    expect(result.color).toBe("red");
    expect(result.message).toMatch(/income is not sufficient/i);
    expect(result.highlightText.withColor).toMatch(/more than/i);
  });

  it("calculates the score and returns the correct financial message when expenses exceed incomes", () => {
    const incomes: Incomes = { salary: 2000, other: 500 };
    const expenses: TotalExpenses = {
      livingExpenses: { rent: 2500, mortgage: 700, insurance: 300 },
      variableExpenses: { groceries: 500, sport: 200, entertainment: 100 },
    };

    const result = calculateScore(incomes, expenses);

    expect(result.score).toBe(172); // Waste percentage is 4300/2500 * 100 = 172
    expect(result.color).toBe("red");
    expect(result.message).toMatch(/income is not sufficient/i);
    expect(result.highlightText.withColor).toMatch(/more than/i);
  });

  it("handles the case where no expenses are provided", () => {
    const incomes: Incomes = { salary: 4000, other: 1000 };
    const expenses: TotalExpenses = {
      livingExpenses: {},
      variableExpenses: {},
    };

    const result = calculateScore(incomes, expenses);

    expect(result.score).toBe(0); // Waste percentage is 0
    expect(result.color).toBe("green");
    expect(result.message).toMatch(/good job/i);
    expect(result.highlightText.withColor).toMatch(/less than half/i);
  });

  it("handles the case where no incomes are provided", () => {
    const incomes: Incomes = { salary: 0, other: 0 };
    const expenses: TotalExpenses = {
      livingExpenses: { rent: 1000, mortgage: 500, insurance: 200 },
      variableExpenses: { groceries: 300, sport: 100, entertainment: 100 },
    };

    const result = calculateScore(incomes, expenses);

    expect(result.score).toBe(Infinity); // Waste percentage is infinite
    expect(result.color).toBe("red");
    expect(result.message).toMatch(/income is not sufficient/i);
    expect(result.highlightText.withColor).toMatch(/more than/i);
  });
});
