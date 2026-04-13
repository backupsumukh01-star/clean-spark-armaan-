import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/tokenomics", label: "Tokenomics" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/governance", label: "Governance" },
  { href: "/security", label: "Security" },
  { href: "/whitepaper", label: "Whitepaper" },
  { href: "/community", label: "Community" },
  { href: "/legal", label: "Legal" },
  { href: "/listing-checklist", label: "Listing" },
  { href: "/how-to-buy", label: "How to Buy" },
  { href: "/buy-on-pancakeswap", label: "Buy on PancakeSwap" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-heading text-lg font-semibold text-text">
              Clan Spark © 2026
            </p>
            <p className="mt-1 text-sm text-muted">
              Bitcoin mining & on-chain participation.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition hover:text-text"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
