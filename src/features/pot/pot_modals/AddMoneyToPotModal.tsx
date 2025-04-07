import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";

import { potStore } from "../store/potStore.ts";

import AmountField from "../../../components/modals/AmountField.tsx";
import SubmitButton from "../../../components/modals/SubmitButton.tsx";

function AddMoneyToPotModal({ potId }: any) {
  const pot = [...useStore(potStore, (s) => s.pots)].find(
    (pot) => pot.id === potId,
  );

  const form = useForm({
    defaultValues: {
      amount: 0,
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Add to "{pot?.name}"
      </h1>

      <p className="text-text text-sm">
        Fuel your savings journey by adding more to your pot. Every contribution
        brings you closer to your goal with Pocketeer!
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <form.Field
          name="amount"
          children={(field) => (
            <AmountField
              field={field}
              label="Amount to Add"
              currency={pot!.currency}
            />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              label="Add Money"
            />
          )}
        />
      </form>
    </div>
  );
}

export default AddMoneyToPotModal;
