import type { Budget } from "../types/budget.types.ts";

function getBudgets(): Budget[] {
  return [
    {
      id: "201",
      category: "entertainment",
      targetAmount: 2000,
      spentAmount: 1500,
      currency: "₹",
      theme: "#E91E63",
    },
    {
      id: "202",
      category: "shopping",
      targetAmount: 3500,
      spentAmount: 3500,
      currency: "₹",
      theme: "#9C27B0",
    },
    {
      id: "203",
      category: "bills",
      targetAmount: 5000,
      spentAmount: 3200,
      currency: "₹",
      theme: "#3F51B5",
    },
    {
      id: "204",
      category: "food",
      targetAmount: 3000,
      spentAmount: 1000,
      currency: "₹",
      theme: "#FF9800",
    },
    {
      id: "205",
      category: "health_fitness",
      targetAmount: 2500,
      spentAmount: 0,
      currency: "₹",
      theme: "#4CAF50",
    },
    {
      id: "206",
      category: "transportation",
      targetAmount: 4000,
      spentAmount: 2500,
      currency: "₹",
      theme: "#00ACC1",
    },
    {
      id: "207",
      category: "education",
      targetAmount: 4500,
      spentAmount: 3800,
      currency: "₹",
      theme: "#2E7D32",
    },
  ];
}

export { getBudgets };
