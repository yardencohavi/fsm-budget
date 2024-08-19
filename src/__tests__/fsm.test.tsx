import FSM from "../fsm/fsm";

describe("FSM", () => {
  let fsm: FSM;

  beforeEach(() => {
    fsm = new FSM("incomes");
  });

  test("initial state is set via constructor", () => {
    const fsmInitial = new FSM("livingExpenses");
    expect(fsmInitial.getState()).toBe("livingExpenses");
  });

  test("can transition from 'incomes' to 'livingExpenses'", () => {
    fsm.transitionTo("livingExpenses");
    expect(fsm.getState()).toBe("livingExpenses");
  });

  test("can transition from 'livingExpenses' to 'variableExpenses'", () => {
    fsm.transitionTo("livingExpenses");
    fsm.transitionTo("variableExpenses");
    expect(fsm.getState()).toBe("variableExpenses");
  });

  test("can transition from 'variableExpenses' to 'summary'", () => {
    fsm.transitionTo("livingExpenses");
    fsm.transitionTo("variableExpenses");
    fsm.transitionTo("summary");
    expect(fsm.getState()).toBe("summary");
  });

  test("cannot transition from 'incomes' to 'variableExpenses'", () => {
    fsm.transitionTo("variableExpenses");
    expect(fsm.getState()).toBe("incomes");
  });

  test("cannot transition from 'summary' to any other state", () => {
    fsm.transitionTo("livingExpenses");
    fsm.transitionTo("variableExpenses");
    fsm.transitionTo("summary");
    fsm.transitionTo("incomes"); // Invalid transition
    expect(fsm.getState()).toBe("summary");
  });

  test("warns on invalid state transition", () => {
    console.warn = jest.fn(); // Mock console.warn to capture warnings
    fsm.transitionTo("variableExpenses"); // Invalid transition from 'incomes'
    expect(console.warn).toHaveBeenCalledWith(
      `Invalid state transition from incomes to variableExpenses`
    );
  });
});
