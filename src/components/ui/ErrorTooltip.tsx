import type { AnyFieldMeta } from "@tanstack/react-form";

function ErrorTooltip({ meta }: { meta: AnyFieldMeta }) {
  if (!meta.isTouched || !meta.errors.length) return null;

  return (
    <div className="bg-shade-100 text-text absolute top-20 left-1/2 z-10 w-96 -translate-x-1/2 rounded-md px-3 py-2 text-center text-sm font-medium whitespace-normal shadow-md">
      <p className="text-sm font-medium">{meta.errors?.[0]}</p>

      <div className="border-b-primary absolute -top-2 left-1/2 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent" />
    </div>
  );
}

export default ErrorTooltip;
