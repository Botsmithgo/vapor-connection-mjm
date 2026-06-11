import { BUSINESS, HOURS } from "@/data/business";

/**
 * LocalBusiness structured data — the SEO backbone for "vape shop near me".
 * The current GoDaddy site has minimal schema; this is a pitch differentiator.
 */
export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: BUSINESS.name,
    alternateName: BUSINESS.shortName,
    slogan: BUSINESS.tagline,
    foundingDate: String(BUSINESS.foundedYear),
    telephone: "+18509685777",
    url: "https://vaporconnectionmjm.com",
    image: "https://vaporconnectionmjm.com/images/vc-logo.png",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.6093,
      longitude: -87.3261,
    },
    openingHoursSpecification: HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.opens,
      closes: h.closes,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
