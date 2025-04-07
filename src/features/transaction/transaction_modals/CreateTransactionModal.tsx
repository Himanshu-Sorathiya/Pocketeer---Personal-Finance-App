import { useForm, useStore } from "@tanstack/react-form";

import { transactionStore } from "../store/transactionStore.ts";

import AmountField from "../../../components/modals/AmountField.tsx";
import CategoryField from "../../../components/modals/CategoryField.tsx";
import NameField from "../../../components/modals/NameField.tsx";
import SubmitButton from "../../../components/modals/SubmitButton.tsx";

import transactionCategories from "../../../constants/transactionCategory.ts";

function CreateTransactionModal() {
  const currency = [...useStore(transactionStore, (s) => s.transactions)][0]
    ?.currency;

  const form = useForm({
    defaultValues: {
      recipientName: "",
      category: transactionCategories[0] || "",
      date: "",
      amount: 0,
      type: "expense",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Create new Transaction
      </h1>

      <p className="text-text text-sm">
        Start tracking your finances by adding a new transaction. Stay on top of
        your income and expenses with Pocketeer!{" "}
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
          name="category"
          children={(field) => <CategoryField field={field} />}
        />

        <form.Field
          name="amount"
          children={(field) => (
            <AmountField field={field} label="Amount" currency={currency} />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              label="Add Transaction"
            />
          )}
        />
      </form>
    </div>
  );
}

export default CreateTransactionModal;
