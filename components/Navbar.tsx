"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `relative py-2 font-body text-sm font-medium transition-colors ${
      pathname === href
        ? "text-foreground after:absolute after:inset-x-0 after:-bottom-1 after:h-1 after:bg-secondary-highlight"
        : "text-foreground/65 hover:text-foreground"
    }`;

  return (
    <nav className="flex items-center justify-center gap-6 border-b-2 border-black/10 bg-background px-6 py-4 md:gap-8">
      <div className="hidden items-center justify-start md:flex">
        <Link
          href="/simulate"
          className={linkClass("/simulate")}
        >
          Simulate
        </Link>
      </div>

      <div className="flex justify-center">
        <Link
          href="/"
          className={`relative font-hand text-lg font-bold transition-colors hover:text-secondary-highlight md:text-4xl ${
            pathname === "/"
              ? "text-foreground after:absolute after:inset-x-0 after:-bottom-1 after:h-1 after:bg-secondary-highlight"
              : "text-foreground"
          }`}
        >
          CPU Scheduler
        </Link>
      </div>

      <div className="flex flex-1 justify-end gap-6 md:flex-none">
        <Link
          href="/compare"
          className={linkClass("/compare")}
        >
          Compare
        </Link>
        <div className="md:hidden">
          <Link href="/simulate" className={linkClass("/simulate")}>
            Simulate
          </Link>
        </div>
      </div>
    </nav>
  );
}
