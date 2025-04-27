import { getBudgets } from "./apiBudget.ts";
import { getPots } from "./apiPot.ts";
import { getTransactions } from "./apiTransaction.ts";

import { queryOptions } from "@tanstack/react-query";
import { user_id } from "../constants/user.ts";

const transactionQueryOptions = queryOptions({
  queryKey: ["transactions", user_id],
  queryFn: getTransactions,
  staleTime: Infinity,
});

const budgetQueryOptions = queryOptions({
  queryKey: ["budgets", user_id],
  queryFn: getBudgets,
  staleTime: Infinity,
});

const potQueryOptions = queryOptions({
  queryKey: ["pots", user_id],
  queryFn: getPots,
  staleTime: Infinity,
});

export { budgetQueryOptions, potQueryOptions, transactionQueryOptions };
