import PerformanceSparkline from "./PerformanceSparkline";
import LivePrice from "@/components/shared/LivePrice";

export default function PerformanceSection() {
  return (
    <section className="border-y border-border bg-bg py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row">
        <div className="flex-1">
          <div className="mb-2 flex items-baseline gap-2">
            <h3 className="font-heading text-lg text-text">
              Historical Market Performance
            </h3>
            <span className="text-sm text-muted">•</span>
            <span className="text-sm text-muted">
              Live: <LivePrice />
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">
            Past performance is shown for informational purposes only.
          </p>
        </div>

        <div className="w-full flex-1">
          <PerformanceSparkline />
        </div>
      </div>
    </section>
  );
}
