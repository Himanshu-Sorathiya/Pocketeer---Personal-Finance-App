import { useStore } from "@tanstack/react-store";

import { potTransactionCacheStore } from "../../../store/appCacheStore.ts";
import { potStore } from "../store/potStore.ts";

import { useAppForm } from "../../../hooks/useAppForm.ts";
import { useUpdatePot } from "../hooks/useUpdatePot.ts";

import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import type { Pot } from "../types/pot.types.ts";

function EditPotModal({ potId }: { potId: string }) {
  const pots: Pot[] = useStore(potStore, (s) => s.pots);

  const { potStatus, updatePot } = useUpdatePot();

  const pot: Pot | undefined = pots.find((pot) => pot.potId === potId);

  const savedAmount = useStore(
    potTransactionCacheStore,
    (s) => s.get(pot!.potId)!.amount,
  );

  const form = useAppForm({
    defaultValues: {
      name: pot?.name ?? "New Pot Name",
      targetAmount: String(pot?.targetAmount ?? ""),
      theme: pot?.theme ?? "",
    },
    onSubmit: async ({ value }) => {
      updatePot({
        potId,
        updates: {
          name: value.name,
          targetAmount: Number(value.targetAmount),
          theme: value.theme,
        },
      });
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {potStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Edit "${pot?.name}" Pot`} />

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

              parseFloat(value) <= savedAmount &&
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

              parseFloat(value) <= savedAmount &&
                errors.push("Amount must be greater than already saved amount");

              parseFloat(value) >= 99999999.99 &&
                errors.push("Amount must be less than 99999999.99");

              parseFloat(value) < 1 &&
                errors.push("Amount must be greater than 1");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <field.AmountField label="Target Amount" currency={pot!.currency} />
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

export default EditPotModal;
