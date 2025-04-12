import { useFormContext } from "../../hooks/useAppForm.ts";

function ResetButton() {
  const form = useFormContext();

  return (
    <button
      type="button"
      onClick={() => {
        form.reset();
      }}
      className="cursor-pointer rounded-md bg-gray-200 px-5 py-3 transition-all duration-150 hover:bg-gray-300"
    >
      <svg className="size-6">
        <use href="/src/assets/icons/ui_icons_sprite.svg#reset"></use>
      </svg>
    </button>
  );
}

export default ResetButton;
