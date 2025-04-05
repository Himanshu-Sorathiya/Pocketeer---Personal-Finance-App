import { useForm, useStore } from "@tanstack/react-form";
import { potStore } from "../store/potStore.ts";

function EditPotModal({ potId }: { potId: string }) {
  const pot = [...useStore(potStore, (s) => s.pots)].find(
    (pot) => pot.id === potId,
  );

  const form = useForm({
    defaultValues: {
      name: pot?.name ?? "New Pot Name",
      targetAmount: pot?.targetAmount ?? 0,
      theme: pot?.theme ?? "",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Edit "{pot?.name}" Pot
      </h1>

      <p className="text-text text-sm">
        Need to adjust your savings plan? Edit your pot to reflect your updated
        financial goals and keep moving forward with Pocketeer!
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <form.Field
          name="name"
          children={(field) => {
            return (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-800"
                >
                  Pot Name
                </label>

                <input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`rounded-md px-4 py-3 caret-black outline-1 transition-all duration-100 focus:text-gray-700 focus:outline-gray-500 ${
                    field.state.value !== ""
                      ? "text-gray-700 outline-gray-500"
                      : "text-gray-500 outline-gray-400"
                  }`}
                />
              </div>
            );
          }}
        />

        <form.Field
          name="targetAmount"
          children={(field) => {
            return (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-800"
                >
                  Target Amount
                </label>

                <input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(e.target.valueAsNumber || 0)
                  }
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
                Update Pot
              </button>
            </div>
          )}
        />
      </form>
    </div>
  );
}

export default EditPotModal;
