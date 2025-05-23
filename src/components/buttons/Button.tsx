function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      className="text-text w-full cursor-pointer rounded-md bg-gray-200 py-3 text-lg font-medium transition-all duration-150 hover:bg-gray-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
