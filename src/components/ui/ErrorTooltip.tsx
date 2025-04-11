function ErrorTooltip({ errorMap }: { errorMap: any }) {
  console.log(errorMap);

  return (
    errorMap &&
    ((errorMap["onSubmit"] && errorMap["onSubmit"].length > 0) ||
      (errorMap["onChange"] && errorMap["onChange"].length > 0) ||
      (errorMap["onBlur"] && errorMap["onBlur"].length > 0)) && (
      <div className="bg-shade-100 text-text absolute top-20 left-1/2 z-10 w-96 -translate-x-1/2 rounded-md px-3 py-2 text-center text-sm font-medium whitespace-normal shadow-md">
        <p>
          {errorMap["onSubmit"]?.[0] ||
            errorMap["onChange"]?.[0] ||
            errorMap["onBlur"]?.[0]}
        </p>

        <div className="border-b-primary absolute -top-2 left-1/2 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent" />
      </div>
    )
  );
}

export default ErrorTooltip;
