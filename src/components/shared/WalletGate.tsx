"use client";

import { useConnection } from "wagmi";

export default function WalletGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useConnection();

  if (status !== "connected") return null;

  return <>{children}</>;
}
