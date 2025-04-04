import type {
  Transaction,
  TransactionCategory,
} from "../../transaction/types/transaction.types.ts";

type Budget = {
  id: string;
  category: TransactionCategory;
  targetAmount: number;
  currency: string;
  theme: string;
  creationDate: string;
};

type BudgetTransaction = Omit<Transaction, "category">;

export { type Budget, type BudgetTransaction };
