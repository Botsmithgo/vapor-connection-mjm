import { HOURS } from "@/data/business";

export type OpenStatus = {
  isOpen: boolean;
  /** "Open until 9:00 PM" | "Opens at 8:00 AM" | "Opens Mon at 8:00 AM" */
  label: string;
  todayLabel: string;
};

function fmt(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${ampm}` : `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Open/closed status in the store's timezone (America/Chicago — Cantonment FL
 * is in the Pensacola metro, which observes Central Time).
 */
export function getOpenStatus(now: Date = new Date()): OpenStatus {
  // Convert to store-local time regardless of visitor timezone
  const local = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Chicago" })
  );
  const day = local.getDay();
  const mins = local.getHours() * 60 + local.getMinutes();

  const today = HOURS[day];
  const opens = toMinutes(today.opens);
  const closes = toMinutes(today.closes);
  const todayLabel = `${fmt(today.opens)} – ${fmt(today.closes)}`;

  if (mins >= opens && mins < closes) {
    return { isOpen: true, label: `Open now · until ${fmt(today.closes)}`, todayLabel };
  }
  if (mins < opens) {
    return { isOpen: false, label: `Closed · opens ${fmt(today.opens)} today`, todayLabel };
  }
  const tomorrow = HOURS[(day + 1) % 7];
  return {
    isOpen: false,
    label: `Closed · opens ${fmt(tomorrow.opens)} ${tomorrow.day === "Sunday" || tomorrow.day === "Saturday" ? tomorrow.day.slice(0, 3) : "tomorrow"}`,
    todayLabel,
  };
}
