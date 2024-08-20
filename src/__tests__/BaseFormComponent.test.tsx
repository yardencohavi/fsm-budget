import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { InputField } from "../types";
import { createValidationSchema } from "../utils/validationSchema";
import BaseFormComponent from "../components/BaseFormComponent/BaseFormComponent";

describe("BaseForm Component", () => {
  const onSubmit = jest.fn();

  const inputs: InputField[] = [
    { name: "groceries", isRequired: true },
    { name: "sport", isRequired: false },
    { name: "entertainment", isRequired: true },
  ];
  const validationSchema = createValidationSchema(inputs || []);

  const initialValues =
    inputs.reduce(
      (acc, input) => ({ ...acc, [input.name]: "" }),
      {} as Record<string, string>
    ) || {};

  const title = "Test Form";
  const renderComponent = () =>
    render(
      <BaseFormComponent
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        inputs={inputs}
        title={title}
      />
    );
  it("renders form title", () => {
    renderComponent();
    expect(screen.getByText("Test Form")).toBeInTheDocument();
  });

  it("renders all inputs", () => {
    renderComponent();
    inputs.forEach((input) => {
      expect(screen.getByText(`${input.name}:`)).toBeInTheDocument();
    });
  });

  it("submits form when valid", async () => {
    renderComponent();
    inputs.forEach((input) => {
      fireEvent.change(screen.getByTestId(`input-${input.name}`), {
        target: { value: 4343 },
      });
    });

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        inputs.reduce((acc, input) => {
          acc[input.name] = "4343";
          return acc;
        }, {} as Record<string, string>),
        expect.anything()
      );
    });
  });

  it("disables the submit button while submitting", async () => {
    renderComponent();
    inputs.forEach((input) => {
      fireEvent.change(screen.getByTestId(`input-${input.name}`), {
        target: { value: `Test value for ${input.name}` },
      });
    });

    fireEvent.click(screen.getByText("Next"));

    expect(screen.getByText("Next")).toBeDisabled();
  });
});
