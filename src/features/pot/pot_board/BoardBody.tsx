import type { Pot } from "../types/pot.types.ts";

function BoardBody({ pot }: { pot: Pot }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-text text-sm">Amount saved</span>

        <span className="font-space-grotesk text-3xl font-semibold text-gray-900">
          {pot.currency}
          {pot.savedAmount}
        </span>
      </div>

      <div>
        <span>HORIZONTAL BAR</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-gray-700">
          Progress:{" "}
          <span className="font-space-grotesk">
            {((pot.savedAmount / pot.targetAmount) * 100).toFixed(2)}%{" "}
          </span>
        </div>

        <div className="text-xs font-medium text-gray-700">
          Target:{" "}
          <span className="font-space-grotesk">
            {pot.currency}
            {pot.targetAmount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BoardBody;
