import { useForm, useStore } from "@tanstack/react-form";

import { potStore } from "../store/potStore.ts";

import AmountField from "../../../components/modals/AmountField.tsx";
import NameField from "../../../components/modals/NameField.tsx";
import SubmitButton from "../../../components/modals/SubmitButton.tsx";
import ThemeField from "../../../components/modals/ThemeField.tsx";

import type { Pot } from "../types/pot.types.ts";

function CreatePotModal() {
  const pots: Pot[] = [...useStore(potStore, (s) => s.pots)];

  const currency = pots[0]?.currency;

  const form = useForm({
    defaultValues: {
      name: "",
      targetAmount: 0,
      theme: "",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">Create new Pot</h1>

      <p className="text-text text-sm">
        Ready to give your savings a purpose? Create a pot and start setting
        targets for your financial goals with Pocketeer!
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
              currency={currency}
            />
          )}
        />

        <form.Field
          name="theme"
          children={(field) => <ThemeField field={field} items={pots} />}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              label="Create Pot"
            />
          )}
        />
      </form>
    </div>
  );
}

export default CreatePotModal;
