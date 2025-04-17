const transactionCategories: readonly string[] = [
  "entertainment",
  "bills",
  "food",
  "transportation",
  "education",
  "shopping",
  "health_fitness",
  "savings",
  "investments",
  "debt_loans",
  "income",
  "taxes",
  "miscellaneous",
  "general",
] as const;

type TransactionCategory = (typeof transactionCategories)[number];

const transactionTypes: readonly string[] = ["income", "expense"] as const;

type TransactionType = (typeof transactionTypes)[number];

const transactionIconsMap: Record<TransactionCategory, number> = {
  entertainment: 15,
  bills: 6,
  food: 39,
  transportation: 12,
  education: 6,
  shopping: 9,
  health_fitness: 6,
  savings: 11,
  investments: 7,
  debt_loans: 4,
  income: 5,
  taxes: 8,
  miscellaneous: 20,
  general: 22,
} as const;

export {
  type TransactionCategory,
  type TransactionType,
  transactionCategories,
  transactionIconsMap,
  transactionTypes,
};
