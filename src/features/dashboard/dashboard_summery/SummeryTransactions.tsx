import { Route as TransactionRoute } from "../../../routes/app/transaction.tsx";

import SummeryHeader from "../../../components/ui/SummeryHeader.tsx";

function SummeryTransaction() {
  return (
    <div className="bg-shade-100 rounded-md px-6 py-7">
      <SummeryHeader
        to={TransactionRoute.to}
        header="Transactions"
        label="Dive In Transactions"
        onClick={() => {}}
        headerClass="text-2xl"
      />
    </div>
  );
}

export default SummeryTransaction;
