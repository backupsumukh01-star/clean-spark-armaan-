import Link from "next/link";

const items = [
  "No hidden mint functions",
  "Fixed total supply",
  "Liquidity locked",
  "Transparent contract structure",
];

export default function SecurityPreview() {
  return (
    <section className="border-b border-border py-24 bg-bg">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-heading text-3xl font-semibold text-text">
          Trust Is a Core Requirement
        </h2>
        <ul className="mt-8 space-y-3 text-muted">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link
          href="/security"
          className="mt-8 inline-flex items-center text-primary hover:underline"
        >
          Security & Transparency →
        </Link>
      </div>
    </section>
  );
}
