"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Tokenomics", "/tokenomics"],
  ["Roadmap", "/roadmap"],
  ["Governance", "/governance"],
  ["Security", "/security"],
  ["Whitepaper", "/whitepaper"],
  ["Community", "/community"],
  ["Legal", "/legal"],
  ["Listing", "/listing-checklist"],
  ["How to Buy", "/how-to-buy"],
  ["Buy on PancakeSwap", "/buy-on-pancakeswap"],
];

export default function MenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur"
            aria-hidden
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 z-50 h-full w-full border-l border-border bg-bg sm:w-[360px]"
            role="dialog"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between border-b border-border p-6">
              <span className="font-heading text-lg">Menu</span>
              <button
                onClick={onClose}
                className="text-muted transition hover:text-text"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-4 p-6">
              {links.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="block text-lg text-muted transition hover:text-text"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
