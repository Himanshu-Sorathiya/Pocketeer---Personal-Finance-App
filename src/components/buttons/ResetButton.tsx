import { useFormContext } from "../../hooks/useAppForm.ts";

import Icon from "../ui/Icon.tsx";

function ResetButton() {
  const form = useFormContext();

  return (
    <button
      type="button"
      onClick={() => form.reset()}
      className="cursor-pointer rounded-md bg-gray-200 px-5 py-3 transition-all duration-150 hover:bg-gray-300"
    >
      <Icon id="reset" className="size-6" />
    </button>
  );
}

export default ResetButton;
