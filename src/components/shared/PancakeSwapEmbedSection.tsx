import { CONTRACT_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL } from "@/lib/constants";

const PANCAKE_URL = `https://pancakeswap.finance/swap?chain=bsc&outputCurrency=${CONTRACT_ADDRESS}`;

export default function PancakeSwapEmbedSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2" | "h3";
}) {
  const HeadingTag = headingLevel;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <HeadingTag className="font-heading text-3xl md:text-4xl font-semibold text-text mb-4">
          Buy {TOKEN_SYMBOL} ({TOKEN_NAME}) on PancakeSwap
        </HeadingTag>
        <p className="mb-6 text-muted max-w-2xl">
          Use the embedded PancakeSwap widget below to swap BNB or stablecoins
          for {TOKEN_SYMBOL} on BNB Smart Chain without leaving this site.
        </p>

        <div className="mb-4 rounded-xl border border-border bg-card p-3 text-xs text-muted">
          Always double-check that the token address matches{" "}
          <span className="font-mono text-[11px] break-all">
            {CONTRACT_ADDRESS}
          </span>{" "}
          before confirming any trade.
        </div>

        <div className="relative mt-4 w-full overflow-hidden rounded-2xl border border-border bg-bg">
          <iframe
            src={PANCAKE_URL}
            title={`PancakeSwap - Swap ${TOKEN_SYMBOL}`}
            className="h-[720px] w-full"
            allow="clipboard-write; clipboard-read; web-share; fullscreen"
          />
        </div>

        <p className="mt-4 text-xs text-muted">
          If the widget does not load correctly, you can{" "}
          <a
            href={PANCAKE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            open PancakeSwap in a new tab
          </a>
          .
        </p>
      </div>
    </section>
  );
}

