const appActions: Record<string, Record<string, string>> = {
  transaction: { edit: "modify", delete: "remove" },
  pot: { edit: "tend", delete: "prune" },
  budget: { edit: "refine", delete: "erase" },
};

export default appActions;
