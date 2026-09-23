import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex md:justify-center gap-6 items-center px-6 py-4 bg-background border-b border-secondary-highlight/20">
      <div className="hidden items-center justify-start md:flex">
        <Link
          href="/simulate"
          className="font-body text-sm font-medium hover:text-secondary-highlight transition-colors"
        >
          Simulate
        </Link>
      </div>

      <div className="flex justify-center">
        <Link
          href="/"
          className="font-hand text-lg md:text-4xl font-bold text-foreground hover:text-secondary-highlight transition-colors"
        >
          CPU Scheduler
        </Link>
      </div>

      <div className="flex flex-1 md:flex-none justify-end gap-6">
        <Link
          href="/compare"
          className="font-body text-sm font-medium hover:text-secondary-highlight transition-colors"
        >
          Compare
        </Link>
        <div className="md:hidden">
        <Link
          href="/simulate"
          className="font-body text-sm font-medium hover:text-secondary-highlight transition-colors"
        >
          Simulate
        </Link>
        </div>
      </div>
    </nav>
  );
}
