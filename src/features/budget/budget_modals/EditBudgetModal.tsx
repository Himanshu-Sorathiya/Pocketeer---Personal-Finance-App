import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";

import { budgetStore } from "../store/budgetStore.ts";

import AmountField from "../../../components/modals/AmountField.tsx";
import CategoryField from "../../../components/modals/CategoryField.tsx";
import SubmitButton from "../../../components/modals/SubmitButton.tsx";
import ThemeField from "../../../components/modals/ThemeField.tsx";

import type { Budget } from "../types/budget.types.ts";

function EditBudgetModal({ budgetId }: any) {
  const budgets: Budget[] = [...useStore(budgetStore, (s) => s.budgets)];

  const budget: Budget | undefined = budgets.find(
    (budget) => budget.id === budgetId,
  );

  const form = useForm({
    defaultValues: {
      category: budget?.category ?? "",
      targetAmount: budget?.targetAmount ?? 0,
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
        <form.Field
          name="category"
          children={(field) => (
            <CategoryField
              field={field}
              items={budgets}
              currentCategory={budget?.category}
            />
          )}
        />

        <form.Field
          name="targetAmount"
          children={(field) => (
            <AmountField
              field={field}
              label="Maximum to Spend"
              currency={budget!.currency}
            />
          )}
        />

        <form.Field
          name="theme"
          children={(field) => (
            <ThemeField
              field={field}
              items={budgets}
              currentTheme={budget?.theme}
            />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              label="Update Budget"
            />
          )}
        />
      </form>
    </div>
  );
}

export default EditBudgetModal;
