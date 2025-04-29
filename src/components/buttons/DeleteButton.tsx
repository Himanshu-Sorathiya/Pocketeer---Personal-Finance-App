function DeleteButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full cursor-pointer rounded-md bg-orange-600 py-3 text-lg font-medium text-white transition-all duration-150 hover:bg-orange-700"
    >
      {label}
    </button>
  );
}

export default DeleteButton;
