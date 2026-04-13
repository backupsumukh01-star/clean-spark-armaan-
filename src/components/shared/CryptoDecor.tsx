/** Decorative BTC / ETH–style marks for hero sections (original artwork, not official trademarks). */

function IconCoin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M4 6v4c0 1.7 3.6 3 8 3s8-1.3 8-3V6"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 10v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M12 9v6" />
      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M9.5 11.5h5" />
    </svg>
  );
}

function IconEth({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path        d="M12 3l6.5 10.5L12 14.2 5.5 13.5 12 3z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.5l6.3-1.2L12 21l-6.3-7.7L12 14.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChain({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="3"
        y="10"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="14"
        y="7"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M10 13.5h4M14 10.5v6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CryptoDecor() {
  return (
    <div
      className="mt-8 flex items-center justify-center gap-8 text-[#B8860B] opacity-90"
      aria-hidden
    >
      <IconCoin className="h-9 w-9" />
      <IconEth className="h-9 w-9" />
      <IconChain className="h-9 w-9" />
    </div>
  );
}
