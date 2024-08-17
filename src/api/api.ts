import axios, { AxiosResponse } from "axios";
import { BudgetForm } from "../types";

const API_URL = "http://localhost:3001";
const DB_URL = "https://my-json-server.typicode.com/yardencohavi/backend-db";
export interface QuestionDTO {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const getBudgetFormData = async (): Promise<BudgetForm> => {
  try {
    const response: AxiosResponse<BudgetForm> = await axios.get(
      `${DB_URL}/budget`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
