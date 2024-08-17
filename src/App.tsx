import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import theme from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyle from "./styles/globalStyles";

import BudgetForm from "./components/BudgetForm/BudgetForm";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BudgetForm />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
