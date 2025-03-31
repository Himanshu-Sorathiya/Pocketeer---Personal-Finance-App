function OverviewBalance({
  label,
  amount,
  currency,
  className,
}: {
  label: string;
  amount: number;
  currency: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 rounded-md p-5 ${className}`}>
      <span className="text-sm">{label}</span>

      <span className="font-space-grotesk text-5xl font-semibold">
        {currency}
        {amount.toFixed(2)}
      </span>
    </div>
  );
}

export default OverviewBalance;
