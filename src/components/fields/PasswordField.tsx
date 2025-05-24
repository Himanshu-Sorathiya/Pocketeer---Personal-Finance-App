import { useState } from "react";

import { useFieldContext } from "../../hooks/useAppForm.ts";

import ErrorTooltip from "../ui/ErrorTooltip.tsx";
import Icon from "../ui/Icon.tsx";

function PasswordField({ label }: { label: string }) {
  const field = useFieldContext<string>();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="password" className="text-sm font-medium text-gray-800">
        {label}
      </label>

      <div
        className={`flex w-full cursor-text items-center gap-2 rounded-md px-4 py-3 text-left caret-black transition-all duration-100 ${
          field.state.value
            ? "text-gray-700 outline-1 outline-gray-500"
            : "text-gray-500 outline-1 outline-gray-400"
        }`}
      >
        <input
          id={field.name}
          type={showPassword ? "text" : "password"}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className="h-full w-full bg-transparent outline-none"
        />

        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Icon id="eye-on" className="size-5 cursor-pointer" />
          ) : (
            <Icon id="eye-off" className="size-5 cursor-pointer" />
          )}{" "}
        </button>
      </div>

      {field.state.meta.isTouched && field.state.meta.errors && (
        <ErrorTooltip meta={field.state.meta} />
      )}
    </div>
  );
}

export default PasswordField;
