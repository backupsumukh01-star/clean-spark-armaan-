import ScrollReveal from "@/components/shared/ScrollReveal";

const steps = [
  {
    title: "Foundation",
    desc: "Core mining playbook, hosting partners, and first deployed hashrate online.",
  },
  {
    title: "Scale",
    desc: "ASIC fleet expansion, site redundancy, and disciplined power procurement.",
  },
  {
    title: "Optimize",
    desc: "Efficiency programs: cooling, firmware, and joules-per-terahash improvement.",
  },
  {
    title: "Align",
    desc: "CLSK programs and governance tied to published operational milestones.",
  },
];

export default function Timeline() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="font-heading text-center text-3xl font-semibold text-text mb-12">
          Clan Spark mining roadmap
        </h2>

        <div className="space-y-8">
          {steps.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-heading text-lg font-semibold text-text mb-1">
                  {s.title}
                </h3>
                <p className="text-sm text-muted">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
