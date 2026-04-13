import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import PdfDocumentViewer from "@/components/shared/PdfDocumentViewer";
import { WHITEPAPER_PDF_PATH } from "@/lib/constants";

export const metadata: Metadata = {
  title: seo.whitepaper.title,
  description: seo.whitepaper.description,
};

export default function WhitepaperPage() {
  return (
    <div>
      <section className="border-b border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-semibold text-text md:text-5xl">
            CleanSpark Whitepaper
          </h1>
          <p className="mt-4 font-heading text-xl text-primary">
            Bitcoin mining & CLSK participation
          </p>
          <p className="mt-6 text-lg text-muted">
            Read the PDF below for strategy, risks, token role, and how mining
            operations relate to the CLSK token. Source text lives in{" "}
            <code className="rounded bg-card px-1.5 py-0.5 font-mono text-sm">
              scripts/generate-cleanspark-pdfs.mjs
            </code>{" "}
            — edit and run{" "}
            <code className="rounded bg-card px-1.5 py-0.5 font-mono text-sm">
              npm run build:pdfs
            </code>{" "}
            to refresh the file.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card px-6 py-16 md:py-20">
        <PdfDocumentViewer
          eyebrow="Whitepaper (PDF)"
          title="CleanSpark Whitepaper"
          description="Mining model, energy framing, CLSK token design, risk factors, and contact guidance — in a single downloadable PDF."
          pdfPath={WHITEPAPER_PDF_PATH}
          downloadLabel="Download whitepaper (PDF)"
          iframeTitle="CleanSpark whitepaper PDF"
        />
      </section>
    </div>
  );
}
