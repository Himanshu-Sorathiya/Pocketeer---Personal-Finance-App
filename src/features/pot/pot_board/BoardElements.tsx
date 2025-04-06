import { useState } from "react";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { openModal } from "../../../store/appModalStore.ts";

import DropDownActions from "../../../components/ui/DropDownActions.tsx";

import themeColors from "../../../constants/themeColors.ts";

function BoardBalance({
  currency,
  savedAmount,
  targetAmount,
}: {
  currency: string;
  savedAmount: number;
  targetAmount: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-text text-sm">Amount saved</span>

      <span
        className={`font-space-grotesk text-3xl font-semibold ${savedAmount >= targetAmount ? "text-green-500" : "text-gray-900"}`}
      >
        {currency}
        {savedAmount}
      </span>
    </div>
  );
}

function BoardProgressChart({
  savedAmount,
  targetAmount,
  theme,
  currency,
}: {
  savedAmount: number;
  targetAmount: number;
  theme: string;
  currency: string;
}) {
  return (
    <div className="mt-2">
      <ResponsiveContainer width="100%" height={20}>
        <BarChart
          layout="vertical"
          data={[
            {
              saved: savedAmount,
              remaining: targetAmount - savedAmount,
            },
          ]}
        >
          <XAxis type="number" domain={[0, targetAmount]} hide />
          <YAxis type="category" dataKey="name" hide />

          <Tooltip
            content={({ active, payload, coordinate }: any) => {
              if (!active || !payload || payload.length === 0 || !coordinate)
                return null;

              return (
                <div
                  className="bg-shade-100 z-10 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium opacity-100 shadow-md"
                  style={{
                    left: coordinate.x,
                    top: coordinate.y,
                    transform: "translate(-50%, -115%)",
                    position: "absolute",
                  }}
                >
                  <p style={{ color: "#364153" }}>
                    Total:{" "}
                    <span className="font-space-grotesk">
                      {targetAmount}
                      {currency}
                    </span>
                  </p>

                  <p style={{ color: payload[0].fill }} className="mt-2">
                    Saved:{" "}
                    <span className="font-space-grotesk">
                      {payload[0].value}
                      {currency}
                    </span>
                  </p>
                  <p style={{ color: "#364153" }}>
                    Remaining:{" "}
                    <span className="font-space-grotesk">
                      {payload[1].value}
                      {currency}
                    </span>
                  </p>
                </div>
              );
            }}
          />

          <Bar
            dataKey="saved"
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

function BoardProgressInfo({
  savedAmount,
  targetAmount,
  currency,
}: {
  savedAmount: number;
  targetAmount: number;
  currency: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-xs font-medium text-gray-700">
        Progress:{" "}
        <span
          className={`font-space-grotesk ${savedAmount >= targetAmount ? "font-semibold text-green-500" : ""}`}
        >
          {((savedAmount / targetAmount) * 100).toFixed(2)}%
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

function BoardPotActions({
  potId,
  savedAmount,
  targetAmount,
}: {
  potId: string;
  savedAmount: number;
  targetAmount: number;
}) {
  function handleActionClick(action: string) {
    if (action === "add") openModal("pot_add_money", potId);
    else if (action === "withdraw") openModal("pot_withdraw_money", potId);
  }

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        className="disabled:text-shade-40 bg-shade-95 hover:bg-shade-80 flex-1 cursor-pointer rounded-md py-2 font-medium text-gray-700 transition-all duration-200 disabled:cursor-not-allowed disabled:font-normal"
        onClick={() => handleActionClick("add")}
        disabled={savedAmount >= targetAmount}
      >
        Add Money
      </button>

      <button
        className="disabled:text-shade-40 bg-shade-95 hover:bg-shade-80 flex-1 cursor-pointer rounded-md py-2 font-medium text-gray-700 transition-all duration-200 disabled:cursor-not-allowed disabled:font-normal"
        onClick={() => handleActionClick("withdraw")}
        disabled={savedAmount === 0}
      >
        Withdraw Money
      </button>
    </div>
  );
}

function BoardBadge({
  savedAmount,
  targetAmount,
}: {
  savedAmount: number;
  targetAmount: number;
}) {
  if (savedAmount !== targetAmount) return;

  return (
    <div className="absolute -top-2 -right-2 flex items-center gap-1 rounded-md bg-green-500 px-2 py-1 text-white">
      <svg className="size-5">
        <use href="/src/assets/icons/ui_icons_sprite.svg#check-badge" />
      </svg>
    </div>
  );
}

function BoardActions({ potId }: { potId: string }) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  function handleActionClick(action: string) {
    if (action === "edit") openModal("edit_pot", potId);
    else if (action === "delete") openModal("delete_pot", potId);
  }

  return (
    <div className="relative flex items-center justify-center">
      <button
        onMouseEnter={() => setOpenDropdown(true)}
        onMouseLeave={() => setOpenDropdown(false)}
        onClick={() => setOpenDropdown(!openDropdown)}
        className="cursor-pointer rounded text-gray-500 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100 hover:text-gray-700"
      >
        <svg className="flex h-6 w-6 items-center justify-center">
          <use href="/src/assets/icons/ui_icons_sprite.svg#actions-horizontal"></use>
        </svg>
      </button>

      {openDropdown && (
        <DropDownActions
          action="pot"
          setOpenDropdown={setOpenDropdown}
          handleActionClick={handleActionClick}
        />
      )}
    </div>
  );
}

export {
  BoardActions,
  BoardBadge,
  BoardBalance,
  BoardPotActions,
  BoardProgressChart,
  BoardProgressInfo,
};
