import { useFormContext } from "../../hooks/useAppForm.ts";

function SubmitButton({ label }: { label: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        canSubmit: state.canSubmit,
      })}
    >
      {({ isSubmitting, canSubmit }) => (
        <button
          type="submit"
          className="w-full flex-1 cursor-pointer rounded-md bg-gray-800 py-3 text-lg font-medium text-white transition-all duration-150 hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-600"
          disabled={!canSubmit || isSubmitting}
        >
          {label}
        </button>
      )}
    </form.Subscribe>
  );
}

export default SubmitButton;
