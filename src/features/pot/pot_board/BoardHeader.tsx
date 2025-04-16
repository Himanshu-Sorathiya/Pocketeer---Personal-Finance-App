import { useStore } from "@tanstack/react-store";

import { potTransactionCacheStore } from "../../../store/appCacheStore.ts";

import { BoardActions } from "./BoardElements.tsx";

import type { Pot } from "../types/pot.types.ts";

import { themeColors } from "../../../constants/appOptions.ts";

function BoardHeader({ pot }: { pot: Pot }) {
  const savedAmount =
    useStore(potTransactionCacheStore).get(pot.id)?.amount ?? 0;

  return (
    <div key={pot.id} className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div
          className="flex size-8 items-center justify-center rounded-full"
          style={{
            backgroundColor: themeColors.find((c) => c.name === pot.theme)?.hex,
          }}
        >
          {savedAmount === pot.targetAmount ? (
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

      <BoardActions potId={pot.id} />
    </div>
  );
}

export default BoardHeader;
