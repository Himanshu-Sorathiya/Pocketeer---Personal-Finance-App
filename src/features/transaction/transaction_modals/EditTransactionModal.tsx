import { useStore } from "@tanstack/react-store";
import { format } from "date-fns";

import { transactionStore } from "../../transaction/store/transactionStore.ts";

import { useAppForm } from "../../../hooks/useAppForm.ts";

import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import type { Transaction } from "../types/transaction.types.ts";

function EditTransactionModal({ transactionId }: any) {
  const transaction: Transaction | undefined = [
    ...useStore(transactionStore, (s) => s.transactions),
  ].find((transaction) => transaction.id === transactionId);

  const form = useAppForm({
    defaultValues: {
      recipientName: transaction?.recipient ?? "",
      category: transaction?.category ?? "",
      date: transaction?.date ?? "",
      amount: String(transaction?.amount ?? ""),
      type: transaction?.type ?? "expense",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
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
                transaction?.date ?? format(new Date(), "yyyy-MM-dd")
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

              parseFloat(value) <= 1 &&
                errors.push("Amount must be greater than 1");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <field.AmountField
              label="Amount"
              currency={transaction!.currency}
            />
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
          children={(field) => <field.TypeField label="Type" />}
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

export default EditTransactionModal;
