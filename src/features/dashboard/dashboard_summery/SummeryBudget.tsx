import { Route as BudgetRoute } from "../../../routes/app/budget.tsx";

import SummeryHeader from "../../../components/ui/SummeryHeader.tsx";

function SummeryBudget() {
  return (
    <div className="bg-shade-100 rounded-md px-6 py-7">
      <SummeryHeader
        to={BudgetRoute.to}
        header="Budgets"
        label="Dive In Budgets"
        onClick={() => {}}
        headerClass="text-2xl"
      />
    </div>
  );
}

export default SummeryBudget;
