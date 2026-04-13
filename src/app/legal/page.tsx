import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export const metadata: Metadata = {
  title: seo.legal.title,
  description: seo.legal.description,
};

export default function LegalPage() {
  return (
    <div>
      <section className="border-b border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold text-text md:text-5xl">
            Legal Notice
          </h1>
          <div className="mt-8 space-y-6 text-muted">
            <p className="leading-relaxed">
              Clan Spark is a Bitcoin mining and digital asset information project.
              Nothing on this website constitutes
              financial advice, investment advice, or a solicitation to invest.
              Participation in blockchain-based assets involves risk.
            </p>
            <p className="leading-relaxed">
              Users are responsible for complying with applicable laws and
              regulations in their jurisdiction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
