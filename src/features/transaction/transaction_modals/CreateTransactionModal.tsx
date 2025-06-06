import { useAppForm } from "../../../hooks/useAppForm.ts";
import { useUser } from "../../auth/hooks/useUser.ts";
import { useCreateTransaction } from "../hooks/useCreateTransaction.ts";

import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import { transactionCategories } from "../../../constants/transactionConfig.ts";

function CreateTransactionModal() {
  const { user_id, currency_symbol } = useUser();
  const { transactionStatus, createTransaction } = useCreateTransaction();

  const defaultValues = {
    recipientName: "",
    category: transactionCategories[0] ?? "",
    date: new Date().toISOString().slice(0, 10),
    amount: "",
    type: "expense",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      createTransaction({
        user_id: user_id ?? "",
        recipient: value.recipientName,
        category: value.category,
        amount: +value.amount,
        type: value.type,
        creationDate: value.date,
      });
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {transactionStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Create new Transaction`} />

      <ModalDescription description="Start tracking your finances by adding a new transaction. Stay on top of your income and expenses with Pocketeer!" />

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
          children={(field) => <field.DateField />}
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
            <field.CategoryField items={transactionCategories} />
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
            <form.SubmitButton label="Add Transaction" />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}

export default CreateTransactionModal;
