function Info({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-bg p-4">
      <div className="text-xs text-muted">{label}</div>
      <div
        className={`mt-1 ${
          mono ? "font-mono text-sm text-text" : "font-body text-text"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

import {
  CONTRACT_ADDRESS,
  TOKEN_NAME,
  TOKEN_SYMBOL,
} from "@/lib/constants";

export default function ContractInfo() {

  return (
    <section className="border-t border-border bg-card py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-heading text-3xl font-semibold text-text mb-8">
          Contract & Asset Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Info label="Token Name" value={TOKEN_NAME} />
          <Info label="Ticker" value={TOKEN_SYMBOL} />
          <Info label="Blockchain" value="BNB Smart Chain (BEP-20)" />
          <Info
            label="Total Supply"
            value={`See BscScan — ${TOKEN_SYMBOL}`}
          />
          <Info label="Verified contract" value="Yes — confirm on BscScan" />
          <Info
            label="Contract features"
            value="Read verified source on BscScan (e.g. admin/blacklist)"
          />
          <Info label="Decimals" value="18 (typical BEP-20 — confirm on chain)" />
          <Info label="Liquidity" value="Verify LP lock provider separately" />
          <Info label="Contract Address" value={CONTRACT_ADDRESS} mono />
        </div>

        <div className="mt-10 max-w-3xl text-sm text-muted">
          {TOKEN_SYMBOL} ({TOKEN_NAME}) is the verified BEP-20 on BNB Smart
          Chain. Always confirm the contract address above matches{" "}
          <a
            href={`https://bscscan.com/token/${CONTRACT_ADDRESS}`}
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            BscScan
          </a>{" "}
          before buying or adding the token to your wallet.
        </div>
      </div>
    </section>
  );
}
