import type { FilterState, Pot, SortingState } from "../types/pot.types.ts";

function isFuzzyMatch(searchTerm: string, potName: string): boolean {
  if (!searchTerm) return true;

  let searchIndex = 0;
  const cleanedPotName = potName.toLowerCase().replace(/[^a-z0-9]/g, "");

  for (const char of cleanedPotName) {
    if (char === searchTerm[searchIndex]) {
      searchIndex++;
      if (searchIndex === searchTerm.length) return true;
    }
  }

  return false;
}

function isStatusMatch(
  status: string,
  savedAmount: number,
  targetAmount: number,
): boolean {
  if (status === "all") return true;
  if (status === "completed") return savedAmount >= targetAmount;
  if (status === "ongoing") return savedAmount < targetAmount;

  return false;
}

function filterPots(pots: Pot[], filters: FilterState[]): Pot[] {
  const searchFilter =
    filters
      .find((f) => f.id === "search")
      ?.value.toLowerCase()
      .replace(/[^a-z0-9]/g, "") || "";
  const statusFilter = filters.find((f) => f.id === "status")?.value || "all";

  return pots.filter(
    (pot) =>
      isFuzzyMatch(searchFilter, pot.name) &&
      isStatusMatch(statusFilter, pot.savedAmount, pot.targetAmount),
  );
}

function sortPots(pots: Pot[], sorting: SortingState[]): Pot[] {
  const sortKey = sorting[0].id ?? "progress";
  const isDescending = sorting[0].desc ?? true;

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
