import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 px-4">
      {/* Pinterest Logo */}
      <Image src="/logo.png" alt="Pinterest" width={80} height={80} />

      <h1 className="mt-6 text-5xl font-extrabold text-red-500">404</h1>
      <p className="mt-2 text-lg text-gray-600">
        Oops! The page you are looking for doesn’t exist.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-md bg-red-500 px-6 py-2 text-white transition hover:bg-red-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
