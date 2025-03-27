import BoardBody from "./BoardBody.tsx";
import { BoardBadge } from './BoardElements.tsx';
import BoardHeader from "./BoardHeader.tsx";

import type { Pot } from "../types/pot.types.ts";

function PotBoard({ pots }: { pots: Pot[] }) {
  return (
    <div className="grid min-w-full grid-cols-3 gap-4">
      {pots.map((pot) => (
        <div
          key={pot.id}
          className="bg-shade-100 relative flex flex-col gap-3 rounded-md px-6 py-4"
        >
          <BoardHeader pot={pot} />

          <BoardBody pot={pot} />

          <BoardBadge
            savedAmount={pot.savedAmount}
            targetAmount={pot.targetAmount}
          />
        </div>
      ))}
    </div>
  );
}

export default PotBoard;
