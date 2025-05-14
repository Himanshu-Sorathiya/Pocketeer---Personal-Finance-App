import { useStore } from "@tanstack/react-store";

import { potTransactionCacheStore } from "../../../store/appCacheStore.ts";

import { useAppForm } from "../../../hooks/useAppForm.ts";
import { useUser } from "../../auth/hooks/useUser.ts";
import { useReadPots } from "../hooks/useReadPots.ts";
import { useUpdatePot } from "../hooks/useUpdatePot.ts";

import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";
import TooltipInfo from "../../../components/ui/Tooltip.tsx";

import type { Transaction } from "../../transaction/types/transaction.types.ts";
import type { Pot } from "../types/pot.types.ts";

function UpdatePotModal({ potId }: { potId: string }) {
  const { currency_symbol } = useUser();
  const { pots } = useReadPots();
  const { potStatus, updatePot } = useUpdatePot();

  const transactionsMap = useStore(potTransactionCacheStore);
  const transactions: Transaction[] =
    transactionsMap.get(potId)?.transactions ?? [];

  const transactionIds = transactions.map((t) => t.transactionId);

  const pot: Pot | undefined = pots.find((pot) => pot.potId === potId);

  const savedAmount = useStore(
    potTransactionCacheStore,
    (s) => s.get(pot!.potId)!.amount,
  );

  const defaultValues = {
    name: pot?.name ?? "",
    targetAmount: String(pot?.targetAmount ?? ""),
    theme: pot?.theme ?? "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const updates: Partial<Pot> = {};

      if (value.name !== defaultValues.name) updates.name = value.name;
      if (value.targetAmount !== defaultValues.targetAmount)
        updates.targetAmount = Number(value.targetAmount);
      if (value.theme !== defaultValues.theme) updates.theme = value.theme;

      updatePot({ potId, updates, transactionIds });
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {potStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Edit "${pot?.name}" Pot`}>
        <TooltipInfo
          id="info-circle"
          text1="Changing the name of this Pot will also update the Recipient Name for all Transactions related to this pot."
          className="text-primary size-5"
        />
      </ModalHeader>

      <ModalDescription description="Need to adjust your savings plan? Edit your pot to reflect your updated financial goals and keep moving forward with Pocketeer!" />

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

              parseFloat(value) < savedAmount &&
                errors.push("Amount must be greater than already saved amount");

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

              parseFloat(value) < savedAmount &&
                errors.push("Amount must be greater than already saved amount");

              parseFloat(value) >= 99999999.99 &&
                errors.push("Amount must be less than 99999999.99");

              parseFloat(value) < 1 &&
                errors.push("Amount must be greater than 1");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <field.AmountField
              label="Target Amount"
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
            <field.ThemeField items={pots} currentTheme={pot?.theme} />
          )}
        />

        <div className="flex gap-3">
          <form.AppForm>
            <form.ResetButton />
          </form.AppForm>

          <form.AppForm>
            <form.SubmitButton label="Update Pot" />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}

export default UpdatePotModal;
