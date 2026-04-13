import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export const metadata: Metadata = {
  title: seo.governance.title,
  description: seo.governance.description,
};

export default function GovernanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
