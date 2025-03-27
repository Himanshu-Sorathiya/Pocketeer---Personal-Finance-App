import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BoardBalance({
  currency,
  savedAmount,
}: {
  currency: string;
  savedAmount: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text text-sm">Amount saved</span>

      <span className="font-space-grotesk text-3xl font-semibold text-gray-900">
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
                  className="bg-shade-100 z-10 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium whitespace-nowrap opacity-100 shadow-md"
                  style={{
                    left: coordinate.x,
                    top: coordinate.y,
                    transform: "translate(-50%, -115%)",
                    position: "absolute",
                  }}
                >
                  <p style={{ color: payload[0].fill }}>
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

          <Bar dataKey="saved" fill={theme} barSize={20} stackId="pot" />
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
    <div className="flex items-center justify-between">
      <div className="text-xs font-medium text-gray-700">
        Progress:{" "}
        <span className="font-space-grotesk">
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

function BoardPotActions() {
  return (
    <div className="mt-4 flex items-center gap-3">
      <PotActionButton>Add Money</PotActionButton>

      <PotActionButton>Withdraw</PotActionButton>
    </div>
  );
}

function PotActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-shade-95 hover:bg-shade-80 flex-1 cursor-pointer rounded-md py-2 font-medium text-gray-700 transition-all duration-200">
      {children}
    </button>
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

export {
  BoardBadge,
  BoardBalance,
  BoardPotActions,
  BoardProgressChart,
  BoardProgressInfo,
};
