import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";

import { transactionStore } from "../store/transactionStore.ts";

import AmountField from "../../../components/modals/AmountField.tsx";
import CategoryField from "../../../components/modals/CategoryField.tsx";
import DateField from "../../../components/modals/DateField.tsx";
import NameField from "../../../components/modals/NameField.tsx";
import SubmitButton from "../../../components/modals/SubmitButton.tsx";
import TypeField from "../../../components/modals/TypeField.tsx";
import ErrorTooltip from "../../../components/ui/ErrorTooltip.tsx";

import transactionCategories from "../../../constants/transactionCategory.ts";

function CreateTransactionModal() {
  const currency = [...useStore(transactionStore, (s) => s.transactions)][0]
    ?.currency;

  const form = useForm({
    defaultValues: {
      recipientName: "",
      category: transactionCategories[0] || "",
      date: new Date().toISOString().slice(0, 10),
      amount: "",
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
          validators={{
            onChange: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              value.length > 3 &&
                !/^[a-zA-Z\s]+$/.test(value) &&
                errors.push(
                  "Recipient name should only contain letters and spaces",
                );

              value.length > 3 &&
                /\s{2,}/.test(value) &&
                errors.push(
                  "Recipient name should not have multiple consecutive spaces",
                );

              return errors.length === 0 ? undefined : errors;
            },
            onSubmit: ({ value }) => {
              const errors = [];
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
          children={(field) => (
            <div className="relative">
              <NameField field={field} label="Recipient Name" />

              <ErrorTooltip errorMap={field.state.meta.errorMap} />
            </div>
          )}
        />

        <form.Field
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
            <div className="relative">
              <DateField field={field} />

              <ErrorTooltip errorMap={field.state.meta.errorMap} />
            </div>
          )}
        />

        <form.Field
          name="category"
          validators={{
            onSubmit: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Category is required");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <div className="relative">
              <CategoryField field={field} items={transactionCategories} />

              <ErrorTooltip errorMap={field.state.meta.errorMap} />
            </div>
          )}
        />

        <form.Field
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

              parseFloat(value) <= 0 &&
                errors.push("Amount must be greater than 0");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <div className="relative">
              <AmountField field={field} label="Amount" currency={currency} />

              <ErrorTooltip errorMap={field.state.meta.errorMap} />
            </div>
          )}
        />

        <form.Field
          name="type"
          validators={{
            onSubmit: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Type is required");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => (
            <div className="relative">
              <TypeField field={field} label="Type" />

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
              label="Add Transaction"
            />
          )}
        />
      </form>
    </div>
  );
}

export default CreateTransactionModal;
