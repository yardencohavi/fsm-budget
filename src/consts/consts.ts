import { FinancialMessage } from "../types";

export const financialMessageMap: Record<number, FinancialMessage> = {
  0: {
    color: "green",
    highlightText: {
      withColor: " less than half",
      title: " of your salary.",
    },
    message:
      "Good job! You are wasting less than 50% of your income. Your financial management is on track, but continue to monitor and optimize your spending.",
  },
  1: {
    color: "#FFA500", // Orange color
    highlightText: {
      withColor: " a significant portion",
      title: " of your salary.",
    },
    message:
      "You are wasting between 50% and 75% of your income. Your financial situation could be improved by cutting unnecessary expenses.",
  },
  2: {
    color: "red",
    highlightText: {
      withColor: " a large",
      title: " majority of your salary.",
    },
    message:
      "You are wasting more than 75% of your income. This indicates poor financial management. Consider reducing expenses significantly to improve your financial health.",
  },
  3: {
    color: "red",
    highlightText: { withColor: " more than ", title: " your entire salary" },
    message:
      "Your income is not sufficient to cover your expenses. Immediate financial adjustments are needed.",
  },
  4: {
    color: "green",
    highlightText: { withColor: "Good job!", title: "" },
    message: "You have no recorded expenses.",
  },
};
