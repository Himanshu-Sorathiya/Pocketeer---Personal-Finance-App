type CurrencyOption = {
  code: string;
  symbol: string;
  name: string;
  emoji: string;
};

const currencyOptions: Record<string, CurrencyOption> = {
  United_States: {
    code: "USD",
    symbol: "$",
    name: "United States Dollar",
    emoji: "🇺🇸",
  },
  Eurozone: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    emoji: "🇪🇺",
  },
  Japan: {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    emoji: "🇯🇵",
  },
  United_Kingdom: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    emoji: "🇬🇧",
  },
  Australia: {
    code: "AUD",
    symbol: "$",
    name: "Australian Dollar",
    emoji: "🇦🇺",
  },
  Canada: {
    code: "CAD",
    symbol: "$",
    name: "Canadian Dollar",
    emoji: "🇨🇦",
  },
  Switzerland: {
    code: "CHF",
    symbol: "CHF",
    name: "Swiss Franc",
    emoji: "🇨🇭",
  },
  China: {
    code: "CNY",
    symbol: "¥",
    name: "Chinese Yuan",
    emoji: "🇨🇳",
  },
  Sweden: {
    code: "SEK",
    symbol: "kr",
    name: "Swedish Krona",
    emoji: "🇸🇪",
  },
  New_Zealand: {
    code: "NZD",
    symbol: "$",
    name: "New Zealand Dollar",
    emoji: "🇳🇿",
  },
  South_Korea: {
    code: "KRW",
    symbol: "₩",
    name: "South Korean Won",
    emoji: "🇰🇷",
  },
  Singapore: {
    code: "SGD",
    symbol: "S$",
    name: "Singapore Dollar",
    emoji: "🇸🇬",
  },
  Norway: {
    code: "NOK",
    symbol: "kr",
    name: "Norwegian Krone",
    emoji: "🇳🇴",
  },
  Mexico: {
    code: "MXN",
    symbol: "$",
    name: "Mexican Peso",
    emoji: "🇲🇽",
  },
  India: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    emoji: "🇮🇳",
  },
  Russia: {
    code: "RUB",
    symbol: "₽",
    name: "Russian Rubles",
    emoji: "🇷🇺",
  },
  South_Africa: {
    code: "ZAR",
    symbol: "R",
    name: "South African Rand",
    emoji: "🇿🇦",
  },
  Brazil: {
    code: "BRL",
    symbol: "R$",
    name: "Brazilian Real",
    emoji: "🇧🇷",
  },
  Hong_Kong: {
    code: "HKD",
    symbol: "$",
    name: "Hong Kong Dollar",
    emoji: "🇭🇰",
  },
  Denmark: {
    code: "DKK",
    symbol: "kr",
    name: "Danish Krone",
    emoji: "🇩🇰",
  },
  United_Arab_Emirates: {
    code: "AED",
    symbol: "د.إ",
    name: "UAE Dirham",
    emoji: "🇦🇪",
  },
  Turkey: {
    code: "TRY",
    symbol: "₺",
    name: "Turkish Lira",
    emoji: "🇹🇷",
  },
  Saudi_Arabia: {
    code: "SAR",
    symbol: "ر.س",
    name: "Saudi Riyal",
    emoji: "🇸🇦",
  },
  Argentina: {
    code: "ARS",
    symbol: "$",
    name: "Argentine Peso",
    emoji: "🇦🇷",
  },
  Nigeria: {
    code: "NGN",
    symbol: "₦",
    name: "Nigerian Naira",
    emoji: "🇳🇬",
  },
  Philippines: {
    code: "PHP",
    symbol: "₱",
    name: "Philippine Peso",
    emoji: "🇵🇭",
  },
  Malaysia: {
    code: "MYR",
    symbol: "RM",
    name: "Malaysian Ringgit",
    emoji: "🇲🇾",
  },
  Vietnam: {
    code: "VND",
    symbol: "₫",
    name: "Vietnamese Dong",
    emoji: "🇻🇳",
  },
  Israel: {
    code: "ILS",
    symbol: "₪",
    name: "Israeli New Shekel",
    emoji: "🇮🇱",
  },
  Indonesia: {
    code: "IDR",
    symbol: "Rp",
    name: "Indonesian Rupiah",
    emoji: "🇮🇩",
  },
  Thailand: {
    code: "THB",
    symbol: "฿",
    name: "Thai Baht",
    emoji: "🇹🇭",
  },
  Egypt: {
    code: "EGP",
    symbol: "ج.م",
    name: "Egyptian Pound",
    emoji: "🇪🇬",
  },
};

export { currencyOptions };
