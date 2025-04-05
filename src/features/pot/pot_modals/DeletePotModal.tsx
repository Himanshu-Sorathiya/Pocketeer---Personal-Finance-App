import { useStore } from "@tanstack/react-store";
import { potStore } from "../store/potStore.ts";

function DeletePotModal({ potId }: { potId: string }) {
  const pot = [...useStore(potStore, (s) => s.pots)].find(
    (pot) => pot.id === potId,
  );

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Delete "{pot?.name}" Pot?
      </h1>

      <p className="text-text text-sm">
        Decided to close this savings pot? Deleting it will remove all
        associated progress, so make sure it’s the right move for your journey
        with Pocketeer!
      </p>

      <div className="flex">
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-orange-600 py-3 text-lg font-medium text-white transition-all duration-150 hover:bg-orange-700"
        >
          Yes, Delete
        </button>
      </div>

      <div className="flex">
        <button
          type="submit"
          className="text-text w-full cursor-pointer rounded-md bg-gray-200 py-3 text-lg font-medium transition-all duration-150 hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeletePotModal;
