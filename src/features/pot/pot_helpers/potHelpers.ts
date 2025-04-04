import type { Transaction } from "../../transaction/types/transaction.types.ts";
import type { FilterState, Pot, SortingState } from "../types/pot.types.ts";

function filterTransactionsByPot(
  potName: string,
  creationDate: string,
  transactions: Transaction[],
): Transaction[] {
  const potDate = new Date(creationDate);

  return transactions.filter(
    (t) =>
      t.type === "income" &&
      new Date(t.date) >= potDate &&
      t.recipient.trim() === potName.trim(),
  );
}

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

function filterPots(
  pots: Pot[],
  filters: FilterState[],
  transactions: Transaction[],
): Pot[] {
  const searchFilter =
    filters
      .find((f) => f.id === "search")
      ?.value.toLowerCase()
      .replace(/[^a-z0-9]/g, "") || "";
  const statusFilter = filters.find((f) => f.id === "status")?.value || "all";

  return pots.filter((pot) => {
    const savedAmount = filterTransactionsByPot(
      pot.name,
      pot.creationDate,
      transactions,
    ).reduce((sum, t) => sum + t.amount, 0);

    return (
      isFuzzyMatch(searchFilter, pot.name) &&
      isStatusMatch(statusFilter, savedAmount, pot.targetAmount)
    );
  });
}

function sortPots(
  pots: Pot[],
  sorting: SortingState[],
  transactions: Transaction[],
): Pot[] {
  const sortKey = sorting[0].id ?? "progress";
  const isDescending = sorting[0].desc ?? true;

  return pots.slice().sort((a, b) => {
    if (sortKey === "target") {
      return isDescending
        ? b.targetAmount - a.targetAmount
        : a.targetAmount - b.targetAmount;
    } else if (sortKey === "progress") {
      const savedA = filterTransactionsByPot(
        a.name,
        a.creationDate,
        transactions,
      ).reduce((sum, t) => sum + t.amount, 0);
      const savedB = filterTransactionsByPot(
        b.name,
        b.creationDate,
        transactions,
      ).reduce((sum, t) => sum + t.amount, 0);

      return isDescending
        ? savedB / b.targetAmount - savedA / a.targetAmount
        : savedA / a.targetAmount - savedB / b.targetAmount;
    }

    return 0;
  });
}

export { filterPots, filterTransactionsByPot, sortPots };
