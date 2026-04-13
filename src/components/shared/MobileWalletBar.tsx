"use client";

import { useConnection } from "wagmi";
import ConnectWallet from "./ConnectWallet";

export default function MobileWalletBar() {
  const { status } = useConnection();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card p-3 md:hidden">
      {status === "connected" ? (
        <span className="block text-center text-sm text-muted">
          Wallet Connected
        </span>
      ) : (
        <div className="flex justify-center">
          <ConnectWallet />
        </div>
      )}
    </div>
  );
}
