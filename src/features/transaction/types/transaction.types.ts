import type transactionCategories from "../../../constants/transactionCategory.ts";
import type transactionTypes from "../../../constants/transactionType.ts";

type TransactionCategory = (typeof transactionCategories)[number];

type TransactionType = (typeof transactionTypes)[number];

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
