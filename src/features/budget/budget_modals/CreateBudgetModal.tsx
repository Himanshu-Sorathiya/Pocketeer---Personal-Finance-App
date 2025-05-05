import { useAppForm } from "../../../hooks/useAppForm.ts";
import { useCreateBudget } from "../hooks/useCreateBudget.ts";
import { useReadBudgets } from "../hooks/useReadBudgets.ts";

import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";
import RestrictionAlert from "../../../components/ui/RestrictionAlert.tsx";

import { themeColors } from "../../../constants/appOptions.ts";
import { transactionCategories } from "../../../constants/transactionConfig.ts";

function CreateBudgetModal() {
  const { budgets } = useReadBudgets();
  const { budgetStatus, createBudget } = useCreateBudget();

  const availableCategories = transactionCategories
    .filter((c) => c !== "savings")
    .map((c) => {
      const used = budgets?.some((b: any) => b.category === c);

      return used ? null : { category: c, used };
    })
    .filter(Boolean);

  const availableThemeColors = themeColors
    .filter((c) => c.name !== "platinum_ash")
    .map((c) => {
      const used = budgets!.some((i: any) => i.theme === c.name);

      return used ? null : { name: c.name, value: c.hex };
    })
    .filter(Boolean);

  const form = useAppForm({
    defaultValues: {
      category: availableCategories?.[0]?.category ?? "",
      targetAmount: "",
      theme: availableThemeColors?.[0]?.name ?? "",
    },
    onSubmit: async ({ value }) => {
      createBudget({
        category: value.category,
        targetAmount: +value.targetAmount,
        theme: value.theme,
      });
    },
  });

  const currency = budgets[0].currency;

  const canCreateBudget =
    availableCategories.length > 0 && availableThemeColors.length > 0;

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {budgetStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Create New Budget`} />

      <ModalDescription description="Set limits for smarter spending. Create a budget to manage your expenses and stay financially on track with Pocketeer!" />

      {!canCreateBudget && (
        <RestrictionAlert
          msg1="Uh-oh! You've reached your budget creation limit."
          msg2="But don't worry—manage your existing budgets to make room for more!"
        />
      )}

      {canCreateBudget && (
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

                parseFloat(value) >= 99999999.99 &&
                  errors.push("Amount must be less than 99999999.99");

                parseFloat(value) < 1 &&
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
      )}
    </div>
  );
}

export default CreateBudgetModal;
