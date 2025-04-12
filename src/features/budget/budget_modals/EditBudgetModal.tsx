import { useStore } from "@tanstack/react-store";

import { budgetStore } from "../store/budgetStore.ts";

import { useAppForm } from "../../../hooks/useAppForm.ts";

import type { Budget } from "../types/budget.types.ts";

function EditBudgetModal({ budgetId }: any) {
  const budgets: Budget[] = [...useStore(budgetStore, (s) => s.budgets)];

  const budget: Budget | undefined = budgets.find(
    (budget) => budget.id === budgetId,
  );

  const form = useAppForm({
    defaultValues: {
      category: budget?.category ?? "",
      targetAmount: String(budget?.targetAmount ?? ""),
      theme: budget?.theme ?? "",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Edit "
        {budget?.category
          .split("_")
          .map(
            (part) =>
              part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
          )
          .join(" & ")}
        " Budget
      </h1>

      <p className="text-text text-sm">
        Fine-tune your budgeting strategy by updating your limits. Keep your
        finances aligned with your evolving goals.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <form.AppField
          name="category"
          validators={{
            onChange: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Category is required");

              return errors.length === 0 ? undefined : errors;
            },
            onSubmit: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Category is required");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <field.CategoryField
              items={budgets}
              currentCategory={budget?.category}
            />
          )}
        />

        <form.AppField
          name="targetAmount"
          validators={{
            onChange: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              value === "" && errors.push("Amount is required");

              !/^\d+(\.\d{1,2})?$/.test(value) &&
                errors.push(
                  "Invalid amount format. Please use numbers and at most 2 decimal places.",
                );

              return errors.length === 0 ? undefined : errors;
            },
            onSubmit: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              value === "" && errors.push("Amount is required");

              !/^\d+(\.\d{1,2})?$/.test(value) &&
                errors.push(
                  "Invalid amount format. Please use numbers and at most 2 decimal places.",
                );

              parseFloat(value) <= 1 &&
                errors.push("Amount must be greater than 1");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <field.AmountField
              label="Maximum to Spend"
              currency={budget!.currency}
            />
          )}
        />

        <form.AppField
          name="theme"
          validators={{
            onChange: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Category is required");

              return errors.length === 0 ? undefined : errors;
            },
            onSubmit: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Category is required");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <field.ThemeField items={budgets} currentTheme={budget?.theme} />
          )}
        />

        <form.AppForm>
          <form.SubmitButton label="Update Budget" />
        </form.AppForm>
      </form>
    </div>
  );
}

export default EditBudgetModal;
