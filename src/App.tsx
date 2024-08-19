import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import GlobalStyle from "./styles/globalStyles";

import BudgetForm from "./components/BudgetForm/BudgetForm";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <BudgetForm />
    </Provider>
  );
};

export default App;
