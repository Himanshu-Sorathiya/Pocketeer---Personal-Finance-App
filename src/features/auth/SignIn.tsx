import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";

import { Route as signupRoute } from "../../routes/auth/signup.tsx";

import ModalLayout from "../../layouts/ModalLayout.tsx";

import {
  closeModal,
  modalStore,
  openModal,
} from "../../store/appModalStore.ts";

import { useAppForm } from "../../hooks/useAppForm.ts";
import { useSignIn } from "./hooks/useSignIn.ts";

import ForgotPasswordModal from "./ForgotPasswordModal.tsx";

import FormSpinner from "../../components/loaders/FormSpinner.tsx";
import Icon from "../../components/ui/Icon.tsx";
import ModalHeader from "../../components/ui/ModalHeader.tsx";

function SignIn() {
  const id = useStore(modalStore, (s) => s.id);

  function handleOpenModal() {
    openModal("forgot_password");
  }

  function handleCloseModal() {
    closeModal();
  }

  const { signInStatus, signInError, signIn } = useSignIn();

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      signIn({
        email: value.email,
        password: value.password,
      });
    },
  });

  if (signInError?.message === "invalid_credentials") {
    form.reset();
  }

  return (
    <div className="w-full max-w-xl p-6">
      <div className="flex w-full min-w-lg flex-col gap-3 rounded-lg bg-white px-4 pt-5 pb-6 shadow-xl">
        {signInStatus === "pending" && <FormSpinner />}

        <ModalHeader title={`Signin to Pocketeer`} />

        {signInError?.message === "invalid_credentials" && (
          <div className="flex items-center gap-2">
            <Icon id="warning-triangle" className="size-10 text-red-500" />

            <p className="text-sm font-semibold text-gray-900">
              Whoops! It looks like those credentials don't quite match. Give it
              another shot and let’s get you back on track!
            </p>
          </div>
        )}

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
                    "Password must contain at least one inuppercase letter",
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
              <div className="flex flex-col gap-0.5">
                <field.PasswordField label="Password" />

                <span
                  onClick={handleOpenModal}
                  className="hover:text-primary cursor-pointer self-end text-sm font-medium text-nowrap text-gray-700 underline transition-all duration-100"
                >
                  Forgot Password?
                </span>
              </div>
            )}
          />

          <div className="flex gap-3">
            <form.AppForm>
              <form.ResetButton />
            </form.AppForm>

            <form.AppForm>
              <form.SubmitButton label="Sign In" />
            </form.AppForm>
          </div>
        </form>
      </div>

      <p className="mt-2 text-center text-sm">
        Don’t have an account?{" "}
        <Link to={signupRoute.to}>
          <span className="hover:text-primary cursor-pointer font-medium text-gray-700 underline transition-all duration-100">
            Register here
          </span>
        </Link>
      </p>

      {id && ["forgot_password"].includes(id) && (
        <ModalLayout onClose={handleCloseModal}>
          {id === "forgot_password" && <ForgotPasswordModal />}
        </ModalLayout>
      )}
    </div>
  );
}

export default SignIn;
