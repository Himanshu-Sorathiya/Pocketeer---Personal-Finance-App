import { PotProvider } from "./context/PotContext.tsx";

import PotMain from "./PotMain.tsx";

import Header from "../../components/ui/Header.tsx";

function Pot() {
  return (
    <>
      <Header title="Pot">
        <button
          type="button"
          className="hover:bg-dark-background cursor-pointer rounded bg-gray-800 px-8 py-3 font-semibold text-white transition-all duration-300"
        >
          Action
        </button>
      </Header>

      <PotProvider>
        <PotMain />
      </PotProvider>
    </>
  );
}

export default Pot;
