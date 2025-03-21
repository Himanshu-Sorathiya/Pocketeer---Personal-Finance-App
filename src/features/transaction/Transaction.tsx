import TransactionMain from "./TransactionMain.tsx";

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

      <TransactionMain />
    </>
  );
}

export default Transaction;
