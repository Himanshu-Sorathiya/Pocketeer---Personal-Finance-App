import { useAppForm } from "../../../hooks/useAppForm.ts";
import { useCurrencyRates } from "../../../hooks/useCurrencyRates.ts";
import { useUser } from "../../auth/hooks/useUser.ts";
import { useUpdateProfile } from "../hooks/useUpdateProfile.ts";

import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import { currencyOptions } from "../../../constants/currencyConfig.ts";

function UpdateProfileModal() {
  const { currency_code, user_id } = useUser();
  const { updateProfileStatus, updateProfileError, updateProfile } =
    useUpdateProfile();
  const { rates } = useCurrencyRates();

  const defaultValues = {
    currency: currency_code ?? "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const updates: {
        currency_code: string;
        currency_symbol: string;
        currency_emoji: string;
      } = { currency_code: "", currency_symbol: "", currency_emoji: "" };

      const conversionFactor = rates?.rates?.[value.currency] ?? 1;

      if (value.currency !== defaultValues.currency) {
        updates.currency_code = value.currency;
        updates.currency_symbol = Object.values(currencyOptions).find(
          (c) => c.code === value.currency,
        )?.symbol!;
        updates.currency_emoji = Object.values(currencyOptions).find(
          (c) => c.code === value.currency,
        )?.emoji!;
      }

      updateProfile({ user_id: user_id!, conversionFactor, updates });
    },
  });

  if (updateProfileError?.message) {
    form.reset();
  }

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {updateProfileStatus === "pending" && <FormSpinner />}

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

        <div className="flex gap-3">
          <form.AppForm>
            <form.ResetButton />
          </form.AppForm>

          <form.AppForm>
            <form.SubmitButton label="Update Profile" />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfileModal;
