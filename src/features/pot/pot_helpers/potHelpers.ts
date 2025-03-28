import type { FilterState, Pot, SortingState } from "../types/pot.types.ts";

function filterPots(pots: Pot[], filters: FilterState[]): Pot[] {
  const searchFilter =
    filters.find((f) => f.id === "search")?.value.toLowerCase() || "";
  const statusFilter = filters.find((f) => f.id === "status")!.value || "all";

  return pots.filter(
    (pot) =>
      pot.name.toLowerCase().includes(searchFilter) &&
      (statusFilter === "all" ||
        (statusFilter === "completed" && pot.savedAmount >= pot.targetAmount) ||
        (statusFilter === "ongoing" && pot.savedAmount < pot.targetAmount)),
  );
}

function sortPots(pots: Pot[], sorting: SortingState[]): Pot[] {
  const sortKey = sorting[0].id || 'progress';
  const isDescending = sorting[0].desc || true;

  return pots.slice().sort((a, b) => {
    if (sortKey === "target") {
      return isDescending
        ? b.targetAmount - a.targetAmount
        : a.targetAmount - b.targetAmount;
    } else if (sortKey === "progress") {
      return isDescending
        ? b.savedAmount / b.targetAmount - a.savedAmount / a.targetAmount
        : a.savedAmount / a.targetAmount - b.savedAmount / b.targetAmount;
    }
    return 0;
  });
}

export { filterPots, sortPots };

