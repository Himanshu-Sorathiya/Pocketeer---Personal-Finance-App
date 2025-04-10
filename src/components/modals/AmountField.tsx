function AmountField({
  field,
  label,
  currency,
  onChange,
}: {
  field: any;
  label: string;
  currency: string;
  onChange?: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="name" className="text-sm font-medium text-gray-800">
        {label}
      </label>

      <div
        className={`font-space-grotesk flex items-center gap-1 rounded-md px-4 py-3 caret-black outline-1 transition-all duration-100 focus-within:text-gray-700 focus-within:outline-gray-500 ${
          field.state.value !== 0
            ? "text-gray-700 outline-gray-500"
            : "text-gray-500 outline-gray-400"
        }`}
      >
        <span>{currency}</span>

        <input
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => {
            field.handleChange(+e.target.value || field.state.value);

            if (typeof onChange === "function") onChange(+e.target.value);
          }}
          className={`w-full outline-0 focus:text-gray-700 focus:outline-gray-500 ${field.state.value !== 0 ? "text-gray-700" : "text-gray-500"}`}
        />
      </div>
    </div>
  );
}

export default AmountField;
