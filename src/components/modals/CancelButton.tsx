function CancelButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="text-text w-full cursor-pointer rounded-md bg-gray-200 py-3 text-lg font-medium transition-all duration-150 hover:bg-gray-300"
    >
      {label}
    </button>
  );
}

export default CancelButton;
