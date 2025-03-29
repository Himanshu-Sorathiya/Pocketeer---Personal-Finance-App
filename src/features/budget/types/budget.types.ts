import type {
  Transaction,
  TransactionCategory,
} from "../../transaction/types/transaction.types.ts";

type Budget = {
  id: string;
  category: TransactionCategory;
  targetAmount: number;
  spentAmount: number;
  currency: string;
  theme: string;
};

type BudgetTransaction = Omit<Transaction, "category">;

export { type Budget, type BudgetTransaction };
