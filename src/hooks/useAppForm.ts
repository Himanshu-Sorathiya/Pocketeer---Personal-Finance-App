import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import ResetButton from "../components/buttons/ResetButton.tsx";
import SubmitButton from "../components/buttons/SubmitButton.tsx";
import AmountField from "../components/fields/AmountField.tsx";
import CategoryField from "../components/fields/CategoryField.tsx";
import DateField from "../components/fields/DateField.tsx";
import EmailField from "../components/fields/EmailField.tsx";
import NameField from "../components/fields/NameField.tsx";
import PasswordField from "../components/fields/PasswordField.tsx";
import ThemeField from "../components/fields/ThemeField.tsx";
import TypeField from "../components/fields/TypeField.tsx";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,

  fieldComponents: {
    AmountField,
    CategoryField,
    DateField,
    EmailField,
    NameField,
    PasswordField,
    ThemeField,
    TypeField,
  },
  formComponents: { ResetButton, SubmitButton },
});

export { useAppForm, useFieldContext, useFormContext };
