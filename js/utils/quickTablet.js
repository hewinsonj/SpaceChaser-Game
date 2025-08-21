// quickTablet.js
export function isIPadByResolution() {
  // Known iPad CSS viewport sizes (shortEdge x longEdge), portrait or landscape.
  // These are the common ones across classic, mini, Air, and Pro models.
  // We normalize to "min x max" so orientation doesn't matter.
  const known = new Set([
    "744x1133",  // iPad mini 6 (8.3")
    "768x1024",  // iPad 6th gen (9.7")
    "1024x768",  // 9.7" iPads (classic), mini 1–5 (most), Air 1–2
    "810x1080",  // 10.2" iPad (7/8/9 gen)
    "1180x820",  // 10.9" iPad (10th gen), some Air 4/5 reports
    "834x1112",  // 10.5" iPad Pro
    "834x1194",  // 11" iPad Pro / iPad Air 11"
    "1024x1366", // 12.9" iPad Pro
    "2048x1536",
    "1536x2048",
    "1024x2048",
    "2048x1024"

  ]);

  // Use CSS pixels (viewport), not device pixels.
  let w = Math.round(window.innerWidth);
  let h = Math.round(window.innerHeight);

  // Some browser UI/zoom can nudge by a pixel; allow ±2 px tolerance.
  const norm = (a, b) => `${Math.min(a,b)}x${Math.max(a,b)}`;
  const key = norm(w, h);

  if (known.has(key)) return true;

  // Fuzzy pass with small tolerance
  for (const entry of known) {
    const [sw, sh] = entry.split("x").map(Number);
    const min = Math.min(sw, sh), max = Math.max(sw, sh);
    const within = (x, target) => Math.abs(x - target) <= 2; // ±2 px
    if (within(Math.min(w,h), min) && within(Math.max(w,h), max)) return true;
  }
  return false;
}