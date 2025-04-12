import { useState } from "react";

import { useStore } from "@tanstack/react-store";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { transactionStore } from "../../transaction/store/transactionStore.ts";
import { potStore } from "../store/potStore.ts";

import { useAppForm } from "../../../hooks/useAppForm.ts";

import type { Transaction } from "../../transaction/types/transaction.types.ts";
import type { Pot } from "../types/pot.types.ts";

import themeColors from "../../../constants/themeColors.ts";

import { filterTransactionsByPot } from "../pot_helpers/potHelpers.ts";

function WithdrawMoneyFromPotModal({ potId }: any) {
  const pots: Pot[] = [...useStore(potStore, (s) => s.pots)];
  const transactions: Transaction[] = [
    ...useStore(transactionStore, (s) => s.transactions),
  ];

  const pot: Pot | undefined = pots.find((pot) => pot.id === potId);

  const savedAmount = filterTransactionsByPot(
    pot!.name,
    pot!.creationDate,
    transactions,
  ).reduce((sum, t) => sum + t.amount, 0);

  const form = useAppForm({
    defaultValues: {
      amount: "",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  const [amount, setAmount] = useState(form.state.values.amount);

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Withdraw from "{pot?.name}"
      </h1>

      <p className="text-text text-sm">
        Need to use some of your saved funds? Withdraw from your pot and stay in
        control of your financial journey with Pocketeer!{" "}
      </p>

      <PotBalance
        savedAmount={savedAmount}
        currency={pot!.currency}
        amount={+amount}
      />

      <PotProgressChart
        savedAmount={savedAmount}
        targetAmount={pot!.targetAmount}
        theme={pot!.theme}
        amount={+amount}
      />

      <PotProgressInfo
        savedAmount={savedAmount}
        targetAmount={pot!.targetAmount}
        currency={pot!.currency}
        amount={+amount}
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
              label="Amount to Withdraw"
              currency={pot!.currency}
              onChange={(value) => setAmount(value)}
            />
          )}
        />

        <form.AppForm>
          <form.SubmitButton label="Withdraw Money" />
        </form.AppForm>
      </form>
    </div>
  );
}
function PotBalance({
  savedAmount,
  currency,
  amount,
}: {
  savedAmount: number;
  currency: string;
  amount: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-text text-sm">Amount saved</span>

      <span
        className={`font-space-grotesk text-3xl font-semibold ${savedAmount - amount <= 0 ? "text-red-500" : "text-gray-900"}`}
      >
        {currency}
        {Math.max(savedAmount - amount, 0).toFixed(2)}
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
              saved: Math.max(savedAmount - amount, 0),
              withdrawn: Math.min(amount, savedAmount),
              remaining: targetAmount - savedAmount,
            },
          ]}
        >
          <XAxis type="number" domain={[0, targetAmount]} hide />
          <YAxis type="category" dataKey="name" hide />

          <Bar dataKey="saved" fill={"#1e2939"} barSize={20} stackId="pot" />
          <Bar
            dataKey="withdrawn"
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
          className={`font-space-grotesk ${savedAmount - amount <= 0 ? "font-semibold text-red-500" : ""}`}
        >
          {((Math.max(savedAmount - amount, 0) / targetAmount) * 100).toFixed(
            2,
          )}
          %{" "}
        </span>
        <span className="text-red-500">
          {amount === 0
            ? ""
            : `(-${((Math.min(amount, savedAmount) / targetAmount) * 100).toFixed(2)}%)`}
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

export default WithdrawMoneyFromPotModal;
