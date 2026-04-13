import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export const metadata: Metadata = {
  title: seo.community.title,
  description: seo.community.description,
};

const links = [
  {
    title: "Telegram",
    desc: "Official Announcements",
    href: "#",
  },
  {
    title: "X (Twitter)",
    desc: "Updates & Insights",
    href: "#",
  },
  {
    title: "Discord",
    desc: "Discussions & Governance",
    href: "#",
  },
  {
    title: "Docs",
    desc: "Technical Documentation",
    href: "#",
  },
];

export default function CommunityPage() {
  return (
    <div>
      <section className="border-b border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-semibold text-text md:text-5xl">
            Join the Clan Spark Community
          </h1>
          <p className="mt-6 text-lg text-muted">
            Clan Spark is driven by a global community committed to transparency,
            discussion, and long-term growth.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {links.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="group flex flex-col rounded-xl border border-border bg-bg p-6 transition hover:border-primary"
              >
                <h2 className="font-heading text-xl font-semibold text-text group-hover:text-primary">
                  {link.title}
                </h2>
                <p className="mt-2 text-muted">{link.desc}</p>
                <span className="mt-4 text-sm text-primary group-hover:underline">
                  Join →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
