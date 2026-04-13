import Link from "next/link";
import { CONTRACT_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL } from "@/lib/constants";

export default function TokenSnapshot() {
  return (
    <section className="border-b border-border py-24 bg-bg">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="font-heading text-3xl font-semibold text-text mb-6">
          Token Overview
        </h2>
        <ul className="space-y-2 text-muted">
          <li>Name: {TOKEN_NAME}</li>
          <li>Ticker: {TOKEN_SYMBOL}</li>
          <li>Chain: BNB Smart Chain</li>
          <li>Contract: {CONTRACT_ADDRESS}</li>
          <li>Total supply: verify on BscScan</li>
        </ul>
        <Link
          href="/tokenomics"
          className="mt-6 inline-flex items-center text-primary hover:underline"
        >
          View Full Tokenomics →
        </Link>
      </div>
    </section>
  );
}
