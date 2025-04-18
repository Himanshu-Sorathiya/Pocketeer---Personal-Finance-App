import { Link } from "@tanstack/react-router";

import ErrorLayout from "../../layouts/ErrorLayout.tsx";

function ErrorPage() {
  return (
    <ErrorLayout>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold text-gray-900">
            Uh-oh! Something went wrong on your financial journey.
          </p>
          <p className="text-xl font-semibold text-gray-900">
            But don’t worry—Pocketeer is here to guide you back on track!
          </p>
        </div>

        <Link
          to="/"
          className="hover:bg-dark-background mt-6 cursor-pointer rounded bg-gray-800 px-8 py-3 font-semibold text-white transition-all duration-300"
        >
          Continue to Pocketeer
        </Link>
      </div>
    </ErrorLayout>
  );
}

export default ErrorPage;
