import { format } from "date-fns";

import { dateFormats } from "../../../utilities/dateUtils.ts";

function SummeryDetails({
  account_creation_date,
  last_sign_in_at,
  currency_symbol,
  currency_code,
  currency_emoji,
}: {
  account_creation_date: string;
  last_sign_in_at: string;
  currency_symbol: string;
  currency_code: string;
  currency_emoji: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <span className="text-xs">Account Created On</span>
        <span className="text-text font-medium">
          {account_creation_date &&
            format(
              account_creation_date,
              dateFormats[currency_code] ?? "dd/MM/yyyy",
            )}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-xs">Last Login</span>
        <span className="text-text font-medium">
          {format(last_sign_in_at, dateFormats[currency_code] ?? "dd/MM/yyyy")}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-xs">Currency</span>
        <span className="text-text font-medium">
          {currency_symbol} -{" "}
          <span className="font-emoji">{currency_emoji}</span>
        </span>
      </div>
    </div>
  );
}

export default SummeryDetails;
