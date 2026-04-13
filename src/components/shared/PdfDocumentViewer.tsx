import Link from "next/link";

type PdfDocumentViewerProps = {
  eyebrow?: string;
  title: string;
  description: string;
  pdfPath: string;
  downloadLabel?: string;
  iframeTitle: string;
  /** Shown under the viewer — use for multi-page docs (Safari often needs “open in new tab”) */
  viewerHint?: string;
};

export default function PdfDocumentViewer({
  eyebrow = "PDF document",
  title,
  description,
  pdfPath,
  downloadLabel = "Download PDF",
  iframeTitle,
  viewerHint = "Multi-page PDF: scroll inside the preview, or use “Open in new tab” if your browser only shows the first page (common in Safari).",
}: PdfDocumentViewerProps) {
  const fileName = pdfPath.split("/").pop() ?? "document.pdf";
  // #toolbar=1 asks many Chrome-based viewers to show page controls (support varies by browser)
  const iframeSrc = `${pdfPath}#toolbar=1`;

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs font-medium uppercase tracking-wider text-primary">
        {eyebrow}
      </p>
      <h3 className="mt-2 font-heading text-2xl font-semibold text-text">
        {title}
      </h3>
      <p className="mt-3 max-w-3xl text-sm text-muted">{description}</p>

      {/* No overflow-hidden here — it breaks scrolling inside embedded PDF viewers */}
      <div className="mt-6 rounded-xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-3 rounded-t-xl border-b border-border bg-bg/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="truncate font-mono text-xs text-muted">{fileName}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={pdfPath}
              download={fileName}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-medium text-[#1c1810] shadow-sm transition hover:opacity-90"
            >
              {downloadLabel}
            </a>
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-4 py-2 text-xs font-medium text-text transition hover:border-primary"
            >
              Open in new tab
            </a>
          </div>
        </div>

        <p className="border-b border-border bg-amber-50/90 px-4 py-2 text-xs text-text">
          {viewerHint}
        </p>

        <div className="h-[min(85vh,900px)] min-h-[480px] w-full bg-[#e8e4dc]">
          <iframe
            src={iframeSrc}
            className="h-full w-full border-0"
            title={iframeTitle}
          />
        </div>

        <p className="rounded-b-xl border-t border-border bg-bg/50 px-4 py-3 text-xs text-muted">
          If the preview does not load, use{" "}
          <strong className="text-text">Open in new tab</strong> or{" "}
          <strong className="text-text">Download PDF</strong>. For the latest
          contract details, always verify on{" "}
          <Link
            href="https://bscscan.com"
            className="text-primary underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            BscScan
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
