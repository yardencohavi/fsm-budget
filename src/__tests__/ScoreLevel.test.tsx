import { render, screen, waitFor } from "@testing-library/react";
import ScoreLevel from "../components/ScoreLevel/ScoreLevel";

describe("ScoreLevel Component", () => {
  it("initially displays score as 0% and updates to limit value over time", async () => {
    const message = "You are doing great!";
    render(
      <ScoreLevel
        limit={30}
        color="green"
        message={message}
        highlightText={{
          withColor: "a significant portion",
          title: " of your salary.",
        }}
      />
    );

    // Initial score should be 0%
    expect(screen.getByText("0%")).toBeInTheDocument();

    // Score should gradually increase to 30%
    await waitFor(() => {
      expect(screen.getByText("30%")).toBeInTheDocument();
    });

    expect(screen.getByText("You are wasting")).toBeInTheDocument();

    // Verify the highlight text and message
    expect(screen.getByText(/a significant portion/i)).toBeInTheDocument();
    expect(screen.getByText(/of your salary\./i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(message, "i"))).toBeInTheDocument();
  });

  it("handles case where score exceeds 100% and correctly updates styles", async () => {
    const message = "You are in debt!";
    render(
      <ScoreLevel
        limit={120}
        color="red"
        message={message}
        highlightText={{
          withColor: "a significant portion",
          title: " more than your entire salary.",
        }}
      />
    );

    // Score should gradually increase to 100%
    await waitFor(
      () => {
        expect(screen.getByText("120%")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify the dash offset is set to 0 (full fill) when score exceeds 100%
    const pathScore = screen.getByTestId("path-score"); // Assuming the PathScore element has a role of "img"
    expect(pathScore).toHaveStyle("stroke-dashoffset: 0");
  });

  it("stops incrementing when the score reaches the specified limit", async () => {
    const message = "Be cautious!";
    render(
      <ScoreLevel
        limit={50}
        color="yellow"
        message={message}
        highlightText={{
          withColor: "a significant portion",
          title: " half of your salary.",
        }}
      />
    );

    // Score should gradually increase to 50%
    await waitFor(
      () => {
        expect(screen.getByText("50%")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Score should not exceed the limit
    expect(screen.queryByText("51%")).not.toBeInTheDocument();
  });

  it("correctly calculates stroke-dashoffset for scores below 100%", async () => {
    const message = "Approaching your budget!";
    render(
      <ScoreLevel
        limit={75}
        color="blue"
        message={message}
        highlightText={{
          withColor: "a moderate portion",
          title: " of your budget.",
        }}
      />
    );

    // Score should gradually increase to 75%
    await waitFor(
      () => {
        expect(screen.getByText("75%")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify the dash offset is calculated correctly
    const pathScore = screen.getByTestId("path-score"); // Assuming the PathScore element has a role of "img"
    const dasharray = 293;
    const expectedDashoffset = dasharray * ((100 - 75) / 100);
    expect(pathScore).toHaveStyle(`stroke-dashoffset: ${expectedDashoffset}`);
  });
});
