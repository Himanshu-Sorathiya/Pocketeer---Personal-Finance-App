import { format } from "date-fns";

import { useAppForm } from "../../../hooks/useAppForm.ts";
import { useUser } from "../../auth/hooks/useUser.ts";
import { useReadTransactions } from "../hooks/useReadTransactions.ts";
import { useUpdateTransaction } from "../hooks/useUpdateTransaction.ts";

import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import { Transaction } from "../types/transaction.types.ts";

function UpdateTransactionModal({ transactionId }: any) {
  const { currency_symbol } = useUser();
  const { transactions } = useReadTransactions();
  const { transactionStatus, updateTransaction } = useUpdateTransaction();

  const transaction: Transaction | undefined = transactions.find(
    (transaction) => transaction.transactionId === transactionId,
  );

  const defaultValues = {
    recipientName: transaction?.recipient ?? "",
    category: transaction?.category ?? "",
    date: transaction?.creationDate ?? "",
    amount: String(transaction?.amount ?? ""),
    type: transaction?.type ?? "expense",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const updates: Partial<Transaction> = {};

      if (value.recipientName !== defaultValues.recipientName)
        updates.recipient = value.recipientName;
      if (value.category !== defaultValues.category)
        updates.category = value.category;
      if (value.date !== defaultValues.date) updates.creationDate = value.date;
      if (value.amount !== defaultValues.amount) updates.amount = +value.amount;
      if (value.type !== defaultValues.type) updates.type = value.type;

      updateTransaction({ transactionId, updates });
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {transactionStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Edit Transaction of "${transaction?.recipient}"`} />

      <ModalDescription description="Need to make changes? Edit your transaction details to ensure your financial records stay accurate with Pocketeer!" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <form.AppField
          name="recipientName"
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
          children={(field) => <field.NameField label="Recipient Name" />}
        />

        <form.AppField
          name="date"
          validators={{
            onChange: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Date is required");

              !/^\d{4}-\d{2}-\d{2}$/.test(value) &&
                errors.push("Invalid date format. Please use YYYY-MM-DD.");

              return errors.length === 0 ? undefined : errors;
            },
            onSubmit: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !/^\d{4}-\d{2}-\d{2}$/.test(value) &&
                errors.push("Invalid date format. Please use YYYY-MM-DD.");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <field.DateField
              transactionDate={
                transaction?.creationDate ?? format(new Date(), "yyyy-MM-dd")
              }
            />
          )}
        />

        <form.AppField
          name="category"
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
            <field.CategoryField currentCategory={transaction?.category} />
          )}
        />

        <form.AppField
          name="amount"
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
            <field.AmountField label="Amount" currency={currency_symbol} />
          )}
        />

        <form.AppField
          name="type"
          validators={{
            onChange: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Type is required");

              return errors.length === 0 ? undefined : errors;
            },
            onSubmit: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Type is required");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => <field.TypeField />}
        />

        <div className="flex gap-3">
          <form.AppForm>
            <form.ResetButton />
          </form.AppForm>

          <form.AppForm>
            <form.SubmitButton label="Update Transaction" />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}

export default UpdateTransactionModal;
