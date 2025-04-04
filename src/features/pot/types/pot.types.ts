type FilterState = {
  id: string;
  value: string;
};

type SortingState = {
  id: string;
  desc: boolean;
};

type Pot = {
  id: string;
  name: string;
  targetAmount: number;
  currency: string;
  theme: string;
  creationDate: string;
};

export { type FilterState, type Pot, type SortingState };
