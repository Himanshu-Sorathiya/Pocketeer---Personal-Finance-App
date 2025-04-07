import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";

import { potStore } from "../store/potStore.ts";

import AmountField from "../../../components/modals/AmountField.tsx";
import SubmitButton from "../../../components/modals/SubmitButton.tsx";

function WithdrawMoneyFromPotModal({ potId }: any) {
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
        Withdraw from "{pot?.name}"
      </h1>

      <p className="text-text text-sm">
        Need to use some of your saved funds? Withdraw from your pot and stay in
        control of your financial journey with Pocketeer!{" "}
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
              label="Amount to Withdraw"
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
              label="Withdraw Money"
            />
          )}
        />
      </form>
    </div>
  );
}

export default WithdrawMoneyFromPotModal;
