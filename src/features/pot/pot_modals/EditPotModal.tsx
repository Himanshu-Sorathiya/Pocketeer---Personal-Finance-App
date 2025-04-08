import { useForm, useStore } from "@tanstack/react-form";

import { potStore } from "../store/potStore.ts";

import AmountField from "../../../components/modals/AmountField.tsx";
import NameField from "../../../components/modals/NameField.tsx";
import SubmitButton from "../../../components/modals/SubmitButton.tsx";
import ThemeField from "../../../components/modals/ThemeField.tsx";

import type { Pot } from "../types/pot.types.ts";

function EditPotModal({ potId }: { potId: string }) {
  const pots: Pot[] = [...useStore(potStore, (s) => s.pots)];

  const pot: Pot | undefined = pots.find((pot) => pot.id === potId);

  const form = useForm({
    defaultValues: {
      name: pot?.name ?? "New Pot Name",
      targetAmount: pot?.targetAmount ?? 0,
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
          children={(field) => <NameField field={field} label="Pot Name" />}
        />

        <form.Field
          name="targetAmount"
          children={(field) => (
            <AmountField
              field={field}
              label="Target Amount"
              currency={pot!.currency}
            />
          )}
        />

        <form.Field
          name="theme"
          children={(field) => (
            <ThemeField field={field} items={pots} currentTheme={pot?.theme} />
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
