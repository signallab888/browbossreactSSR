import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-4">
          404
        </p>
        <h1 className="text-4xl font-serif font-light mb-6 text-black">
          Page Not Found
        </h1>
        <div className="w-8 h-px bg-black mx-auto mb-6" />
        <Link
          href="/"
          className="text-[11px] tracking-[0.3em] uppercase text-zinc-500 hover:text-black transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
