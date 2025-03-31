import { Route as PotRoute } from "../../../routes/app/pot.tsx";

import SummeryHeader from "../../../components/ui/SummeryHeader.tsx";

function SummeryPot() {
  return (
    <div className="bg-shade-100 rounded-md px-6 py-7">
      <SummeryHeader
        to={PotRoute.to}
        header="Pots"
        label="Dive In Pots"
        onClick={() => {}}
        headerClass="text-2xl"
      />
    </div>
  );
}

export default SummeryPot;
