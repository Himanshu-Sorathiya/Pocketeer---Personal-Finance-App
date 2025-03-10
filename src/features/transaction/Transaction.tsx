import TransactionTable from "./TransactionTable.tsx";

import Header from "../../components/ui/Header.tsx";

function Transaction() {
  return (
    <>
      <Header title="Transaction">
        <button
          type="button"
          className="hover:bg-dark-background cursor-pointer rounded bg-gray-800 px-8 py-3 font-semibold text-white transition-all duration-300"
        >
          Action
        </button>
      </Header>

      <div className="bg-shade-100 overflow-x-auto rounded-[20px] p-4">
        <TransactionTable />
      </div>
    </>
  );
}

export default Transaction;
