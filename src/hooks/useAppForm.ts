import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import AmountField from "../components/modals/AmountField.tsx";
import CategoryField from "../components/modals/CategoryField.tsx";
import DateField from "../components/modals/DateField.tsx";
import NameField from "../components/modals/NameField.tsx";
import SubmitButton from "../components/modals/SubmitButton.tsx";
import ThemeField from "../components/modals/ThemeField.tsx";
import TypeField from "../components/modals/TypeField.tsx";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,

  fieldComponents: {
    AmountField,
    CategoryField,
    DateField,
    NameField,
    ThemeField,
    TypeField,
  },
  formComponents: { SubmitButton },
});

export { useAppForm, useFieldContext, useFormContext };
