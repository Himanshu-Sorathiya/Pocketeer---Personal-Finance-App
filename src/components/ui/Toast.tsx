import { type ToastContentProps } from "react-toastify";

import Icon from "./Icon.tsx";

import CloseButton from "../buttons/CloseButton.tsx";

function Toast({
  closeToast,
  type,
  message,
}: ToastContentProps & { type?: string; message: string }) {
  return (
    <>
      <div className="grid grid-cols-[auto_1fr] items-center gap-2">
        {type === "error" && (
          <Icon
            id="error"
            className="size-8 rounded-full bg-red-100 p-1 text-red-500"
          />
        )}

        {type === "success" && (
          <Icon
            id="success"
            className="size-8 rounded-full bg-green-100 p-1 text-green-500"
          />
        )}

        {type === "warning" && (
          <Icon
            id="warning-triangle"
            className="size-8 rounded-full bg-orange-100 p-1 text-orange-500"
          />
        )}

        <span className="text-xs text-balance text-black">{message}</span>
      </div>

      <CloseButton onClick={closeToast} />
    </>
  );
}

export default Toast;
