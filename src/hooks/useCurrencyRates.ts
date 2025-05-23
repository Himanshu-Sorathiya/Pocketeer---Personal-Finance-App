import { useQuery } from "@tanstack/react-query";

import {
  type CurrencyRates,
  getCurrencyRates,
} from "../services/apiCurrencyRates.ts";

import { useUser } from "../features/auth/hooks/useUser.ts";

function useCurrencyRates(): {
  rates: CurrencyRates | null;
  ratesStatus: "pending" | "error" | "success";
  ratesFetchStatus: "fetching" | "paused" | "idle";
  ratesError: Error | null;
} {
  const { currency_code } = useUser();

  const {
    data = null,
    status,
    fetchStatus,
    error,
  } = useQuery<CurrencyRates>({
    queryKey: ["currency-rates", currency_code],
    queryFn: () => getCurrencyRates(currency_code ?? ""),
  });

  return {
    rates: data,
    ratesStatus: status,
    ratesFetchStatus: fetchStatus,
    ratesError: error,
  };
}

export { useCurrencyRates };
