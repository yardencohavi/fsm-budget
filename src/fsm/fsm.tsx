import { Steps } from "../types";

class FSM {
  private currentState: Steps;

  constructor(state: Steps) {
    this.currentState = state;
  }

  transitionTo(newState: Steps): void {
    if (this.canTransition(newState)) {
      this.currentState = newState;
    } else {
      console.warn(
        `Invalid state transition from ${this.currentState} to ${newState}`
      );
    }
  }

  getState(): Steps {
    return this.currentState;
  }

  canTransition(state: Steps): boolean {
    const validTransitions: Record<Steps, Steps[]> = {
      incomes: ["livingExpenses"],
      livingExpenses: ["variableExpenses"],
      variableExpenses: ["summary"],
      summary: [],
    };
    return validTransitions[this.currentState].includes(state);
  }
}

export default FSM;
