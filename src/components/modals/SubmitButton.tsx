function SubmitButton({
  canSubmit,
  isSubmitting,
  label,
}: {
  canSubmit: boolean;
  isSubmitting: boolean;
  label: string;
}) {
  return (
    <div className="flex">
      <button
        type="submit"
        className="w-full cursor-pointer rounded-md bg-gray-800 py-3 text-lg font-medium text-white transition-all duration-150 hover:bg-gray-900"
        disabled={!canSubmit || isSubmitting}
      >
        {label}
      </button>
    </div>
  );
}

export default SubmitButton;
