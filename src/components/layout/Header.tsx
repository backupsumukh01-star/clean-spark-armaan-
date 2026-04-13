"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ConnectWallet from "@/components/shared/ConnectWallet";
import MenuDrawer from "./MenuDrawer";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg text-text"
          >
            <Image
              src="/logo.svg"
              alt="Clan Spark"
              width={28}
              height={28}
              priority
              className="h-7 w-7"
            />
            Clan Spark
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg border border-border bg-card px-3 py-2 transition hover:bg-bg"
              aria-label="Open menu"
            >
              ☰
            </button>

            <ConnectWallet />
          </div>
        </div>
      </header>

      <MenuDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
