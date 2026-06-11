import { FDA_WARNING } from "@/data/business";

/**
 * FDA-required nicotine warning for vape marketing.
 * Spec: top placement, high-contrast black-on-white, bold sans ≥12pt.
 * (21 CFR 1143.3 formatting conventions.)
 */
export function FdaWarning() {
  return (
    <div
      role="note"
      aria-label="FDA nicotine warning"
      className="relative z-[60] w-full bg-white px-4 py-3 text-center"
    >
      <p
        className="mx-auto max-w-4xl text-[13px] font-bold leading-snug text-black sm:text-sm"
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
      >
        {FDA_WARNING}
      </p>
    </div>
  );
}
