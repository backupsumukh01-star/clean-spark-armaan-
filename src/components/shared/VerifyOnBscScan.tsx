import { CONTRACT_ADDRESS } from "@/lib/constants";

export default function VerifyOnBscScan() {
  return (
    <a
      href={`https://bscscan.com/token/${CONTRACT_ADDRESS}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-text transition hover:bg-bg"
    >
      <span className="text-sm">Verify on BscScan</span>
      <span className="text-sm text-primary">↗</span>
    </a>
  );
}
