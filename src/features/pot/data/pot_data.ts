import type { Pot } from "../types/pot.types.ts";

function getPots(): Pot[] {
  return [
    {
      id: "111",
      name: "Vacation Fund",
      targetAmount: 5000,
      savedAmount: 5000,
      currency: "₹",
      theme: "#FF6B6B",
    },
    {
      id: "112",
      name: "Emergency Fund",
      targetAmount: 4000,
      savedAmount: 2500,
      currency: "₹",
      theme: "#4CAF50",
    },
    {
      id: "113",
      name: "New Car",
      targetAmount: 3000,
      savedAmount: 0,
      currency: "₹",
      theme: "#1E88E5",
    },
    {
      id: "114",
      name: "Home Renovation",
      targetAmount: 4500,
      savedAmount: 1000,
      currency: "₹",
      theme: "#FF9800",
    },
    {
      id: "115",
      name: "Gadgets Upgrade",
      targetAmount: 3500,
      savedAmount: 600,
      currency: "₹",
      theme: "#9C27B0",
    },
  ];
}

export { getPots };
