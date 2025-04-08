import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";

import { transactionStore } from "../../transaction/store/transactionStore.ts";

import AmountField from "../../../components/modals/AmountField.tsx";
import CategoryField from "../../../components/modals/CategoryField.tsx";
import DateField from "../../../components/modals/DateField.tsx";
import NameField from "../../../components/modals/NameField.tsx";
import SubmitButton from "../../../components/modals/SubmitButton.tsx";

function EditTransactionModal({ transactionId }: any) {
  const transaction = [
    ...useStore(transactionStore, (s) => s.transactions),
  ].find((transaction) => transaction.id === transactionId);

  const form = useForm({
    defaultValues: {
      recipientName: transaction?.recipient ?? "",
      category: transaction?.category ?? "",
      date: transaction?.date ?? "",
      amount: transaction?.amount ?? 0,
      type: transaction?.type ?? "expense",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Edit Transaction of "{transaction?.recipient}"
      </h1>

      <p className="text-text text-sm">
        Need to make changes? Edit your transaction details to ensure your
        financial records stay accurate with Pocketeer!{" "}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <form.Field
          name="recipientName"
          children={(field) => (
            <NameField field={field} label="Recipient Name" />
          )}
        />

        <form.Field
          name="date"
          children={(field) => (
            <DateField field={field} transactionDate={transaction?.date} />
          )}
        />

        <form.Field
          name="category"
          children={(field) => <CategoryField field={field} />}
        />

        <form.Field
          name="amount"
          children={(field) => (
            <AmountField
              field={field}
              label="Amount"
              currency={transaction!.currency}
            />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              label="Update Transaction"
            />
          )}
        />
      </form>
    </div>
  );
}

export default EditTransactionModal;
