import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <div className="flex flex-col items-center justify-center">
        <span className="text-6xl font-bold mb-4">404</span>
        <h1 className="text-xl mb-6">Page not found</h1>
        <Link
          to="/"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
