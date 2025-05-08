import Icon from "./Icon.tsx";

export default function Header({
  title,
  handleOpenModal,
  children,
}: {
  title: string;
  handleOpenModal?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between pb-6">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>

      {children && (
        <div>
          <button
            type="button"
            onClick={handleOpenModal}
            className="flex cursor-pointer items-center gap-2 rounded bg-gray-800 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-gray-900"
          >
            <Icon id="create" className="size-5 stroke-3" />

            <span>{children}</span>
          </button>
        </div>
      )}
    </div>
  );
}
