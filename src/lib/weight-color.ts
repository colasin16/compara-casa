/** Interpolates a background color from light transparent green (1) to dark opaque green (10). */
export function weightColor(n: number): string {
  const t = (n - 1) / 9;
  const r = Math.round(187 - t * 165);
  const g = Math.round(247 - t * 146);
  const b = Math.round(208 - t * 156);
  const a = 0.25 + t * 0.75;
  return `rgba(${r},${g},${b},${a})`;
}
