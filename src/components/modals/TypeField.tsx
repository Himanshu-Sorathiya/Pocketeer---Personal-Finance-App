function TypeField({ field, label }: { field: any; label: string }) {
  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    field.handleChange(e.target.value);
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="name" className="text-sm font-medium text-gray-800">
        {label}
      </label>

      <div
        className={`font-space-grotesk flex items-center gap-4 rounded-md px-4 py-3 outline-1 transition-all duration-100 focus-within:text-gray-700 focus-within:outline-gray-500 ${
          field.state.value !== ""
            ? "text-gray-700 outline-gray-500"
            : "text-gray-500 outline-gray-400"
        }`}
      >
        <div className="flex items-center gap-1">
          <input
            className="checked:border-primary checked:bg-primary checked:hover:border-primary checked:ring-primary checked:hover:bg-primary checked:focus:border-primary checked:focus:bg-primary size-4 cursor-pointer appearance-none rounded-full border-2 border-gray-400 bg-white transition-colors checked:ring-2 checked:ring-offset-2 focus:outline-none focus-visible:outline-none"
            type="radio"
            value="expense"
            id="expense"
            name="type"
            checked={field.state.value === "expense"}
            onChange={handleTypeChange}
          />
          <label htmlFor="expense" className="cursor-pointer">
            Expense
          </label>
        </div>

        <div className="flex items-center gap-1">
          <input
            className="checked:border-primary checked:bg-primary checked:hover:border-primary checked:ring-primary checked:hover:bg-primary checked:focus:border-primary checked:focus:bg-primary size-4 cursor-pointer appearance-none rounded-full border-2 border-gray-400 bg-white transition-colors checked:ring-2 checked:ring-offset-2 focus:outline-none focus-visible:outline-none"
            type="radio"
            value="income"
            id="income"
            name="type"
            checked={field.state.value === "income"}
            onChange={handleTypeChange}
          />
          <label htmlFor="income" className="cursor-pointer">
            Income
          </label>
        </div>
      </div>
    </div>
  );
}

export default TypeField;
