import { useStore } from "@tanstack/react-store";

import { budgetStore } from "../store/budgetStore.ts";

import { useAppForm } from "../../../hooks/useAppForm.ts";

import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import type { Budget } from "../types/budget.types.ts";

import { themeColors } from "../../../constants/appOptions.ts";
import { transactionCategories } from "../../../constants/transactionConfig.ts";

function CreateBudgetModal() {
  const budgets: Budget[] = [...useStore(budgetStore, (s) => s.budgets)];

  const currency = budgets[0]?.currency;

  const availableCategories = transactionCategories
    .map((c) => {
      const used = budgets?.some((b: any) => b.category === c);

      return { category: c, used };
    })
    .sort((a, b) => {
      return Number(a.used) - Number(b.used);
    });

  const availableThemeColors = themeColors
    .filter((c) => c.name !== "platinum_ash")
    .map((c) => {
      const used = budgets.some((i: any) => i.theme === c.name);
      return {
        name: c.name,
        value: c.hex,
        used,
      };
    })
    .sort((a, b) => {
      return Number(a.used) - Number(b.used);
    });

  const form = useAppForm({
    defaultValues: {
      category: availableCategories[0].category || "",
      targetAmount: "",
      theme: availableThemeColors[0].name || "",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <ModalHeader title={`Create New Budget`} />

      <ModalDescription description="Set limits for smarter spending. Create a budget to manage your expenses and stay financially on track with Pocketeer!" />

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
          children={(field) => <field.CategoryField items={budgets} />}
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
            <field.AmountField label="Maximum to Spend" currency={currency} />
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
          children={(field) => <field.ThemeField items={budgets} />}
        />

        <div className="flex gap-3">
          <form.AppForm>
            <form.ResetButton />
          </form.AppForm>

          <form.AppForm>
            <form.SubmitButton label="Create Budget" />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}

export default CreateBudgetModal;
