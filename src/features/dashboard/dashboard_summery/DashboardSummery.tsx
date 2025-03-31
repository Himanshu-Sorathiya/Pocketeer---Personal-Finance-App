import SummeryBudget from "./SummeryBudget.tsx";
import SummeryPot from "./SummeryPot.tsx";
import SummeryTransaction from "./SummeryTransactions.tsx";

function DashboardSummery() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <SummeryPot />

      <SummeryBudget />

      <SummeryTransaction />
    </div>
  );
}

export default DashboardSummery;
