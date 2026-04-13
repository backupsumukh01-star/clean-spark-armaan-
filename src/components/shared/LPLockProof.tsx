import { CONTRACT_ADDRESS, LP_LOCK_ADDRESS } from "@/lib/constants";

const lockDiffersFromToken = LP_LOCK_ADDRESS.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase();

export default function LPLockProof() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h3 className="font-heading text-2xl font-semibold text-text mb-4">
          Liquidity Lock Proof
        </h3>

        <p className="mb-6 text-muted">
          Liquidity provider (LP) tokens are locked to ensure market stability
          and protect participants. Use the address below on BscScan to verify the
          lock contract (e.g. PinkLock, Team Finance, Unicrypt).
        </p>

        {!lockDiffersFromToken && (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-text">
            <strong>Setup note:</strong>{" "}
            <code className="font-mono text-xs">LP_LOCK_ADDRESS</code> currently
            matches the token contract in code. Replace it in{" "}
            <code className="font-mono text-xs">src/lib/constants.ts</code> with
            your real lock contract address when you have it.
          </p>
        )}

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 text-sm text-muted">Lock Contract</div>
          <div className="mb-4 font-medium text-text">
            PinkLock / Team Finance / Unicrypt
          </div>

          <div className="mb-2 text-sm text-muted">Lock Address</div>

          <a
            href={`https://bscscan.com/address/${LP_LOCK_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all font-mono text-xs text-primary hover:underline"
          >
            https://bscscan.com/address/{LP_LOCK_ADDRESS}
          </a>
        </div>

        <p className="mt-4 text-xs text-muted">
          LP lock details are publicly verifiable on the blockchain.
        </p>
      </div>
    </section>
  );
}
