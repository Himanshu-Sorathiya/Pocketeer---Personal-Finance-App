import { useStore } from "@tanstack/react-store";

import { budgetTransactionCacheStore } from "../../../store/appCacheStore.ts";

import { useAppForm } from "../../../hooks/useAppForm.ts";
import { useUser } from "../../auth/hooks/useUser.ts";
import { useReadBudgets } from "../hooks/useReadBudgets.ts";
import { useUpdateBudget } from "../hooks/useUpdateBudget.ts";

import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import type { Budget } from "../types/budget.types.ts";

function UpdateBudgetModal({ budgetId }: any) {
  const { currency_symbol } = useUser();
  const { budgets } = useReadBudgets();
  const { budgetStatus, updateBudget } = useUpdateBudget();

  const budget: Budget | undefined = budgets.find(
    (budget) => budget.budgetId === budgetId,
  );

  const spentAmount = useStore(
    budgetTransactionCacheStore,
    (s) => s.get(budget!.budgetId)!.amount,
  );

  const defaultValues = {
    category: budget?.category ?? "",
    targetAmount: String(budget?.targetAmount ?? ""),
    theme: budget?.theme ?? "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const updates: Partial<Budget> = {};

      if (value.category !== defaultValues.category)
        updates.category = value.category;
      if (value.targetAmount !== defaultValues.targetAmount)
        updates.targetAmount = Number(value.targetAmount);
      if (value.theme !== defaultValues.theme) updates.theme = value.theme;

      updateBudget({ budgetId, updates });
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {budgetStatus === "pending" && <FormSpinner />}

      <ModalHeader
        title={`Edit "${budget?.category
          .split("_")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" & ")}" Budget?`}
      />

      <ModalDescription description="Fine-tune your budgeting strategy by updating your limits. Keep your finances aligned with your evolving goals." />

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

              parseFloat(value).toFixed(2) < spentAmount.toFixed(2) &&
                errors.push("Amount must be greater than already spent amount");

              parseFloat(value) >= 99999999.99 &&
                errors.push("Amount must be less than 99999999.99");

              parseFloat(value) < 1 &&
                errors.push("Amount must be greater than 1");

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

              parseFloat(value).toFixed(2) < spentAmount.toFixed(2) &&
                errors.push("Amount must be greater than already spent amount");

              parseFloat(value) >= 99999999.99 &&
                errors.push("Amount must be less than 99999999.99");

              parseFloat(value) < 1 &&
                errors.push("Amount must be greater than 1");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <field.AmountField
              label="Maximum to Spend"
              currency={currency_symbol}
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

        <div className="flex gap-3">
          <form.AppForm>
            <form.ResetButton />
          </form.AppForm>

          <form.AppForm>
            <form.SubmitButton label="Update Budget" />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}

export default UpdateBudgetModal;
