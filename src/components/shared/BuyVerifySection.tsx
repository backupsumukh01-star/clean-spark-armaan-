"use client";

import { useConnection } from "wagmi";
import ConnectWallet from "./ConnectWallet";
import BuyActions from "./BuyActions";

export default function BuyVerifySection() {
  const { status } = useConnection();

  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-heading text-3xl font-semibold text-text mb-8 text-center">
          Buy & Verify Clan Spark
        </h2>

        {status !== "connected" ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-muted">
              Connect your wallet to buy and manage Clan Spark.
            </p>
            <ConnectWallet />
          </div>
        ) : (
          <BuyActions />
        )}
      </div>
    </section>
  );
}
