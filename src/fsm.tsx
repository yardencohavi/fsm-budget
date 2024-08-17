// src/fsm/FSM.ts
type State =
  | "Incomes"
  | "livingExpenses"
  | "VariableExpenses"
  | "Summary"
  | "Finalization";

class FSM {
  private currentState: State;

  constructor() {
    this.currentState = "Incomes";
  }

  transition(state: State): void {
    if (this.canTransition(state)) {
      this.currentState = state;
    } else {
      console.warn(
        `Invalid state transition from ${this.currentState} to ${state}`
      );
    }
  }

  getState(): State {
    return this.currentState;
  }

  canTransition(state: State): boolean {
    const validTransitions: Record<State, State[]> = {
      Incomes: ["livingExpenses"],
      livingExpenses: ["VariableExpenses"],
      VariableExpenses: ["Summary"],
      Summary: ["Finalization"],
      Finalization: [],
    };
    return validTransitions[this.currentState].includes(state);
  }
}

export default FSM;
