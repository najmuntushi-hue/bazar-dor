"use client";

export type SortValue = "default" | "asc" | "desc";

type Props = {
  value: SortValue;
  onChange: (v: SortValue) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm text-base-content/70">
      <span>সাজান</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortValue)}
          className="h-10 cursor-pointer appearance-none rounded-xl border border-base-300 bg-base-100 pl-3 pr-9 text-sm text-base-content outline-none focus:border-primary"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/60"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </label>
  );
}