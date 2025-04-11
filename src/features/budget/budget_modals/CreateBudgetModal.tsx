import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";

import { budgetStore } from "../store/budgetStore.ts";

import AmountField from "../../../components/modals/AmountField.tsx";
import CategoryField from "../../../components/modals/CategoryField.tsx";
import SubmitButton from "../../../components/modals/SubmitButton.tsx";
import ThemeField from "../../../components/modals/ThemeField.tsx";
import ErrorTooltip from "../../../components/ui/ErrorTooltip.tsx";

import type { Budget } from "../types/budget.types.ts";

function CreateBudgetModal() {
  const budgets: Budget[] = [...useStore(budgetStore, (s) => s.budgets)];

  const currency = budgets[0]?.currency;

  const form = useForm({
    defaultValues: {
      category: "",
      targetAmount: "",
      theme: "",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">Create new Budget</h1>

      <p className="text-text text-sm">
        Set limits for smarter spending. Create a budget to manage your expenses
        and stay financially on track with Pocketeer!
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <form.Field
          name="category"
          validators={{
            onSubmit: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Category is required");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <div className="relative">
              <CategoryField field={field} items={budgets} />

              <ErrorTooltip errorMap={field.state.meta.errorMap} />
            </div>
          )}
        />

        <form.Field
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

              parseFloat(value) <= 0 &&
                errors.push("Amount must be greater than 0");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <div className="relative">
              <AmountField
                field={field}
                label="Maximum to Spend"
                currency={currency}
              />

              <ErrorTooltip errorMap={field.state.meta.errorMap} />
            </div>
          )}
        />

        <form.Field
          name="theme"
          validators={{
            onSubmit: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Theme is required");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <div className="relative">
              <ThemeField field={field} items={budgets} />

              <ErrorTooltip errorMap={field.state.meta.errorMap} />
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              label="Create Budget"
            />
          )}
        />
      </form>
    </div>
  );
}

export default CreateBudgetModal;
