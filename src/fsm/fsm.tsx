import { States } from "../types";

class FSM {
  private currentState: States;

  constructor(state: States) {
    this.currentState = state;
  }

  transitionTo(newState: States): void {
    if (this.canTransition(newState)) {
      this.currentState = newState;
    } else {
      console.warn(
        `Invalid state transition from ${this.currentState} to ${newState}`
      );
    }
  }

  getState(): States {
    return this.currentState;
  }

  canTransition(state: States): boolean {
    const validTransitions: Record<States, States[]> = {
      incomes: ["livingExpenses"],
      livingExpenses: ["variableExpenses"],
      variableExpenses: ["summary"],
      summary: [],
    };
    return validTransitions[this.currentState].includes(state);
  }
}

export default FSM;
