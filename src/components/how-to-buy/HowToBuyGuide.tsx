"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTRACT_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL } from "@/lib/constants";

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
    };
  }
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="rounded-xl border border-border bg-card p-6">
      <div className="mb-2 text-sm text-primary">Step {n}</div>
      <h3 className="font-heading text-lg font-semibold text-text mb-2">
        {title}
      </h3>
      <div className="text-sm text-muted space-y-2">{children}</div>
    </li>
  );
}

function CopyContractButton() {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <button
      onClick={onCopy}
      className="inline-flex items-center rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-text hover:border-primary hover:text-primary transition"
    >
      {copied ? "Copied" : "Copy contract address"}
    </button>
  );
}

async function addTokenToMetaMask() {
  if (typeof window === "undefined" || !window.ethereum) {
    alert("MetaMask not detected. Please install MetaMask first.");
    return;
  }

  try {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: [
        {
          type: "ERC20",
          options: {
            address: CONTRACT_ADDRESS,
            symbol: TOKEN_SYMBOL,
            decimals: 18,
            image: "/logo.svg",
          },
        },
      ],
    });
  } catch {
    alert("Unable to add token. Please add it manually in MetaMask.");
  }
}

function AddTokenButton() {
  return (
    <button
      onClick={addTokenToMetaMask}
      className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-[#1c1810] hover:opacity-90 transition"
    >
      Add {TOKEN_NAME} ({TOKEN_SYMBOL}) to MetaMask
    </button>
  );
}

export default function HowToBuyGuide() {
  return (
    <section className="py-28 pb-24 md:pb-28">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="font-heading text-4xl font-semibold text-text mb-6">
          How to Buy {TOKEN_NAME} ({TOKEN_SYMBOL})
        </h1>

        <p className="mb-10 text-muted">
          Follow these simple steps to install MetaMask, fund your wallet with
          BNB or USDT, add the {TOKEN_SYMBOL} token, and swap in just a few clicks.
        </p>

        <ol className="space-y-8">
          <Step n="1" title="Install MetaMask wallet">
            <>
              <p>
                Install the MetaMask wallet on your phone or browser and create
                a new wallet (or import an existing one). Make sure you safely
                back up your seed phrase.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <Link
                  href="https://metamask.io/download/"
                  target="_blank"
                  className="rounded-lg bg-primary px-4 py-2 font-medium text-[#1c1810] hover:opacity-90 transition"
                >
                  Download MetaMask
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=io.metamask"
                  target="_blank"
                  className="rounded-lg border border-border px-4 py-2 font-medium text-text hover:border-primary hover:text-primary transition"
                >
                  MetaMask on Google Play
                </Link>
                <Link
                  href="https://apps.apple.com/app/metamask-blockchain-wallet/id1438144202"
                  target="_blank"
                  className="rounded-lg border border-border px-4 py-2 font-medium text-text hover:border-primary hover:text-primary transition"
                >
                  MetaMask on App Store
                </Link>
              </div>
            </>
          </Step>

          <Step n="2" title="Add BNB or USDT to MetaMask">
            <>
              <p>
                Buy BNB or USDT from a centralized exchange like Binance and
                withdraw it to your MetaMask BNB Smart Chain address. Make sure
                you select the BNB Smart Chain (BEP-20) network when
                withdrawing.
              </p>
              <p>
                Once the transaction is confirmed, you should see BNB or USDT in
                your MetaMask wallet on BNB Smart Chain.
              </p>
            </>
          </Step>

          <Step n="3" title={`Add the ${TOKEN_SYMBOL} token`}>
            <>
              <p>
                Add the official {TOKEN_NAME} contract to MetaMask so that your{" "}
                {TOKEN_SYMBOL}
                balance shows correctly.
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-bg px-4 py-2 text-xs font-mono text-text">
                  <span className="truncate">{CONTRACT_ADDRESS}</span>
                  <CopyContractButton />
                </div>
                <AddTokenButton />
              </div>
            </>
          </Step>

          <Step n="4" title={`Swap BNB or USDT for ${TOKEN_SYMBOL}`}>
            <>
              <p>
                Open PancakeSwap, connect your MetaMask wallet, and select BNB
                or USDT as the token you want to swap from. Paste the{" "}
                {TOKEN_NAME} contract address to load {TOKEN_SYMBOL} as the token
                you want to receive.
              </p>
              <p>
                Choose the amount you want to buy and confirm the swap. After
                the transaction is confirmed, your {TOKEN_SYMBOL} tokens will
                appear in your MetaMask wallet.
              </p>
            </>
          </Step>
        </ol>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-heading text-base font-semibold text-text mb-2">
              Video: How to buy USDT on Binance
            </h3>
            <p className="text-xs text-muted mb-3">
              Watch a simple tutorial on purchasing USDT on Binance and sending
              it to your MetaMask wallet.
            </p>
            <div className="aspect-video w-full rounded-lg bg-bg border border-dashed border-border flex items-center justify-center text-xs text-muted">
              Video tutorial will appear here.
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-heading text-base font-semibold text-text mb-2">
              Video: How to buy {TOKEN_SYMBOL}
            </h3>
            <p className="text-xs text-muted mb-3">
              Step-by-step walkthrough showing how to connect MetaMask and swap
              BNB or USDT for {TOKEN_SYMBOL}.
            </p>
            <div className="aspect-video w-full rounded-lg bg-bg border border-dashed border-border flex items-center justify-center text-xs text-muted">
              Video tutorial will appear here.
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-[#1c1810] transition hover:opacity-90"
          >
            Back to Home
          </Link>
          <Link
            href="/tokenomics"
            className="rounded-lg border border-border px-6 py-3 font-medium text-text transition hover:border-primary hover:text-primary"
          >
            View Tokenomics
          </Link>
        </div>

        <p className="mt-12 text-xs text-muted">
          CleanSpark does not provide financial advice. Always verify contract
          details before interacting and double-check you are using the correct
          contract address.
        </p>
      </div>
    </section>
  );
}

