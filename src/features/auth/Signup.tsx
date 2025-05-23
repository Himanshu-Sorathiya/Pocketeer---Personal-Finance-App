import { Link } from "@tanstack/react-router";

import { Route as loginRoute } from "../../routes/auth/signin.tsx";

import { useAppForm } from "../../hooks/useAppForm.ts";
import { useSignUp } from "./hooks/useSignUp.ts";

import FormSpinner from "../../components/loaders/FormSpinner.tsx";
import ModalHeader from "../../components/ui/ModalHeader.tsx";

function SignUp() {
  const { signUpStatus, signUpError, signUp } = useSignUp();

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const form = useAppForm({
    defaultValues,

    onSubmit: async ({ value }) => {
      signUp({
        name: value.name,
        email: value.email,
        password: value.password,
      });
    },
  });

  if (signUpError?.message) {
    form.reset();
  }

  return (
    <div className="w-full max-w-xl p-6">
      <div className="flex w-full min-w-lg flex-col gap-3 rounded-lg bg-white px-4 pt-5 pb-6 shadow-xl">
        {signUpStatus === "pending" && <FormSpinner />}

        <ModalHeader title={`Signup with Pocketeer`} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="mt-2 flex flex-col gap-4"
        >
          <form.AppField
            name="name"
            validators={{
              onChange: ({ value }) => {
                const errors: string[] = [];
                value = value.trim();

                value === "" && errors.push("Name is required");

                value.length > 30 &&
                  errors.push("Name must not exceed 30 characters");

                !/^[a-zA-Z\s]+$/.test(value) &&
                  errors.push("Name must only contain letters and spaces");

                /\s{2,}/.test(value) &&
                  errors.push("Name must not have multiple consecutive spaces");

                return errors.length === 0 ? undefined : errors;
              },
              onSubmit: ({ value }) => {
                const errors: string[] = [];
                value = value.trim();

                value === "" && errors.push("Name is required");

                value.length < 3 &&
                  errors.push("Name must be at least 3 characters long");

                value.length > 30 &&
                  errors.push("Name must not exceed 30 characters");

                !/^[a-zA-Z\s]+$/.test(value) &&
                  errors.push("Name must only contain letters and spaces");

                /\s{2,}/.test(value) &&
                  errors.push("Name must not have multiple consecutive spaces");

                return errors.length === 0 ? undefined : errors;
              },
            }}
            children={(field) => <field.NameField label="Name" />}
          />

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
            children={(field) => <field.PasswordField label="Password" />}
          />

          <div className="flex gap-3">
            <form.AppForm>
              <form.ResetButton />
            </form.AppForm>

            <form.AppForm>
              <form.SubmitButton label="Sign Up" />
            </form.AppForm>
          </div>
        </form>
      </div>

      <p className="mt-2 text-center text-sm">
        Already have an account?{" "}
        <Link to={loginRoute.to}>
          <span className="hover:text-primary cursor-pointer font-medium text-gray-700 underline transition-all duration-100">
            Login here
          </span>
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
