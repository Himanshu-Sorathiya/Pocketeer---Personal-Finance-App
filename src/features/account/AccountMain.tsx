import { useUser } from "../auth/hooks/useUser.ts";

import SummeryDetails from "./account_summery/SummeryDetails.tsx";
import SummeryInfo from "./account_summery/SummeryInfo.tsx";

function AccountMain() {
  const { user, currency_code, currency_symbol, currency_emoji } = useUser();

  return (
    <div className="grid grid-cols-[5fr_7fr] justify-items-center">
      <SummeryInfo email={user?.email!} name={user?.name!} />

      <SummeryDetails
        account_creation_date={user.account_creation_date ?? ""}
        last_sign_in_at={user.last_sign_in_at!}
        currency_symbol={currency_symbol!}
        currency_code={currency_code!}
        currency_emoji={currency_emoji!}
      />
    </div>
  );
}

export default AccountMain;
