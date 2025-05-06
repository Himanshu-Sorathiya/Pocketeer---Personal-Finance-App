import { useStore } from "@tanstack/react-store";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { potTransactionCacheStore } from "../../../store/appCacheStore.ts";

import { useAppForm } from "../../../hooks/useAppForm.ts";
import { useCreateTransaction } from "../../transaction/hooks/useCreateTransaction.ts";
import { useReadPots } from "../hooks/useReadPots.ts";

import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import type { Pot } from "../types/pot.types.ts";

import { themeColors } from "../../../constants/appOptions.ts";

function AddMoneyToPotModal({ potId }: any) {
  const { pots } = useReadPots();
  const { transactionStatus, createTransaction } = useCreateTransaction();

  const pot: Pot | undefined = pots.find((pot) => pot.potId === potId);

  const savedAmount =
    useStore(potTransactionCacheStore).get(pot!.potId)?.amount ?? 0;

  const defaultValues = {
    amount: "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      createTransaction({
        recipient: pot!.name,
        category: "savings",
        amount: +value.amount,
        type: "income",
        creationDate: new Date().toISOString().split("T")[0],
      });
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {transactionStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Add Money to "${pot?.name}"`} />

      <ModalDescription description="Fuel your savings journey by adding more to your pot. Every contribution brings you closer to your goal with Pocketeer!" />

      <form.Subscribe
        selector={(state) => state.values.amount}
        children={(amount) => (
          <PotBalance
            savedAmount={savedAmount}
            targetAmount={pot!.targetAmount}
            currency={pot!.currency}
            amount={+amount}
          />
        )}
      />

      <form.Subscribe
        selector={(state) => state.values.amount}
        children={(amount) => (
          <PotProgressChart
            savedAmount={savedAmount}
            targetAmount={pot!.targetAmount}
            theme={pot!.theme}
            amount={+amount}
          />
        )}
      />

      <form.Subscribe
        selector={(state) => state.values.amount}
        children={(amount) => (
          <PotProgressInfo
            savedAmount={savedAmount}
            targetAmount={pot!.targetAmount}
            currency={pot!.currency}
            amount={+amount}
          />
        )}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
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

              savedAmount + parseFloat(value) !== pot!.targetAmount &&
                pot!.targetAmount - (savedAmount + parseFloat(value)) < 1 &&
                errors.push(
                  "You must either add the full amount or leave at least 1 remaining.",
                );

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

              savedAmount + parseFloat(value) !== pot!.targetAmount &&
                pot!.targetAmount - (savedAmount + parseFloat(value)) < 1 &&
                errors.push(
                  "You must either add the full amount or leave at least 1 remaining.",
                );

              parseFloat(value) < 1 &&
                errors.push("Amount must be greater than 1");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          listeners={{
            onChange: ({ value }) => {
              if (parseFloat(value) > pot!.targetAmount - savedAmount)
                form.setFieldValue(
                  "amount",
                  String(pot!.targetAmount - savedAmount),
                );
            },
          }}
          children={(field) => (
            <field.AmountField label="Amount to Add" currency={pot!.currency} />
          )}
        />

        <div className="flex gap-3">
          <form.AppForm>
            <form.ResetButton />
          </form.AppForm>

          <form.AppForm>
            <form.SubmitButton label="Add Money" />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}

function PotBalance({
  savedAmount,
  targetAmount,
  currency,
  amount,
}: {
  savedAmount: number;
  targetAmount: number;
  currency: string;
  amount: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-text text-sm">Amount saved</span>

      <span
        className={`font-space-grotesk text-3xl font-semibold ${savedAmount + amount >= targetAmount ? "text-green-500" : "text-gray-900"}`}
      >
        {currency}
        {Math.min(savedAmount + amount, targetAmount).toFixed(2)}
      </span>
    </div>
  );
}

function PotProgressChart({
  savedAmount,
  targetAmount,
  theme,
  amount,
}: {
  savedAmount: number;
  targetAmount: number;
  theme: string;
  amount: number;
}) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={20}>
        <BarChart
          layout="vertical"
          data={[
            {
              saved: savedAmount,
              added: Math.min(amount, targetAmount - savedAmount),
              remaining: Math.max(
                targetAmount -
                  savedAmount -
                  Math.min(amount, targetAmount - savedAmount),
                0,
              ),
            },
          ]}
        >
          <XAxis type="number" domain={[0, targetAmount]} hide />
          <YAxis type="category" dataKey="name" hide />

          <Bar dataKey="saved" fill={"#1e2939"} barSize={20} stackId="pot" />
          <Bar
            dataKey="added"
            fill={themeColors.find((c) => c.name === theme)?.hex}
            barSize={20}
            stackId="pot"
          />
          <Bar
            dataKey="remaining"
            fill={"#e0e0e0"}
            barSize={20}
            stackId="pot"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function PotProgressInfo({
  savedAmount,
  targetAmount,
  currency,
  amount,
}: {
  savedAmount: number;
  targetAmount: number;
  currency: string;
  amount: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-xs font-medium text-gray-700">
        Progress:{" "}
        <span
          className={`font-space-grotesk ${savedAmount + amount >= targetAmount ? "font-semibold text-green-500" : ""}`}
        >
          {(
            (Math.min(savedAmount + amount, targetAmount) / targetAmount) *
            100
          ).toFixed(2)}
          %{" "}
        </span>
        <span className="text-green-500">
          {amount === 0
            ? ""
            : `(+${((Math.min(amount, targetAmount - savedAmount) / targetAmount) * 100).toFixed(2)}%)`}
        </span>
      </div>

      <div className="text-xs font-medium text-gray-700">
        Target:{" "}
        <span className="font-space-grotesk">
          {currency}
          {targetAmount}
        </span>
      </div>
    </div>
  );
}

export default AddMoneyToPotModal;
