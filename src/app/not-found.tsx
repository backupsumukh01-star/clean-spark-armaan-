import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <h1 className="font-heading text-6xl font-bold text-text">404</h1>
      <p className="mt-4 text-muted">Page not found.</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary px-6 py-3 font-medium text-[#1c1810] shadow-sm transition hover:opacity-90"
      >
        Return Home
      </Link>
    </div>
  );
}
