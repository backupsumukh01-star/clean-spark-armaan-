import ConnectWallet from "./ConnectWallet";
import AddTokenButton from "./AddTokenButton";

export default function BuyAndConnect() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-heading text-3xl font-semibold text-text mb-4">
          Buy & Manage Clan Spark
        </h2>

        <p className="mb-8 text-muted">
          Connect your wallet, purchase Clan Spark on supported exchanges, and add
          the token to your wallet with one click.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <ConnectWallet />
          <AddTokenButton />
        </div>
      </div>
    </section>
  );
}
