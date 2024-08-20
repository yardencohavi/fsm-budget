import { useCallback, useRef, useState } from "react";
import FSM from "../fsm/fsm";
import { States } from "../types";

const useFSM = () => {
  const fsm = useRef(new FSM("incomes")).current;
  const [currentState, setCurrentState] = useState<States>(fsm.getState());

  const transition = useCallback((state: States) => {
    fsm.transitionTo(state);
    setCurrentState(fsm.getState());
  }, []);

  return {
    currentState,
    transition,
  };
};

export default useFSM;
