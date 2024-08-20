import { InputField } from "../types";
import { createValidationSchema } from "../utils/validationSchema";

describe("createValidationSchema", () => {
  it("creates a schema with required fields", async () => {
    const inputFields: InputField[] = [
      { name: "salary", isRequired: true },
      { name: "bonus", isRequired: false },
    ];

    const validationSchema = createValidationSchema(inputFields);

    await expect(validationSchema.isValid({ salary: 1000 })).resolves.toBe(
      true
    );
    await expect(
      validationSchema.isValid({ salary: 1000, bonus: 200 })
    ).resolves.toBe(true);
    await expect(
      validationSchema.isValid({ salary: 1000, bonus: -1 })
    ).resolves.toBe(false);
    await expect(validationSchema.isValid({ bonus: 200 })).resolves.toBe(false);
  });

  it("validates a schema with non-required fields", async () => {
    const inputFields: InputField[] = [
      { name: "salary", isRequired: false },
      { name: "bonus", isRequired: false },
    ];

    const validationSchema = createValidationSchema(inputFields);

    await expect(validationSchema.isValid({ salary: 1000 })).resolves.toBe(
      true
    );
    await expect(
      validationSchema.isValid({ salary: 1000, bonus: 200 })
    ).resolves.toBe(true);
    await expect(validationSchema.isValid({ bonus: -1 })).resolves.toBe(false);
    await expect(
      validationSchema.isValid({ salary: "not a number" })
    ).resolves.toBe(false);
  });

  it("creates a schema that handles non-number values correctly", async () => {
    const inputFields: InputField[] = [
      { name: "income", isRequired: true },
      { name: "expenses", isRequired: false },
    ];

    const validationSchema = createValidationSchema(inputFields);

    await expect(validationSchema.isValid({ income: 2000 })).resolves.toBe(
      true
    );
    await expect(
      validationSchema.isValid({ income: "not a number" })
    ).resolves.toBe(false);
    await expect(
      validationSchema.isValid({ income: 2000, expenses: "not a number" })
    ).resolves.toBe(false);
  });

  it("returns a schema that enforces minimum values", async () => {
    const inputFields: InputField[] = [
      { name: "salary", isRequired: true },
      { name: "bonus", isRequired: false },
    ];

    const validationSchema = createValidationSchema(inputFields);

    await expect(validationSchema.isValid({ salary: -100 })).resolves.toBe(
      false
    );
    await expect(
      validationSchema.isValid({ salary: 100, bonus: -200 })
    ).resolves.toBe(false);
  });
});
