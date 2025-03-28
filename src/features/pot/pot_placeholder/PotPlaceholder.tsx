import { useStore } from "@tanstack/react-store";

import { potStore } from "../store/potStore.ts";

function PotPlaceholder() {
  const searchedPot = useStore(potStore, (s) => s.searchedPot);
  const selectedStatus = useStore(potStore, (s) => s.selectedStatus);

  const hasSearch = searchedPot.trim() !== "";
  const hasStatus = selectedStatus.value !== "all";

  if (!hasSearch && !hasStatus)
    return (
      <div className="rounded-md bg-white py-4 text-center text-gray-500">
        <span>You haven't added any pots yet.</span>
      </div>
    );

  return (
    <div className="rounded-md bg-white py-4 text-center text-gray-500">
      No pots found
      {hasSearch && (
        <>
          {" for "}
          <span className="font-semibold text-gray-700">{searchedPot}</span>
          {" Pot"}
        </>
      )}
      {hasStatus && (
        <>
          {" with "}
          <span className="font-semibold text-gray-700">
            {selectedStatus.value
              .split("_")
              .map(
                (part) =>
                  part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
              )
              .join(" & ")}
          </span>
          {" Status"}
        </>
      )}
      {"."}
    </div>
  );
}

export default PotPlaceholder;
