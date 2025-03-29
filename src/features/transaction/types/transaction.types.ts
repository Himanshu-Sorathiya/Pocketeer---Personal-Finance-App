import type transactionCategories from "../../../constants/transactionCategory.ts";

type TransactionCategory = (typeof transactionCategories)[number];

type Transaction = {
  id: string;
  recipient: string;
  category: TransactionCategory;
  date: string;
  amount: number;
  currency: string;
};

export { type Transaction, type TransactionCategory };
