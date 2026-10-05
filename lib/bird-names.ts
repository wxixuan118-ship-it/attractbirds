export function pluralizeBird(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith("goose")) return name.slice(0, -5) + "geese";
  if (lower.endsWith("mouse")) return name.slice(0, -5) + "mice"; // Titmouse → Titmice
  if (lower.endsWith("finch") || lower.endsWith("thrush")) return name + "es";
  return name + "s";
}
