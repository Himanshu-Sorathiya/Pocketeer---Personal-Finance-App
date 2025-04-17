import type {
  TransactionCategory,
  TransactionType,
} from "../../../constants/transactionConfig.ts";

type Transaction = {
  id: string;
  recipient: string;
  category: TransactionCategory;
  date: string;
  amount: number;
  currency: string;
  type: TransactionType;
};

export { type Transaction, type TransactionCategory, type TransactionType };
