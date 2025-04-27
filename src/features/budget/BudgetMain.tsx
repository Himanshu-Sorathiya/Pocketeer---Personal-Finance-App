import { useData } from "../../contexts/DataContext.tsx";

import BudgetList from "./budget_list/BudgetList.tsx";
import BudgetPieChart from "./budget_pie_chart/BudgetPieChart.tsx";
import BudgetPlaceholder from "./budget_placeholder/BudgetPlaceholder.tsx";
import BudgetSummery from "./budget_summery/BudgetSummery.tsx";

function BudgetMain() {
  const { budgets, selectedBudgetId, setSelectedBudgetId } = useData();

  const shouldShowPlaceholder = budgets!.length === 0;

  return shouldShowPlaceholder ? (
    <BudgetPlaceholder />
  ) : (
    <div className="grid grid-cols-[5fr_7fr] items-start gap-10 whitespace-nowrap">
      <div className="bg-shade-100 flex flex-col gap-3 rounded-md px-6 pb-4">
        <BudgetPieChart />

        <BudgetSummery
          selectedBudgetId={selectedBudgetId}
          setSelectedBudgetId={setSelectedBudgetId}
        />
      </div>

      <BudgetList selectedBudgetId={selectedBudgetId} />
    </div>
  );
}

export default BudgetMain;
