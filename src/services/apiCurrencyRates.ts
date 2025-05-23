interface CurrencyRates {
  base: string;
  rates: Record<string, number>;
}

async function getCurrencyRates(base: string) {
  const url = base
    ? `https://api.frankfurter.dev/v1/latest?base=${base}`
    : `https://api.frankfurter.dev/v1/latest`;

  const res = await fetch(url);

  const data = await res.json();

  const currency = {
    base: data.base,
    rates: data.rates,
  };

  return currency;
}

export { type CurrencyRates, getCurrencyRates };
