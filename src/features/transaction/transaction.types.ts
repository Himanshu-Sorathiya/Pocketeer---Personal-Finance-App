interface SelectedOptions {
  type: string;
  value: string;
}

type TransactionCategory =
  | "entertainment"
  | "bills"
  | "food"
  | "transportation"
  | "education"
  | "shopping"
  | "health_fitness"
  | "savings"
  | "investments"
  | "debt_loans"
  | "income"
  | "taxes"
  | "miscellaneous"
  | "general";

type Transaction = {
  id: string;
  recipient: string;
  category: TransactionCategory;
  date: string;
  amount: number;
  currency: string;
};

export { type SelectedOptions, type Transaction };

