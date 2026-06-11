/**
 * Single source of truth for MJM's Vapor Connection business facts.
 * Verified from the live site + directories + socials on 2026-06-11.
 * FL HB 1007 note: keep disposable brand names HERE (easily edited — delistings happen).
 */

export const BUSINESS = {
  name: "MJM's Vapor Connection",
  shortName: "Vapor Connection",
  tagline: "All Your Vaping Needs",
  foundedYear: 2012,
  phone: "(850) 968-5777",
  phoneHref: "tel:+18509685777",
  address: {
    street: "2456 S Highway 29",
    city: "Cantonment",
    state: "FL",
    zip: "32533",
    full: "2456 S Highway 29, Cantonment, FL 32533",
  },
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=MJM's+Vapor+Connection+2456+S+Highway+29+Cantonment+FL+32533",
  googleReviewsUrl:
    "https://www.google.com/maps/search/MJM's+Vapor+Connection+Cantonment+FL",
  facebook: "https://www.facebook.com/MJMVaporConnection",
  instagram: "https://www.instagram.com/mjmsvaporconnection",
  rating: 4.7,
  reviewCount: 171,
} as const;

/** 0 = Sunday … 6 = Saturday (JS Date convention) */
export const HOURS: { day: string; opens: string; closes: string }[] = [
  { day: "Sunday", opens: "09:00", closes: "20:00" },
  { day: "Monday", opens: "08:00", closes: "21:00" },
  { day: "Tuesday", opens: "08:00", closes: "21:00" },
  { day: "Wednesday", opens: "08:00", closes: "21:00" },
  { day: "Thursday", opens: "08:00", closes: "21:00" },
  { day: "Friday", opens: "08:00", closes: "21:00" },
  { day: "Saturday", opens: "08:00", closes: "21:00" },
];

export const CATEGORIES = [
  {
    slug: "disposables",
    name: "Disposables",
    blurb: "The latest drops, stocked deep. Grab one and go.",
    image: "/images/cat-disposables.png",
    big: true,
  },
  {
    slug: "mods-pods",
    name: "Mods & Pod Systems",
    blurb: "Daily drivers to cloud machines — GeekVape, Vaporesso & more.",
    image: "/images/cat-mods.png",
    big: false,
  },
  {
    slug: "tanks",
    name: "Tanks",
    blurb: "Sub-ohm and MTL for every setup.",
    image: "/images/cat-tanks.png",
    big: false,
  },
  {
    slug: "coils",
    name: "Coils & Atomizers",
    blurb: "Your coil is on the wall. We don't run out.",
    image: "/images/cat-coils.png",
    big: false,
  },
] as const;

/** Beyond hardware — confirmed via their Instagram bio + directories */
export const ALSO_CARRY = [
  "100+ E-Liquid Flavors",
  "Salt Nic",
  "Starter Kits",
  "CBD",
  "Delta-8",
  "Kratom",
  "Glass",
  "Dry-Herb Devices",
] as const;

export const DEALS = [
  {
    title: "Throwdown Thursday",
    cadence: "Every Thursday · All Day",
    detail:
      "Big savings on select products every Thursday, open to close — 8 AM to 9 PM. The board changes weekly. In store only.",
    tag: "All Day",
    highlight: true,
  },
  {
    title: "Disposable Doubles",
    cadence: "This Month",
    detail: "Select disposables 2 for $40 — mix or match flavors.",
    tag: "2/$40",
    highlight: false,
  },
  {
    title: "BOGO 50% Off",
    cadence: "This Month",
    detail: "Buy any premium disposable, get the second 50% off.",
    tag: "50% Off",
    highlight: false,
  },
  {
    title: "Military Discount",
    cadence: "Every Day",
    detail:
      "Active duty & veterans save on every visit. Thank you for your service — just show your ID.",
    tag: "ID = Savings",
    highlight: false,
  },
] as const;

/** Ticker line items — short, punchy, rotating */
export const TICKER_ITEMS = [
  "Throwdown Thursday — deals all day, every Thursday",
  "Select disposables 2 for $40",
  "BOGO 50% off premium disposables",
  "Military discount every day",
  "100+ e-liquid flavors in stock",
  "Open 8 AM – 9 PM Mon–Sat · 9 AM – 8 PM Sun",
] as const;

/** Real review quotes (Google 4.7★ · via Yahoo Local / directories, 2026-06) */
export const REVIEWS = [
  {
    name: "Bethany V.",
    stars: 5,
    quote:
      "My favorite place in Pensacola to go. The staff is always super friendly and helpful, so down to earth, and gets you what you need without breaking your bank.",
  },
  {
    name: "Pete V.",
    stars: 5,
    quote:
      "Always open during the day. Staff is very friendly and helpful. More vape stuff than you can shake a stick at — really helpful when I bought a new tank and mod.",
  },
  {
    name: "Dominik V.",
    stars: 5,
    quote:
      "We visited some other locations that didn't have as much stock and didn't have what we were looking for. This place had a lot of stock.",
  },
] as const;

export const STATS = [
  { value: 2012, label: "Family-owned since", raw: true },
  { value: 171, label: "Google reviews", suffix: "+", note: "4.7★ average" },
  { value: 13, label: "Hours open daily", note: "Longest in the metro" },
  { value: 100, label: "E-liquid flavors", suffix: "+" },
] as const;

/** FDA-required warning for nicotine product marketing. Do not edit. */
export const FDA_WARNING =
  "WARNING: This product contains nicotine. Nicotine is an addictive chemical.";

export const AGE_POLICY =
  "21+ only. All customers must be at least 21 years old with a valid photo ID.";
