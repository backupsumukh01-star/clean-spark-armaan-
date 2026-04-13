import PdfDocumentViewer from "@/components/shared/PdfDocumentViewer";
import { AUDIT_PDF_PATH } from "@/lib/constants";

export default function AuditEmbed() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-5xl px-6">
        <PdfDocumentViewer
          eyebrow="Security documentation"
          title="Security & audit summary"
          description="Extended multi-chapter report (30+ pages) covering engagement scope, mining infrastructure, custody, token controls, findings model, appendices, and continuous monitoring. Regenerate with npm run build:pdfs after editing scripts/generate-cleanspark-pdfs.mjs."
          pdfPath={AUDIT_PDF_PATH}
          downloadLabel="Download audit summary (PDF)"
          iframeTitle="CleanSpark security and audit summary PDF"
        />
      </div>
    </section>
  );
}
