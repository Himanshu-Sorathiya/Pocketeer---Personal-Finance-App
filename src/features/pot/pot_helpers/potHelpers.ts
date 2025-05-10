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

function getCompletionData(
  a: Pot,
  b: Pot,
  potTransactionCache: Map<string, { amount: number }>,
) {
  const savedA = potTransactionCache.get(a.potId)?.amount ?? 0;
  const savedB = potTransactionCache.get(b.potId)?.amount ?? 0;

  const isCompletedA = savedA >= a.targetAmount;
  const isCompletedB = savedB >= b.targetAmount;

  return { savedA, savedB, isCompletedA, isCompletedB };
}

function filterPots(
  pots: Pot[],
  filters: FilterState[],
  potTransactionCache: Map<string, { amount: number }>,
): Pot[] {
  const searchFilter =
    filters
      .find((f) => f.id === "search")
      ?.value.toLowerCase()
      .replace(/[^a-z0-9]/g, "") || "";

  const statusFilter = filters.find((f) => f.id === "status")?.value || "all";

  return pots.filter((pot) => {
    const savedAmount = potTransactionCache.get(pot.potId)?.amount ?? 0;

    return (
      isFuzzyMatch(searchFilter, pot.name) &&
      isStatusMatch(statusFilter, savedAmount, pot.targetAmount)
    );
  });
}

function sortPots(
  pots: Pot[],
  sorting: SortingState[],
  potTransactionCache: Map<string, { amount: number }>,
): Pot[] {
  const sortKey = sorting[0].id ?? "progress";

  const isDescending = sorting[0].desc ?? true;

  return pots.slice().sort((a, b) => {
    const { savedA, savedB, isCompletedA, isCompletedB } = getCompletionData(
      a,
      b,
      potTransactionCache,
    );

    if (isCompletedA !== isCompletedB) return isCompletedA ? 1 : -1;

    if (sortKey === "target") {
      return isDescending
        ? b.targetAmount - a.targetAmount
        : a.targetAmount - b.targetAmount;
    }

    if (sortKey === "progress") {
      return isDescending
        ? savedB / b.targetAmount - savedA / a.targetAmount
        : savedA / a.targetAmount - savedB / b.targetAmount;
    }

    return 0;
  });
}

export { filterPots, sortPots };
