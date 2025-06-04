import { format } from "date-fns";

import { useUser } from "../auth/hooks/useUser.ts";

import Icon from "../../components/ui/Icon.tsx";

import { dateFormats } from "../../utilities/dateUtils.ts";

function AccountMain() {
  const { user, currency_code, currency_symbol, currency_emoji } = useUser();

  return (
    <div className="grid grid-cols-[5fr_7fr] justify-items-center">
      <div className="flex flex-col items-center gap-1">
        <span className="text-3xl text-shadow-md">
          {user?.user_metadata.name}
        </span>
        <span className="text-shadow-md">{user?.email}</span>

        <div className="bg-text mt-4 size-auto rounded-full p-3 text-white">
          <Icon id="profile" className="size-60" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-xs">Account Created On</span>
          <span className="text-text font-medium">
            {format(
              user?.created_at!,
              dateFormats[currency_code!] ?? "dd/MM/yyyy",
            )}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs">Last Login</span>
          <span className="text-text font-medium">
            {format(
              user?.last_sign_in_at!,
              dateFormats[currency_code!] ?? "dd/MM/yyyy",
            )}
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
    </div>
  );
}

export default AccountMain;
