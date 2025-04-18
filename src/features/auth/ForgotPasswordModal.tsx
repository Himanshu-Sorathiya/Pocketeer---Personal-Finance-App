import { useAppForm } from "../../hooks/useAppForm.ts";

import ModalHeader from "../../components/ui/ModalHeader.tsx";

function ForgotPasswordModal() {
  const form = useAppForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async (values) => {
      console.log("from", values);
    },
  });

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <ModalHeader title={`Reset Password`} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
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
            <form.SubmitButton label="Reset" />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordModal;
