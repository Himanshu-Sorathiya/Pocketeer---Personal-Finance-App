type FilterState = {
  id: "search" | "status";
  value: string;
};

type Pot = {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  currency: string;
  theme: string;
};

export { type FilterState, type Pot };
