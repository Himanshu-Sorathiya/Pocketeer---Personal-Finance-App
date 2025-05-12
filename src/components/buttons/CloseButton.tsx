import Icon from "../ui/Icon.tsx";

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:bg-shade-95 absolute top-4 right-4 size-8 cursor-pointer rounded-full p-1 transition-all duration-75"
    >
      <Icon id="close" className="size-6 text-black" />
    </button>
  );
}

export default CloseButton;
