import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import WalletProviders from "./wallet-providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import CursorGlow from "@/components/shared/CursorGlow";
import ReducedMotionSync from "@/components/shared/ReducedMotionSync";
import SkipToContent from "@/components/shared/SkipToContent";
import WrongNetworkOverlay from "@/components/shared/WrongNetworkOverlay";
import MobileWalletBar from "@/components/shared/MobileWalletBar";
import { seo } from "@/lib/seo";

export const metadata: Metadata = {
  title: seo.home.title,
  description: seo.home.description,
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-bg text-text font-body overflow-x-hidden antialiased">
        <WalletProviders>
          <ReducedMotionSync />
          <SkipToContent />
          <CursorGlow />
          <AnimatedBackground />
          <WrongNetworkOverlay />
          <Header />
          <main id="main" className="pb-20 md:pb-0">
            <Providers>{children}</Providers>
          </main>
          <Footer />
          <MobileWalletBar />
        </WalletProviders>
      </body>
    </html>
  );
}
