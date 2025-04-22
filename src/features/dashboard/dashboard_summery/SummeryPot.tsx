import { useStore } from "@tanstack/react-store";

import { Route as PotRoute } from "../../../routes/app/pot.tsx";

import { potTransactionCacheStore } from "../../../store/appCacheStore.ts";
import { potStore } from "../../pot/store/potStore.ts";

import SummeryHeader from "../../../components/ui/SummeryHeader.tsx";

import type { Pot } from "../../pot/types/pot.types.ts";

import { themeColors } from "../../../constants/appOptions.ts";

function SummeryPot() {
  const pots: Pot[] = [...useStore(potStore, (s) => s.pots)];
  const potTransactionCache = useStore(potTransactionCacheStore);

  const totalSaved = pots.reduce((acc, pot) => {
    const saved = potTransactionCache.get(pot.potId)?.amount ?? 0;

    return acc + saved;
  }, 0);

  const currency = pots[0]?.currency;

  return totalSaved === 0 ? null : (
    <div className="bg-shade-100 flex flex-col gap-4 rounded-md px-6 pt-7 pb-4">
      <SummeryHeader
        to={PotRoute.to}
        header="Pots"
        label="Explore"
        onClick={() => {}}
        headerClass="text-2xl"
      />

      <div className="grid grid-cols-[2fr_3fr] gap-4">
        <PotBalance totalSaved={totalSaved} currency={currency} />

        <PotSummery />
      </div>
    </div>
  );
}

function PotBalance({
  totalSaved,
  currency,
}: {
  totalSaved: number;
  currency: string;
}) {
  return (
    <div className="font-space-grotesk flex flex-col justify-center gap-1 rounded-md bg-orange-50 px-4 py-2 text-gray-900">
      <span className="text-sm">Total Saved</span>

      <span className="text-4xl font-medium">
        {currency}
        {totalSaved.toFixed(2)}
      </span>
    </div>
  );
}

function PotSummery() {
  const potTransactionCache = useStore(potTransactionCacheStore);
  const pots: Pot[] = [...useStore(potStore, (s) => s.pots)]
    .sort((a, b) => {
      const savedA = potTransactionCache.get(a.potId)?.amount ?? 0;
      const savedB = potTransactionCache.get(b.potId)?.amount ?? 0;

      const percentA = savedA / a.targetAmount;
      const percentB = savedB / b.targetAmount;

      return percentB - percentA;
    })
    .slice(0, 4);

  return (
    <div className="grid grid-cols-2">
      {pots.map((pot) => {
        const savedAmount = potTransactionCache.get(pot.potId)?.amount ?? 0;

        return (
          savedAmount > 0 && (
            <div
              key={pot.potId}
              className="flex h-14 items-center gap-3 rounded-md px-2 py-1.5"
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
                  {savedAmount.toFixed(2)}
                </span>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default SummeryPot;
