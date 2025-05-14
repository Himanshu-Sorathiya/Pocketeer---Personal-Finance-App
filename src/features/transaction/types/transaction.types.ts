import type {
  TransactionCategory,
  TransactionType,
} from "../../../constants/transactionConfig.ts";

type Transaction = {
  user_id: string;
  transactionId: string;
  recipient: string;
  category: TransactionCategory;
  amount: number;
  type: TransactionType;
  creationDate: string;
  creationTime: string;
};

export { type Transaction };
