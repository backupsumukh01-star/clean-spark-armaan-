const items = [
  "Fixed Supply",
  "Liquidity Locked",
  "Transparent Tokenomics",
  "Global Community",
];

export default function TrustStrip() {
  return (
    <section className="border-y border-border bg-card py-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 text-center text-sm text-muted md:grid-cols-4">
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </section>
  );
}
