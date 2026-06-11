/**
 * Rising smoke puffs behind the hero logo. Pure CSS loops —
 * transform/opacity only, blurred at the element level (small shapes).
 * Hidden on reduced motion via the global media query (animation stops).
 */
const WISPS: React.CSSProperties[] = [
  { left: "18%", bottom: "8%", width: 130, height: 130, ["--wisp-dur" as string]: "11s", ["--wisp-delay" as string]: "0s", ["--wisp-drift" as string]: "60px", ["--wisp-peak" as string]: 0.35 },
  { left: "38%", bottom: "0%", width: 180, height: 180, ["--wisp-dur" as string]: "13s", ["--wisp-delay" as string]: "2.5s", ["--wisp-drift" as string]: "-50px", ["--wisp-peak" as string]: 0.45 },
  { left: "55%", bottom: "12%", width: 110, height: 110, ["--wisp-dur" as string]: "9s", ["--wisp-delay" as string]: "1.2s", ["--wisp-drift" as string]: "40px", ["--wisp-peak" as string]: 0.3 },
  { left: "68%", bottom: "4%", width: 150, height: 150, ["--wisp-dur" as string]: "12s", ["--wisp-delay" as string]: "4s", ["--wisp-drift" as string]: "-70px", ["--wisp-peak" as string]: 0.4 },
  { left: "28%", bottom: "-6%", width: 200, height: 200, ["--wisp-dur" as string]: "15s", ["--wisp-delay" as string]: "6s", ["--wisp-drift" as string]: "30px", ["--wisp-peak" as string]: 0.25 },
];

export function SmokeWisps() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {WISPS.map((style, i) => (
        <span key={i} className="wisp" style={style} />
      ))}
    </div>
  );
}
