# Budget Management Calculator

## Overview

The **Budget Management Calculator** is a React-based application that helps users manage their finances by calculating and visualizing income vs. expenses. The application features a dynamic form process, where users input their income and various expenses, leading to a summary that highlights their spending efficiency.

**Demo Link:** [Budget Management Calculator](https://yardencohavi.github.io/fsm-budget/)

**Mock Data:** The application interacts with a mock server for data, hosted at [my-json-server](https://my-json-server.typicode.com/yardencohavi/backend-db).

## Features

- **Step-by-Step Form**: Guides users through inputs for income and expenses.
- **State Management**: Uses Finite State Machine (FSM) for smooth transitions between form steps.
- **Real-Time Validation**: Inputs are validated in real-time using Formik and Yup.
- **Summary Calculation**: The summary step shows the percentage of money spent.

## Technologies Used

- **React & TypeScript**: Building a type-safe, scalable frontend.
- **Styled Components**: For writing CSS-in-JS, allowing dynamic styling.
- **Redux**: For state management.
- **Formik & Yup**: Handling form logic and validation.
- **JSON Server**: Mocking data for development and testing.
- **Decimal.js**: Ensuring precise financial calculations.
- **Jest & React Testing Library**: Implementing unit tests to ensure code reliability.

## How It Works

1. **Incomes Step**: Enter your salary and any other sources of income.
2. **Living Expenses**: Input essential living costs like rent, mortgage, and insurance.
3. **Variable Expenses**: Provide details on variable costs, such as groceries, sports, and entertainment.
4. **Summary**: Review the results, including the percentage of income spent based on the data provided.

## Installation

1. Clone the repository
2. Run npm install
3. Run npm start
4. Open your browser and navigate to http://localhost:3000 to view the application.
