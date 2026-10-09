const DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** "1850" -> "১৮৫০" */
export const toBn = (v: number | string): string =>
  String(v).replace(/\d/g, (d) => DIGITS[Number(d)]);

/** 1850 -> "১,৮৫০" */
export const bnNumber = (n: number): string =>
  toBn(n.toLocaleString("en-US"));

/** "মঙ্গলবার, ৬ অক্টোবর, ২০২৬" */
export function bnDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).formatToParts(date);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";

  return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}

/** English unit -> Bangla unit */
const UNIT_MAP: Record<string, string> = {
  kg: "কেজি",
  kilogram: "কেজি",
  kilograms: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  liters: "লিটার",
  litres: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pieces: "পিস",
};

/** "প্রতি কেজি" */
export const unitLabel = (u: string): string => {
  const normalized = u.trim().toLowerCase();
  const unit = UNIT_MAP[normalized] ?? u.trim().replace(/^প্রতি\s*/, "");

  return `প্রতি ${unit}`;
};

/** "কেজি" — ticker-এর জন্য */
export const unitShort = (u: string): string => {
  const normalized = u.trim().toLowerCase().replace(/^প্রতি\s*/, "");

  return UNIT_MAP[normalized] ?? normalized;
};

/** Badge-এর arrow, text, color */
export function changeMeta(change: number) {
  const text = `${toBn(Math.abs(change).toFixed(1))}%`;

  if (change > 0) {
    return { arrow: "▲", text, cls: "text-error bg-error/10" };
  }

  if (change < 0) {
    return { arrow: "▼", text, cls: "text-success bg-success/10" };
  }

  return {
    arrow: "—",
    text: "০.০%",
    cls: "text-base-content/60 bg-base-300/60",
  };
}
