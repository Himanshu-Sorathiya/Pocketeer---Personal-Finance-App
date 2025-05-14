import { useAppForm } from "../../../hooks/useAppForm.ts";
import { useUser } from "../../auth/hooks/useUser.ts";

import ModalHeader from "../../../components/ui/ModalHeader.tsx";

function UpdateProfileModal() {
  const { currency_code } = useUser();

  const defaultValues = {
    currency: currency_code ?? "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {},
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <ModalHeader title={`Update Profile`} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="mt-2 flex flex-col gap-4"
      >
        <form.AppField
          name="currency"
          validators={{
            onChange: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Currency is required");

              return errors.length === 0 ? undefined : errors;
            },
            onSubmit: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Currency is required");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => <field.CurrencyField />}
        />
      </form>

      <div className="flex gap-3">
        <form.AppForm>
          <form.ResetButton />
        </form.AppForm>

        <form.AppForm>
          <form.SubmitButton label="Update Profile" />
        </form.AppForm>
      </div>
    </div>
  );
}

export default UpdateProfileModal;
