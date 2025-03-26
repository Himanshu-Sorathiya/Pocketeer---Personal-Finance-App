import BoardBody from "./BoardBody.tsx";
import BoardHeader from "./BoardHeader.tsx";

import type { Pot } from "../types/pot.types.ts";

function PotBoard({ pots }: { pots: Pot[] }) {
  return (
    <div className="grid min-w-full grid-cols-3 gap-4">
      {pots.map((pot) => (
        <div className="bg-shade-100 flex flex-col gap-5 rounded-md px-6 py-4">
          <BoardHeader pot={pot} />

          <BoardBody pot={pot} />
        </div>
      ))}
    </div>
  );
}

export default PotBoard;
