import { useSignOut } from "./hooks/useSignOut.ts";

import Icon from "../../components/ui/Icon.tsx";

function SignOut() {
  const { signOut } = useSignOut();

  return (
    <button
      onClick={() => signOut()}
      className="flex w-full cursor-pointer items-center space-x-3 rounded-md p-3 transition-all duration-150 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-600"
    >
      <Icon id="signout" className="size-6" />

      <span>Sign Out</span>
    </button>
  );
}

export default SignOut;
