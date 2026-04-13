import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exchange & Listing Compliance | Clan Spark",
  description:
    "Clan Spark compliance with CoinMarketCap and CoinGecko listing requirements.",
};

const checklist = [
  ["Official Website", "clansparkmining.com"],
  ["Public Contract Address", "Visible on site"],
  ["Blockchain Explorer", "BscScan"],
  ["Tokenomics Page", "Available"],
  ["Whitepaper", "Public"],
  ["Team Transparency", "Project documentation"],
  ["Liquidity Lock Proof", "Published"],
  ["Audit Status", "In progress / Completed"],
  ["Social Media", "Twitter, Telegram"],
  ["No Misleading Claims", "Confirmed"],
  ["No Guaranteed Returns", "Confirmed"],
  ["Brand Uniqueness", "Verified"],
];

export default function ListingChecklistPage() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="font-heading text-4xl font-semibold text-text mb-6">
          Exchange & Listing Compliance
        </h1>

        <p className="mb-10 max-w-3xl text-muted">
          This page outlines Clan Spark's compliance with CoinMarketCap and
          CoinGecko listing requirements. All information is publicly verifiable
          and maintained transparently.
        </p>

        <div className="grid gap-4">
          {checklist.map(([title, status]) => (
            <div
              key={title}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <span className="text-text">{title}</span>
              <span className="text-sm text-primary">{status}</span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted">
          This page is provided for verification purposes only and does not
          constitute investment advice.
        </p>
      </div>
    </section>
  );
}
