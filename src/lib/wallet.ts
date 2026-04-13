import { createConfig, http } from "wagmi";
import { bsc } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http("https://bsc-dataseed.binance.org"),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_WALLETCONNECT_PROJECT_ID",
      metadata: {
        name: "CleanSpark",
        description:
          "Bitcoin mining company — wallet connection for CLSK and on-chain tools.",
        url: "https://cleansparkcoin.com",
        icons: ["/logo.svg"],
      },
    }),
  ],
});
