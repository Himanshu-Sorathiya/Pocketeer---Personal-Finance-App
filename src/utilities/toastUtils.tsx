import { toast } from "react-toastify";

import Toast from "../components/ui/Toast.tsx";

function showToast(type = "success", message: string) {
  toast((toastProps) => (
    <Toast {...toastProps} message={message} type={type} />
  ));

  return null;
}

export { showToast };
