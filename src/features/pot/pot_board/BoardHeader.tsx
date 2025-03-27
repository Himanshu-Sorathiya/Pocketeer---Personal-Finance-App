import BoardActions from "./BoardActions.tsx";

import type { Pot } from "../types/pot.types.ts";

function BoardHeader({ pot }: { pot: Pot }) {
  return (
    <div key={pot.id} className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div
          className="flex size-8 items-center justify-center rounded-full"
          style={{ backgroundColor: pot.theme }}
        >
          {pot.savedAmount === pot.targetAmount ? (
            <svg className="h-6 w-6">
              <use href="/src/assets/icons/ui_icons_sprite.svg#trophy" />
            </svg>
          ) : (
            <svg className="h-6 w-6">
              <use href="/src/assets/icons/ui_icons_sprite.svg#cube" />
            </svg>
          )}
        </div>

        <div className="text-lg font-medium text-gray-900">{pot.name}</div>
      </div>

      <BoardActions />
    </div>
  );
}

export default BoardHeader;
