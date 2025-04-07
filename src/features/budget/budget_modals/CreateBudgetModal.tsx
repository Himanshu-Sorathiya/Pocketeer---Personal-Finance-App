import { useForm, useStore } from "@tanstack/react-form";

import { budgetStore } from "../store/budgetStore.ts";

import AmountField from "../../../components/modals/AmountField.tsx";
import CategoryField from "../../../components/modals/CategoryField.tsx";
import SubmitButton from "../../../components/modals/SubmitButton.tsx";
import ThemeField from "../../../components/modals/ThemeField.tsx";

import type { Budget } from "../types/budget.types.ts";

import themeColors from "../../../constants/themeColors.ts";
import transactionCategories from "../../../constants/transactionCategory.ts";

function CreateBudgetModal() {
  const budgets: Budget[] = [...useStore(budgetStore, (s) => s.budgets)];

  const availableCategories = transactionCategories
    .map((c) => ({
      category: c,
      used: budgets.some((b) => b.category === c),
    }))
    .sort((a, b) => Number(a.used) - Number(b.used));

  const availableThemeColors = themeColors
    .filter((c) => c.name !== "platinum_ash")
    .map((c) => ({
      name: c.name,
      value: c.hex,
      used: budgets.some((p) => p.theme === c.name),
    }))
    .sort((a, b) => Number(a.used) - Number(b.used));
  const currency = budgets[0]?.currency;

  const form = useForm({
    defaultValues: {
      category: availableCategories.find((c) => !c.used)?.category || "",
      targetAmount: 0,
      theme: availableThemeColors.find((c) => !c.used)?.name || "",
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
          children={(field) => <CategoryField field={field} items={budgets} />}
        />

        <form.Field
          name="targetAmount"
          children={(field) => (
            <AmountField
              field={field}
              label="Maximum to Spend"
              currency={currency}
            />
          )}
        />

        <form.Field
          name="theme"
          children={(field) => <ThemeField field={field} items={budgets} />}
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
