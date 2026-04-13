import Button from "@/components/shared/Button";

export default function CommunityPreview() {
  return (
    <section className="border-b border-border bg-card py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-heading text-3xl font-semibold text-text">
          A Global Community Asset
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted">
          Clan Spark is open to participants worldwide. Community growth,
          transparency, and long-term alignment are central to the project.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/community" variant="secondary">
            Join Telegram
          </Button>
          <Button href="/community" variant="secondary">
            Follow on X
          </Button>
          <Button href="/community" variant="secondary">
            Join Discord
          </Button>
        </div>
      </div>
    </section>
  );
}
