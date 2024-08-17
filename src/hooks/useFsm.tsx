import { useState } from "react";
import FSM from "../fsm";

const useFSM = () => {
  const [fsm] = useState(new FSM());
  const [formData, setFormData] = useState({
    livingExpenses: {},
    variableExpenses: {},
  });

  const transition = (state: string, data: any = null) => {
    if (data) {
      setFormData((prevData) => ({
        ...prevData,
        ...data,
      }));
    }
    fsm.transition(state as any);
  };

  return {
    currentState: fsm.getState(),
    transition,
    formData,
  };
};

export default useFSM;
