import { useFieldContext } from "../../hooks/useAppForm.ts";

import ErrorTooltip from "../ui/ErrorTooltip.tsx";

function PasswordField({
  label,
  showForgotPassword = false,
}: {
  label: string;
  showForgotPassword?: boolean;
}) {
  const field = useFieldContext<string>();

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="password" className="text-sm font-medium text-gray-800">
        {label}
      </label>

      <input
        type="password"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className={`rounded-md px-4 py-3 caret-black outline-1 transition-all duration-100 focus:text-gray-700 focus:outline-gray-500 ${
          field.state.value !== ""
            ? "text-gray-700 outline-gray-500"
            : "text-gray-500 outline-gray-400"
        }`}
      />

      {showForgotPassword && (
        <div className="self-end">
          <span className="hover:text-primary cursor-pointer text-right text-sm font-medium text-nowrap text-gray-700 underline transition-all duration-100">
            Forgot Password?
          </span>
        </div>
      )}

      {field.state.meta.isTouched && field.state.meta.errors && (
        <ErrorTooltip meta={field.state.meta} />
      )}
    </div>
  );
}

export default PasswordField;
