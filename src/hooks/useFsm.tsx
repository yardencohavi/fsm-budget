import { useCallback, useState } from "react";
import FSM from "../fsm/fsm";
import { Steps } from "../types";

const useFSM = () => {
  const [fsm] = useState(new FSM("incomes"));
  const [currentState, setCurrentState] = useState<Steps>(fsm.getState());

  const transition = useCallback(
    (state: Steps) => {
      fsm.transitionTo(state);
      setCurrentState(fsm.getState());
    },
    [fsm]
  );

  return {
    currentState,
    transition,
  };
};

export default useFSM;
