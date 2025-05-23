import { useStore } from "@tanstack/react-store";

import { modalStore } from "../../../store/appModalStore.ts";

import { useCurrencyRates } from "../../../hooks/useCurrencyRates.ts";
import { useUser } from "../../auth/hooks/useUser.ts";
import { useUpdateProfile } from "../hooks/useUpdateProfile.ts";

import Button from "../../../components/buttons/Button.tsx";
import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";
import TooltipInfo from "../../../components/ui/Tooltip.tsx";

import { currencyOptions } from "../../../constants/currencyConfig.ts";

function CurrencyConversionModal() {
  const { user_id } = useUser();
  const { updateProfileStatus, updateProfile } = useUpdateProfile();
  const { rates } = useCurrencyRates();

  const { oldCurrency, updates } = useStore(modalStore, (s) => s.data);
  const oldSymbol = Object.values(currencyOptions).find(
    (c) => c.code === oldCurrency,
  )?.symbol;
  const newSymbol = Object.values(currencyOptions).find(
    (c) => c.code === updates.currency_code,
  )?.symbol;

  const conversionFactor = rates?.rates?.[updates.currency_code] ?? 1;

  function onConvert() {
    updateProfile({ user_id: user_id!, conversionFactor, updates });
  }

  function onOnlyChange() {
    updateProfile({ user_id: user_id!, conversionFactor: 1, updates });
  }

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {updateProfileStatus === "pending" && <FormSpinner />}

      <ModalHeader title="Currency Change Detected">
        <TooltipInfo
          id="info-circle"
          text1="Changing currency with value conversion may result in slight variations in amounts."
          className="text-primary size-5"
        />
      </ModalHeader>

      <ModalDescription
        description={
          <>
            It looks like you want to change your currency from{" "}
            <span className="text-primary font-medium">
              {oldCurrency} - {oldSymbol}
            </span>{" "}
            to{" "}
            <span className="text-primary font-medium">
              {updates.currency_code} - {newSymbol}
            </span>
            . Please select how you'd like to proceed:
          </>
        }
      />

      <div className="flex flex-col gap-2">
        <Button label="Change Currency & Convert Values" onClick={onConvert} />

        <Button
          label="Change Only Currency (No Conversion)"
          onClick={onOnlyChange}
        />
      </div>
    </div>
  );
}

export default CurrencyConversionModal;
