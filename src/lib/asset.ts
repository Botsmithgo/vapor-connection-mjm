/**
 * Prefix a public asset path with the deploy base path.
 * Empty locally and on root-domain hosts; set to the repo path for
 * GitHub Pages project sites (NEXT_PUBLIC_BASE_PATH at build time).
 * next/image does not auto-apply basePath to unoptimized static exports,
 * so image src values must go through this.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
