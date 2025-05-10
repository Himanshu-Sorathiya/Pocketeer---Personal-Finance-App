import { useStore } from "@tanstack/react-store";

import { potTransactionCacheStore } from "../../../store/appCacheStore.ts";

import { useAppForm } from "../../../hooks/useAppForm.ts";
import { useUser } from "../../auth/hooks/useUser.ts";
import { useCreatePot } from "../../pot/hooks/useCreatePot.ts";
import { useReadPots } from "../hooks/useReadPots.ts";

import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";
import RestrictionAlert from "../../../components/ui/RestrictionAlert.tsx";

import type { Pot } from "../types/pot.types.ts";

import { themeColors } from "../../../constants/appOptions.ts";

function CreatePotModal() {
  const { user_id } = useUser();
  const { pots } = useReadPots();
  const { potStatus, createPot } = useCreatePot();

  const potTransactionCache = useStore(potTransactionCacheStore);

  const runningPots: Pot[] = pots.filter(
    (pot) =>
      (potTransactionCache.get(pot.potId)?.amount ?? 0) < pot.targetAmount,
  );

  const availableThemeColors = themeColors
    .filter((c) => c.name !== "platinum_ash")
    .map((c) => {
      const used = runningPots!.some((i: any) => i.theme === c.name);

      return used ? null : { name: c.name, value: c.hex };
    })
    .filter(Boolean);

  const defaultValues = {
    name: "",
    targetAmount: "",
    theme: availableThemeColors?.[0]?.name ?? "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      createPot({
        user_id: user_id ?? "",
        name: value.name,
        targetAmount: +value.targetAmount,
        theme: value.theme,
      });
    },
  });

  const currency = pots[0]?.currency;

  const canCreatePot =
    runningPots.length < 7 && availableThemeColors.length > 0;

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {potStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Create New Pot`} />

      <ModalDescription description="Ready to give your savings a purpose? Create a pot and start setting targets for your financial goals with Pocketeer!" />

      {!canCreatePot && (
        <RestrictionAlert
          msg1="Uh-oh! You've reached your pot creation limit."
          msg2="But don't worry—manage your existing pots to make room for more!"
        />
      )}

      {canCreatePot && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <form.AppField
            name="name"
            validators={{
              onChange: ({ value }) => {
                const errors: string[] = [];
                value = value.trim();

                value === "" && errors.push("Recipient name is required");

                value.length > 30 && errors.push("Recipient name is too long");

                !/^[a-zA-Z\s]+$/.test(value) &&
                  errors.push(
                    "Recipient name should only contain letters and spaces",
                  );

                /\s{2,}/.test(value) &&
                  errors.push(
                    "Recipient name should not have multiple consecutive spaces",
                  );

                return errors.length === 0 ? undefined : errors;
              },
              onSubmit: ({ value }) => {
                const errors: string[] = [];
                value = value.trim();

                value === "" && errors.push("Recipient name is required");

                value.length < 3 &&
                  errors.push(
                    "Recipient name should be at least 3 characters long",
                  );

                value.length > 30 && errors.push("Recipient name is too long");

                !/^[a-zA-Z\s]+$/.test(value) &&
                  errors.push(
                    "Recipient name should only contain letters and spaces",
                  );

                /\s{2,}/.test(value) &&
                  errors.push(
                    "Recipient name should not have multiple consecutive spaces",
                  );

                return errors.length === 0 ? undefined : errors;
              },
            }}
            children={(field) => <field.NameField label="Pot Name" />}
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
              <field.AmountField label="Target Amount" currency={currency} />
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
            children={(field) => <field.ThemeField items={runningPots} />}
          />

          <div className="flex gap-3">
            <form.AppForm>
              <form.ResetButton />
            </form.AppForm>

            <form.AppForm>
              <form.SubmitButton label="Create Pot" />
            </form.AppForm>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreatePotModal;
