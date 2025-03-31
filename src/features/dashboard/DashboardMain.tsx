import DashboardOverview from "./dashboard_overview/DashboardOverview.tsx";
import DashboardSummery from "./dashboard_summery/DashboardSummery.tsx";

function DashboardMain() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardOverview />

      <DashboardSummery />
    </div>
  );
}

export default DashboardMain;
