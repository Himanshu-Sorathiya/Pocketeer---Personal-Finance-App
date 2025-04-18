import { Link } from "@tanstack/react-router";

import NotFoundLayout from "../../layouts/NotFoundLayout.tsx";

function NotFoundPage() {
  return (
    <NotFoundLayout>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-6xl font-extralight tracking-wide text-gray-900">
          404
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold text-gray-900">
            Oops! This path isn’t on your financial adventure map.
          </p>
          <p className="text-xl font-semibold text-gray-900">
            But don’t worry—your journey with Pocketeer is just a step away!
          </p>
        </div>

        <Link
          to="/"
          className="hover:bg-dark-background mt-6 cursor-pointer rounded bg-gray-800 px-8 py-3 font-semibold text-white transition-all duration-300"
        >
          Continue to Pocketeer
        </Link>
      </div>
    </NotFoundLayout>
  );
}

export default NotFoundPage;
