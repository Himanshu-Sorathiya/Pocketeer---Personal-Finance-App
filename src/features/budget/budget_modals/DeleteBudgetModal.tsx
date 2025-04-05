import { useStore } from "@tanstack/react-store";
import { budgetStore } from "../store/budgetStore.ts";

function DeleteBudgetModal({ budgetId }: any) {
  const budget = [...useStore(budgetStore, (s) => s.budgets)].find(
    (budget) => budget.id === budgetId,
  );

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Delete "
        {budget?.category
          .split("_")
          .map(
            (part) =>
              part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
          )
          .join(" & ")}
        " Budget?
      </h1>

      <p className="text-text text-sm">
        Ready to retire this budget? Deleting it will clear your set limits and
        tracking—make sure it fits your financial shift with Pocketeer!{" "}
      </p>

      <div className="flex">
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-orange-600 py-3 text-lg font-medium text-white transition-all duration-150 hover:bg-orange-700"
        >
          Yes, Delete
        </button>
      </div>

      <div className="flex">
        <button
          type="submit"
          className="text-text w-full cursor-pointer rounded-md bg-gray-200 py-3 text-lg font-medium transition-all duration-150 hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteBudgetModal;
