import type { Pot } from "../types/pot.types.ts";

function getPots(): Pot[] {
  return [
    {
      id: "111",
      name: "Vacation Fund",
      targetAmount: 5000,
      currency: "₹",
      theme: "crimson_flame",
      creationDate: "2024-04-01",
    },
    {
      id: "112",
      name: "Emergency Fund",
      targetAmount: 4000,
      currency: "₹",
      theme: "forest_emerald",
      creationDate: "2024-03-28",
    },
    {
      id: "113",
      name: "New Car",
      targetAmount: 3000,
      currency: "₹",
      theme: "skyline_blue",
      creationDate: "2024-03-25",
    },
    {
      id: "114",
      name: "Home Renovation",
      targetAmount: 4500,
      currency: "₹",
      theme: "amber_blaze",
      creationDate: "2024-04-02",
    },
    {
      id: "115",
      name: "Gadgets Upgrade",
      targetAmount: 3500,
      currency: "₹",
      theme: "orchid_purple",
      creationDate: "2024-03-30",
    },
  ];
}

export { getPots };
