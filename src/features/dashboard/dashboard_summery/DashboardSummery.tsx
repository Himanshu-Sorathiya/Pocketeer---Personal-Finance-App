import SummeryBudget from "./SummeryBudget.tsx";
import SummeryPot from "./SummeryPot.tsx";
import SummeryTransaction from "./SummeryTransactions.tsx";

function DashboardSummery() {
  return (
    <div className="grid grid-cols-2 items-start gap-8">
      <SummeryPot />

      <SummeryTransaction />

      <SummeryBudget />
    </div>
  );
}

export default DashboardSummery;
