type CurrencyOption = {
  code: string;
  symbol: string;
  name: string;
  emoji: string;
};

const currencyOptions: Record<string, CurrencyOption> = {
  Australia: {
    code: "AUD",
    symbol: "$",
    name: "Australian Dollar",
    emoji: "🇦🇺",
  },
  Bulgaria: {
    code: "BGN",
    symbol: "лв",
    name: "Bulgarian Lev",
    emoji: "🇧🇬",
  },
  Brazil: {
    code: "BRL",
    symbol: "R$",
    name: "Brazilian Real",
    emoji: "🇧🇷",
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
  Czech_Republic: {
    code: "CZK",
    symbol: "Kč",
    name: "Czech Republic Koruna",
    emoji: "🇨🇿",
  },
  Denmark: {
    code: "DKK",
    symbol: "kr",
    name: "Danish Krone",
    emoji: "🇩🇰",
  },
  Eurozone: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    emoji: "🇪🇺",
  },
  United_Kingdom: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    emoji: "🇬🇧",
  },
  Hong_Kong: {
    code: "HKD",
    symbol: "$",
    name: "Hong Kong Dollar",
    emoji: "🇭🇰",
  },
  Hungary: {
    code: "HUF",
    symbol: "Ft",
    name: "Hungarian Forint",
    emoji: "🇭🇺",
  },
  Indonesia: {
    code: "IDR",
    symbol: "Rp",
    name: "Indonesian Rupiah",
    emoji: "🇮🇩",
  },
  Israel: {
    code: "ILS",
    symbol: "₪",
    name: "Israeli New Shekel",
    emoji: "🇮🇱",
  },
  India: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    emoji: "🇮🇳",
  },
  Iceland: {
    code: "ISK",
    symbol: "kr",
    name: "Icelandic Króna",
    emoji: "🇮🇸",
  },
  Japan: {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    emoji: "🇯🇵",
  },
  South_Korea: {
    code: "KRW",
    symbol: "₩",
    name: "South Korean Won",
    emoji: "🇰🇷",
  },
  Mexico: {
    code: "MXN",
    symbol: "$",
    name: "Mexican Peso",
    emoji: "🇲🇽",
  },
  Malaysia: {
    code: "MYR",
    symbol: "RM",
    name: "Malaysian Ringgit",
    emoji: "🇲🇾",
  },
  Norway: {
    code: "NOK",
    symbol: "kr",
    name: "Norwegian Krone",
    emoji: "🇳🇴",
  },
  New_Zealand: {
    code: "NZD",
    symbol: "$",
    name: "New Zealand Dollar",
    emoji: "🇳🇿",
  },
  Philippines: {
    code: "PHP",
    symbol: "₱",
    name: "Philippine Peso",
    emoji: "🇵🇭",
  },
  Poland: {
    code: "PLN",
    symbol: "zł",
    name: "Polish Zloty",
    emoji: "🇵🇱",
  },
  Romania: {
    code: "RON",
    symbol: "lei",
    name: "Romanian Leu",
    emoji: "🇷🇴",
  },
  Sweden: {
    code: "SEK",
    symbol: "kr",
    name: "Swedish Krona",
    emoji: "🇸🇪",
  },
  Singapore: {
    code: "SGD",
    symbol: "S$",
    name: "Singapore Dollar",
    emoji: "🇸🇬",
  },
  Thailand: {
    code: "THB",
    symbol: "฿",
    name: "Thai Baht",
    emoji: "🇹🇭",
  },
  Turkey: {
    code: "TRY",
    symbol: "₺",
    name: "Turkish Lira",
    emoji: "🇹🇷",
  },
  United_States: {
    code: "USD",
    symbol: "$",
    name: "United States Dollar",
    emoji: "🇺🇸",
  },
  South_Africa: {
    code: "ZAR",
    symbol: "R",
    name: "South African Rand",
    emoji: "🇿🇦",
  },
};

export { currencyOptions };
