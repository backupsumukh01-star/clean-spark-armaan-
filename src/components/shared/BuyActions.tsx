import WalletGate from "./WalletGate";
import PancakeSwapBuy from "./PancakeSwapBuy";
import AddTokenButton from "./AddTokenButton";
import VerifyOnBscScan from "./VerifyOnBscScan";
import WalletBalances from "./WalletBalances";

export default function BuyActions() {
  return (
    <WalletGate>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <PancakeSwapBuy />
          <WalletBalances />
        </div>
        <div className="space-y-4">
          <AddTokenButton />
          <VerifyOnBscScan />
        </div>
      </div>
    </WalletGate>
  );
}
