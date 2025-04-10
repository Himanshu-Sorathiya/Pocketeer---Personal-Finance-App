import { useStore } from "@tanstack/react-store";

import { Route as PotRoute } from "../../../routes/app/pot.tsx";

import { potStore } from "../../pot/store/potStore.ts";
import { transactionStore } from "../../transaction/store/transactionStore.ts";

import SummeryHeader from "../../../components/ui/SummeryHeader.tsx";

import type { Pot } from "../../pot/types/pot.types.ts";
import type { Transaction } from "../../transaction/types/transaction.types.ts";

import themeColors from "../../../constants/themeColors.ts";

import { filterTransactionsByPot } from "../../pot/pot_helpers/potHelpers.ts";

function SummeryPot() {
  return (
    <div className="bg-shade-100 flex flex-col gap-4 rounded-md px-6 pt-7 pb-4">
      <SummeryHeader
        to={PotRoute.to}
        header="Pots"
        label="Explore"
        onClick={() => {}}
        headerClass="text-2xl"
      />

      <div className="grid grid-cols-[2fr_3fr] gap-4">
        <PotBalance />

        <PotSummery />
      </div>
    </div>
  );
}

function PotBalance() {
  const pots: Pot[] = [...useStore(potStore, (s) => s.pots)];
  const transactions: Transaction[] = [
    ...useStore(transactionStore, (s) => s.transactions),
  ];

  const totalSaved = pots
    .reduce((acc, pot) => {
      const saved = filterTransactionsByPot(
        pot.name,
        pot.creationDate,
        transactions,
      ).reduce((sum, t) => sum + t.amount, 0);

      return acc + saved;
    }, 0)
    .toFixed(2);

  const currency = pots[0]?.currency;

  return (
    <div className="font-space-grotesk flex flex-col justify-center gap-1 rounded-md bg-orange-50 px-4 py-2 text-gray-900">
      <span className="text-sm">Total Saved</span>

      <span className="text-4xl font-medium">
        {currency}
        {totalSaved}
      </span>
    </div>
  );
}

function PotSummery() {
  const transactions: Transaction[] = [
    ...useStore(transactionStore, (s) => s.transactions),
  ];
  const pots: Pot[] = [...useStore(potStore, (s) => s.pots)]
    .sort((a, b) => {
      const savedA = filterTransactionsByPot(
        a.name,
        a.creationDate,
        transactions,
      ).reduce((sum, t) => sum + t.amount, 0);
      const savedB = filterTransactionsByPot(
        b.name,
        b.creationDate,
        transactions,
      ).reduce((sum, t) => sum + t.amount, 0);

      const percentA = savedA / a.targetAmount;
      const percentB = savedB / b.targetAmount;

      return percentB - percentA;
    })
    .slice(0, 4);

  return (
    <div className="grid grid-cols-2">
      {pots.map((pot) => {
        const savedAmount = filterTransactionsByPot(
          pot.name,
          pot.creationDate,
          transactions,
        ).reduce((sum, t) => sum + t.amount, 0);

        return (
          <div
            key={pot.id}
            className="flex h-full items-center gap-3 rounded-md px-2 py-1.5"
          >
            <div
              className="h-full w-1 rounded-sm"
              style={{
                backgroundColor: themeColors.find((c) => c.name === pot.theme)
                  ?.hex,
              }}
            ></div>

            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500">
                {pot.name
                  .split("_")
                  .map(
                    (part) =>
                      part.charAt(0).toUpperCase() +
                      part.slice(1).toLowerCase(),
                  )
                  .join(" & ")}
              </span>

              <span className="font-space-grotesk text-lg font-semibold text-gray-900">
                {pot.currency}
                {savedAmount}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummeryPot;
