import { Store } from "@tanstack/react-store";

import {
  getRandomColor,
  getRandomIcon,
} from "../transaction_helpers/transactionHelpers.ts";

type TransactionData = {
  iconPath: string;
  bgColor: string;
};

type TransactionState = Record<string, TransactionData>;

const transactionStore = new Store<TransactionState>({});

function getTransactionData(transactionId: string, category: string) {
  let storeData = transactionStore.state[transactionId];

  if (!storeData) {
    storeData = {
      iconPath: getRandomIcon(category),
      bgColor: getRandomColor(),
    };
    transactionStore.setState((prev) => ({
      ...prev,
      [transactionId]: storeData,
    }));
  }

  return storeData;
}

export { getTransactionData };
