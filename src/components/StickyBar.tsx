import { Phone, MapPin, Flame } from "lucide-react";
import { BUSINESS } from "@/data/business";

/**
 * Mobile-only sticky conversion bar: Call / Directions / Deals.
 * The site's conversion engine — phone leads convert 3–10x web forms.
 * Always visible, safe-area padded, 44px+ targets.
 */
export function StickyBar() {
  const items = [
    {
      href: BUSINESS.phoneHref,
      label: "Call",
      Icon: Phone,
      external: false,
      primary: true,
    },
    {
      href: BUSINESS.mapsUrl,
      label: "Directions",
      Icon: MapPin,
      external: true,
      primary: false,
    },
    {
      href: "#deals",
      label: "Deals",
      Icon: Flame,
      external: false,
      primary: false,
    },
  ];

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-smoke/90 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3">
        {items.map(({ href, label, Icon, external, primary }) => (
          <a
            key={label}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="flex min-h-[60px] flex-col items-center justify-center gap-1 py-2 transition-colors active:bg-white/5"
          >
            <Icon
              className={`h-5 w-5 ${primary ? "text-ember" : "text-silver"}`}
              aria-hidden
            />
            <span
              className={`text-[11px] font-semibold uppercase tracking-wider ${
                primary ? "text-ember" : "text-silver"
              }`}
            >
              {label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
