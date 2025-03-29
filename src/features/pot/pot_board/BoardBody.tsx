import {
  BoardBalance,
  BoardPotActions,
  BoardProgressChart,
  BoardProgressInfo,
} from "./BoardElements.tsx";

import type { Pot } from "../types/pot.types.ts";

function BoardBody({ pot }: { pot: Pot }) {
  return (
    <div className="flex flex-col">
      <BoardBalance
        currency={pot.currency}
        savedAmount={pot.savedAmount}
        targetAmount={pot.targetAmount}
      />

      <BoardProgressChart
        savedAmount={pot.savedAmount}
        targetAmount={pot.targetAmount}
        theme={pot.theme}
        currency={pot.currency}
      />

      <BoardProgressInfo
        savedAmount={pot.savedAmount}
        targetAmount={pot.targetAmount}
        currency={pot.currency}
      />

      <BoardPotActions
        savedAmount={pot.savedAmount}
        targetAmount={pot.targetAmount}
      />
    </div>
  );
}

export default BoardBody;
