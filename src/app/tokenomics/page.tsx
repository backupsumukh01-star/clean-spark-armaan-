import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import TokenomicsChart from "@/components/shared/TokenomicsChart";
import BuyVerifySection from "@/components/shared/BuyVerifySection";
import LPLockProof from "@/components/shared/LPLockProof";
import ContractInfo from "@/components/shared/ContractInfo";
import { CONTRACT_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL } from "@/lib/constants";

export const metadata: Metadata = {
  title: seo.tokenomics.title,
  description: seo.tokenomics.description,
};

export default function TokenomicsPage() {
  return (
    <div>
      <section className="border-b border-border py-24 bg-bg">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-heading text-4xl font-semibold text-text md:text-5xl">
            Tokenomics
          </h1>
          <p className="mt-6 text-muted">
            {TOKEN_SYMBOL} ({TOKEN_NAME}) aligns community participation with
            the Bitcoin mining and infrastructure roadmap — not as a claim on
            mining revenue unless formally disclosed.
          </p>
          <div className="mt-12">
            <TokenomicsChart />
          </div>
          <p className="mt-6 font-mono text-lg font-semibold text-text">
            Total supply: check{" "}
            <a
              href={`https://bscscan.com/token/${CONTRACT_ADDRESS}`}
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              BscScan
            </a>{" "}
            for live {TOKEN_SYMBOL} supply
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-center font-heading text-2xl font-semibold text-text">
            Tokenomics Principles
          </h2>
          <ul className="space-y-4 text-muted">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
              No inflation or future minting
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
              Team allocation subject to vesting
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
              Liquidity locked at launch
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
              Treasury managed transparently
            </li>
          </ul>
        </div>
      </section>

      <BuyVerifySection />

      <LPLockProof />

      <ContractInfo />
    </div>
  );
}
