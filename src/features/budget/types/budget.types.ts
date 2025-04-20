import type { Transaction } from "../../transaction/types/transaction.types.ts";

import type { TransactionCategory } from "../../../constants/transactionConfig.ts";

type Budget = {
  user_id: string;
  budgetId: string;
  category: TransactionCategory;
  targetAmount: number;
  currency: string;
  theme: string;
  creationDate: string;
};

type BudgetTransaction = Omit<Transaction, "category">;

export { type Budget, type BudgetTransaction };
