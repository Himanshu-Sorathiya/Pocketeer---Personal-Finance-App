import { useAppForm } from "../../hooks/useAppForm.ts";
import { useSendPasswordResetEmail } from "./hooks/useSendPasswordResetEmail.tsx";

import FormSpinner from "../../components/loaders/FormSpinner.tsx";
import ModalHeader from "../../components/ui/ModalHeader.tsx";

function ForgotPasswordModal() {
  const {
    sendPasswordResetEmailStatus,
    sendPasswordResetEmailError,
    sendPasswordResetEmail,
  } = useSendPasswordResetEmail();

  const defaultValues = {
    email: "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      sendPasswordResetEmail({ email: value.email });
    },
  });

  if (sendPasswordResetEmailError?.message) {
    form.reset();
  }

  return (
    <>
      {sendPasswordResetEmailStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Update Your Password`} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="mt-2 flex flex-col gap-4"
      >
        <form.AppField
          name="email"
          validators={{
            onChange: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Email is required");

              return errors.length === 0 ? undefined : errors;
            },
            onSubmit: ({ value }) => {
              const errors: string[] = [];
              value = value.trim();

              !value && errors.push("Email is required");

              !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) &&
                errors.push("Enter a valid email");

              return errors.length === 0 ? undefined : errors;
            },
          }}
          children={(field) => <field.EmailField label="Email" />}
        />

        <div className="flex gap-3">
          <form.AppForm>
            <form.ResetButton />
          </form.AppForm>

          <form.AppForm>
            <form.SubmitButton label="Send Password Reset Email" />
          </form.AppForm>
        </div>
      </form>
    </>
  );
}

export default ForgotPasswordModal;
