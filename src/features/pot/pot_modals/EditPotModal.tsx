import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";

import { potStore } from "../store/potStore.ts";

import AmountField from "../../../components/modals/AmountField.tsx";
import NameField from "../../../components/modals/NameField.tsx";
import SubmitButton from "../../../components/modals/SubmitButton.tsx";
import ThemeField from "../../../components/modals/ThemeField.tsx";
import ErrorTooltip from "../../../components/ui/ErrorTooltip.tsx";

import type { Pot } from "../types/pot.types.ts";

function EditPotModal({ potId }: { potId: string }) {
  const pots: Pot[] = [...useStore(potStore, (s) => s.pots)];

  const pot: Pot | undefined = pots.find((pot) => pot.id === potId);

  const form = useForm({
    defaultValues: {
      name: pot?.name ?? "New Pot Name",
      targetAmount: String(pot?.targetAmount ?? ""),
      theme: pot?.theme ?? "",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Edit "{pot?.name}" Pot
      </h1>

      <p className="text-text text-sm">
        Need to adjust your savings plan? Edit your pot to reflect your updated
        financial goals and keep moving forward with Pocketeer!
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              value.length > 3 &&
                !/^[a-zA-Z\s]+$/.test(value) &&
                errors.push("Pot name should only contain letters and spaces");

              value.length > 3 &&
                /\s{2,}/.test(value) &&
                errors.push(
                  "Pot name should not have multiple consecutive spaces",
                );

              return errors.length === 0 ? undefined : errors;
            },
            onSubmit: ({ value }) => {
              const errors = [];
              value = value.trim();

              value === "" && errors.push("Pot name is required");

              value.length < 3 &&
                errors.push("Pot name should be at least 3 characters long");

              value.length > 30 && errors.push("Pot name is too long");

              !/^[a-zA-Z\s]+$/.test(value) &&
                errors.push("Pot name should only contain letters and spaces");

              /\s{2,}/.test(value) &&
                errors.push(
                  "Pot name should not have multiple consecutive spaces",
                );

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <div className="relative">
              <NameField field={field} label="Pot Name" />

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
                label="Target Amount"
                currency={pot!.currency}
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
              <ThemeField
                field={field}
                items={pots}
                currentTheme={pot!.theme}
              />

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
              label="Update Pot"
            />
          )}
        />
      </form>
    </div>
  );
}

export default EditPotModal;
