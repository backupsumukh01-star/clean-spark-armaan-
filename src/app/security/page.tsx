import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import TrustBadges from "@/components/shared/TrustBadges";
import AuditEmbed from "@/components/shared/AuditEmbed";
import LPLockProof from "@/components/shared/LPLockProof";
import ContractInfo from "@/components/shared/ContractInfo";

export const metadata: Metadata = {
  title: seo.security.title,
  description: seo.security.description,
};

export default function SecurityPage() {
  return (
    <div>
      <section className="py-24 bg-bg">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="font-heading text-4xl font-semibold text-text mb-6">
            Security & Transparency
          </h1>
          <p className="mb-8 text-muted">
            Clan Spark applies strong security practices to Bitcoin mining sites,
            custody workflows, and the public CLSK token contract.
          </p>
          <ul className="space-y-3 text-muted">
            <li>
              <strong className="text-text">Mining:</strong> access control,
              vendor diligence, and operational monitoring at hosted sites
            </li>
            <li>
              <strong className="text-text">Custody:</strong> segregation of hot
              vs cold flows and documented treasury procedures
            </li>
            <li>
              <strong className="text-text">CLSK token:</strong> fixed total
              supply, no mint functions, liquidity locked, BscScan verification
            </li>
            <li>
              <strong className="text-text">Disclosure:</strong> security &
              audit PDF below is regenerated from repo scripts for consistent
              branding
            </li>
          </ul>
        </div>
      </section>

      <TrustBadges />

      <AuditEmbed />

      <LPLockProof />

      <ContractInfo />
    </div>
  );
}
