const appActions: Record<string, Record<string, string>> = {
  transaction: { edit: "modify", delete: "remove" },
  pot: { edit: "tend", delete: "prune" },
  budget: { edit: "refine", delete: "erase" },
} as const;

const sortOptions: Record<string, Record<string, string[]>> = {
  pot: {
    target: ["highest", "lowest"],
    progress: ["highest", "lowest"],
  },
  transaction: {
    date: ["latest", "oldest"],
    amount: ["highest", "lowest"],
  },
} as const;

const statusOptions: Record<string, string[]> = {
  status: ["all", "completed", "ongoing"],
} as const;

const typeOptions: Record<string, string[]> = {
  type: ["all", "income", "expense"],
} as const;

const categoryOptions: Record<string, string[]> = {
  category: [
    "all",
    "entertainment",
    "bills",
    "food",
    "transportation",
    "education",
    "shopping",
    "health_fitness",
    "savings",
    "investments",
    "debt_loans",
    "income",
    "taxes",
    "miscellaneous",
    "general",
  ],
} as const;

const themeColors: { name: string; hex: string }[] = [
  { name: "crimson_flame", hex: "#FF6B6B" },
  { name: "slate_grey", hex: "#546E7A" },
  { name: "forest_emerald", hex: "#4CAF50" },
  { name: "amber_blaze", hex: "#FF9800" },
  { name: "mocha_brown", hex: "#795548" },
  { name: "royal_indigo", hex: "#3F51B5" },
  { name: "velvet_rose", hex: "#E91E63" },
  { name: "orchid_purple", hex: "#9C27B0" },
  { name: "aqua_pulse", hex: "#00ACC1" },
  { name: "pine_green", hex: "#2E7D32" },
  { name: "skyline_blue", hex: "#1E88E5" },
  { name: "cherry_burst", hex: "#D32F2F" },
  { name: "sunfire_gold", hex: "#FFA000" },
  { name: "steel_mist", hex: "#607D8B" },
  { name: "platinum_ash", hex: "#B0B0B0" },
] as const;

export {
  appActions,
  categoryOptions,
  sortOptions,
  statusOptions,
  themeColors,
  typeOptions,
};
