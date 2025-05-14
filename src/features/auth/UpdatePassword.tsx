import { Link } from "@tanstack/react-router";

import { Route as signinRoute } from "../../routes/auth/signin.tsx";

import { useAppForm } from "../../hooks/useAppForm.ts";
import { useUpdatePassword } from "./hooks/useUpdatePassword.ts";

import FormSpinner from "../../components/loaders/FormSpinner.tsx";
import ModalHeader from "../../components/ui/ModalHeader.tsx";

function UpdatePassword() {
  const { updatePasswordStatus, updatePasswordError, updatePassword } =
    useUpdatePassword();

  const defaultValues = {
    password: "",
    confirm_password: "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      updatePassword({ password: value.password });
    },
  });

  if (updatePasswordError?.message) {
    form.reset();
  }

  return (
    <div className="w-full max-w-xl p-6">
      <div className="flex w-full min-w-lg flex-col gap-3 rounded-lg bg-white px-4 pt-5 pb-6 shadow-xl">
        {updatePasswordStatus === "pending" && <FormSpinner />}

        <ModalHeader title={`Update Your Password`} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="mt-2 flex flex-col gap-4"
        >
          <form.AppField
            name="password"
            validators={{
              onChange: ({ value }) => {
                const errors: string[] = [];
                value = value.trim();

                !value && errors.push("Password is required");

                value.length > 20 &&
                  errors.push("Password must not exceed 20 characters");

                return errors.length === 0 ? undefined : errors;
              },
              onSubmit: ({ value }) => {
                const errors: string[] = [];
                value = value.trim();

                !value && errors.push("Password is required");

                value.length < 8 &&
                  errors.push("Password must be at least 8 characters");

                value.length > 20 &&
                  errors.push("Password must not exceed 20 characters");

                !/[A-Z]/.test(value) &&
                  errors.push(
                    "Password must contain at least one uppercase letter",
                  );

                !/[a-z]/.test(value) &&
                  errors.push(
                    "Password must contain at least one lowercase letter",
                  );

                !/[0-9]/.test(value) &&
                  errors.push("Password must contain at least one number");

                !/[!@#$%^&*(),.?":{}|<>]/.test(value) &&
                  errors.push(
                    "Password must contain at least one special character",
                  );

                return errors.length === 0 ? undefined : errors;
              },
            }}
            listeners={{
              onChange: () => form.setFieldValue("confirm_password", ""),
              onSubmit: () => {
                form.setFieldValue("confirm_password", "");
              },
            }}
            children={(field) => <field.PasswordField label="New Password" />}
          />

          <form.AppField
            name="confirm_password"
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) => {
                const errors: string[] = [];
                value = value.trim();

                value !== fieldApi.form.getFieldValue("password") &&
                  errors.push("Passwords don't match");

                !value && errors.push("Password is required");

                value.length > 20 &&
                  errors.push("Password must not exceed 20 characters");

                return errors.length === 0 ? undefined : errors;
              },
              onSubmit: ({ value, fieldApi }) => {
                const errors: string[] = [];
                value = value.trim();

                value !== fieldApi.form.getFieldValue("password") &&
                  errors.push("Passwords don't match");

                !value && errors.push("Password is required");

                value.length < 8 &&
                  errors.push("Password must be at least 8 characters");

                value.length > 20 &&
                  errors.push("Password must not exceed 20 characters");

                !/[A-Z]/.test(value) &&
                  errors.push(
                    "Password must contain at least one uppercase letter",
                  );

                !/[a-z]/.test(value) &&
                  errors.push(
                    "Password must contain at least one lowercase letter",
                  );

                !/[0-9]/.test(value) &&
                  errors.push("Password must contain at least one number");

                !/[!@#$%^&*(),.?":{}|<>]/.test(value) &&
                  errors.push(
                    "Password must contain at least one special character",
                  );

                return errors.length === 0 ? undefined : errors;
              },
            }}
            children={(field) => (
              <field.PasswordField label="Confirm Password" />
            )}
          />

          <div className="flex gap-3">
            <form.AppForm>
              <form.ResetButton />
            </form.AppForm>

            <form.AppForm>
              <form.SubmitButton label="Update Password" />
            </form.AppForm>
          </div>
        </form>
      </div>

      <p className="mt-2 text-center text-sm">
        Remembered your password?{" "}
        <Link to={signinRoute.to}>
          <span className="hover:text-primary cursor-pointer font-medium text-gray-700 underline transition-all duration-100">
            Login here
          </span>
        </Link>
      </p>
    </div>
  );
}

export default UpdatePassword;
