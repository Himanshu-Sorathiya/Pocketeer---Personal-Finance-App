import ListBody from "./ListBody.tsx";
import ListHeader from "./ListHeader.tsx";

function BudgetList({ selectedBudgetId }: { selectedBudgetId: string }) {
  return (
    <div className="bg-shade-100 flex flex-col gap-3 rounded-md px-6 py-4">
      <ListHeader selectedBudgetId={selectedBudgetId} />

      <ListBody selectedBudgetId={selectedBudgetId} />
    </div>
  );
}

export default BudgetList;
