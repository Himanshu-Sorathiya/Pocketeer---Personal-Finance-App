import type { Budget } from "../types/budget.types.ts";

function getBudgets(): Budget[] {
  return [
    {
      id: "201",
      category: "entertainment",
      targetAmount: 4000,
      currency: "₹",
      theme: "#E91E63",
      creationDate: "2025-02-01",
    },
    {
      id: "202",
      category: "shopping",
      targetAmount: 5500,
      currency: "₹",
      theme: "#9C27B0",
      creationDate: "2025-01-15",
    },
    {
      id: "203",
      category: "bills",
      targetAmount: 6000,
      currency: "₹",
      theme: "#3F51B5",
      creationDate: "2025-01-10",
    },
    {
      id: "204",
      category: "food",
      targetAmount: 5000,
      currency: "₹",
      theme: "#FF9800",
      creationDate: "2025-04-02",
    },
    {
      id: "205",
      category: "health_fitness",
      targetAmount: 3500,
      currency: "₹",
      theme: "#4CAF50",
      creationDate: "2025-02-10",
    },
    {
      id: "206",
      category: "transportation",
      targetAmount: 4000,
      currency: "₹",
      theme: "#00ACC1",
      creationDate: "2025-02-05",
    },
    {
      id: "207",
      category: "education",
      targetAmount: 6500,
      currency: "₹",
      theme: "#2E7D32",
      creationDate: "2025-01-12",
    },
  ];
}

export { getBudgets };
