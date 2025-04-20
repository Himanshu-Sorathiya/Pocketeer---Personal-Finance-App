import type { Budget } from "../types/budget.types.ts";

function getBudgets(): Budget[] {
  return [
    {
      user_id: "e8c67e26-6d1e-4fd5-9a87-2bf852cb2c35",
      budgetId: "201",
      category: "entertainment",
      targetAmount: 4000,
      currency: "₹",
      theme: "velvet_rose",
      creationDate: "2025-02-01",
    },
    {
      user_id: "e8c67e26-6d1e-4fd5-9a87-2bf852cb2c35",
      budgetId: "202",
      category: "shopping",
      targetAmount: 5500,
      currency: "₹",
      theme: "orchid_purple",
      creationDate: "2025-01-15",
    },
    {
      user_id: "e8c67e26-6d1e-4fd5-9a87-2bf852cb2c35",
      budgetId: "203",
      category: "bills",
      targetAmount: 6000,
      currency: "₹",
      theme: "royal_indigo",
      creationDate: "2025-01-10",
    },
    {
      user_id: "e8c67e26-6d1e-4fd5-9a87-2bf852cb2c35",
      budgetId: "204",
      category: "food",
      targetAmount: 5000,
      currency: "₹",
      theme: "amber_blaze",
      creationDate: "2025-04-02",
    },
    {
      user_id: "e8c67e26-6d1e-4fd5-9a87-2bf852cb2c35",
      budgetId: "205",
      category: "health_fitness",
      targetAmount: 3500,
      currency: "₹",
      theme: "forest_emerald",
      creationDate: "2025-02-10",
    },
    {
      user_id: "e8c67e26-6d1e-4fd5-9a87-2bf852cb2c35",
      budgetId: "206",
      category: "transportation",
      targetAmount: 4000,
      currency: "₹",
      theme: "aqua_pulse",
      creationDate: "2025-02-05",
    },
    {
      user_id: "e8c67e26-6d1e-4fd5-9a87-2bf852cb2c35",
      budgetId: "207",
      category: "education",
      targetAmount: 6500,
      currency: "₹",
      theme: "pine_green",
      creationDate: "2025-01-12",
    },
  ];
}

export { getBudgets };
