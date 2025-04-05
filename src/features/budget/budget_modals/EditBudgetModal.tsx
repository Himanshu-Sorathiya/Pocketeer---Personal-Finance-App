import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import { budgetStore } from "../store/budgetStore.ts";

function EditBudgetModal({ budgetId }: any) {
  const budget = [...useStore(budgetStore, (s) => s.budgets)].find(
    (budget) => budget.id === budgetId,
  );

  const form = useForm({
    defaultValues: {
      category: budget?.category ?? "",
      targetAmount: budget?.targetAmount ?? 0,
      theme: budget?.theme ?? "",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Edit "
        {budget?.category
          .split("_")
          .map(
            (part) =>
              part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
          )
          .join(" & ")}
        " Budget
      </h1>

      <p className="text-text text-sm">
        Fine-tune your budgeting strategy by updating your limits. Keep your
        finances aligned with your evolving goals.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <form.Field
          name="targetAmount"
          children={(field) => {
            return (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-800"
                >
                  Maximum Spend
                </label>

                <input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  className={`rounded-md px-4 py-3 caret-black outline-1 transition-all duration-100 focus:text-gray-700 focus:outline-gray-500 ${
                    field.state.value !== 0
                      ? "text-gray-700 outline-gray-500"
                      : "text-gray-500 outline-gray-400"
                  }`}
                />
              </div>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-md bg-gray-800 py-3 text-lg font-medium text-white transition-all duration-150 hover:bg-gray-900"
                disabled={!canSubmit || isSubmitting}
              >
                Update Budget
              </button>
            </div>
          )}
        />
      </form>
    </div>
  );
}

export default EditBudgetModal;
