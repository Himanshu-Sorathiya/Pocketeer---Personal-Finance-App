import { getBudgets as getBudgetsApi } from "./apiBudget.ts";
import { getPots as getPotsApi } from "./apiPot.ts";
import { getTransactions as getTransactionsApi } from "./apiTransaction.ts";

import { queryOptions } from "@tanstack/react-query";
import { user_id } from "../constants/user.ts";

const transactionQueryOptions = queryOptions({
  queryKey: ["transactions", user_id],
  queryFn: getTransactionsApi,
  staleTime: Infinity,
});

const budgetQueryOptions = queryOptions({
  queryKey: ["budgets", user_id],
  queryFn: getBudgetsApi,
  staleTime: Infinity,
});

const potQueryOptions = queryOptions({
  queryKey: ["pots", user_id],
  queryFn: getPotsApi,
  staleTime: Infinity,
});

export { budgetQueryOptions, potQueryOptions, transactionQueryOptions };
