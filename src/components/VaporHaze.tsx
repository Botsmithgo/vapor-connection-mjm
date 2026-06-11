import { cn } from "@/lib/utils";

/**
 * Ambient "vapor" atmosphere: blurred gradient blobs drifting on
 * transform-only keyframes. Blur is applied once at the container level.
 * Pure CSS — zero JS, compositor-thread only.
 */
export function VaporHaze({
  className,
  intensity = "hero",
}: {
  className?: string;
  intensity?: "hero" | "section";
}) {
  const dim = intensity === "section";
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <div className={cn("haze-field absolute inset-0", dim && "opacity-50")}>
        <div
          className="haze-a absolute -left-[10%] top-[5%] h-[55vmax] w-[55vmax] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(242,101,34,0.32), transparent 65%)",
          }}
        />
        <div
          className="haze-b absolute -right-[15%] top-[30%] h-[48vmax] w-[48vmax] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(255,122,26,0.2), transparent 62%)",
          }}
        />
        <div
          className="haze-c absolute left-[25%] -bottom-[20%] h-[42vmax] w-[42vmax] rounded-full max-md:hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(184,188,196,0.10), transparent 60%)",
          }}
        />
      </div>
    </div>
  );
}
