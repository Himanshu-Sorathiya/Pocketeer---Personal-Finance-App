import Header from "../../components/ui/Header.tsx";

function Notification() {
  return (
    <div>
      <Header title="Notification">
        <button
          type="button"
          className="hover:bg-dark-background cursor-pointer rounded bg-gray-800 px-8 py-3 font-semibold text-white transition-all duration-300"
        >
          Action
        </button>
      </Header>
    </div>
  );
}

export default Notification;
