import { useFieldContext } from "../../hooks/useAppForm.ts";

import ErrorTooltip from "../ui/ErrorTooltip.tsx";

function AmountField({
  label,
  currency,
}: {
  label: string;
  currency: string | undefined;
}) {
  const field = useFieldContext<string>();

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="amount" className="text-sm font-medium text-gray-800">
        {label}
      </label>

      <div
        className={`font-space-grotesk flex items-center gap-1 rounded-md px-4 py-3 caret-black outline-1 transition-all duration-100 focus-within:text-gray-700 focus-within:outline-gray-500 ${
          field.state.value !== ""
            ? "text-gray-700 outline-gray-500"
            : "text-gray-500 outline-gray-400"
        }`}
      >
        <span>{currency}</span>

        <input
          id="amount"
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => {
            field.handleChange(e.target.value);
          }}
          placeholder="0.00"
          className={`w-full outline-0 focus:text-gray-700 focus:outline-gray-500 ${field.state.value !== "" ? "text-gray-700" : "text-gray-500"}`}
        />
      </div>

      {field.state.meta.isTouched && field.state.meta.errors && (
        <ErrorTooltip meta={field.state.meta} />
      )}
    </div>
  );
}

export default AmountField;
