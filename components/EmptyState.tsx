import Link from "next/link";

type Props = {
  title: string;
  message?: string;
  emoji?: string;
};

export default function EmptyState({ title, message, emoji = "🔍" }: Props) {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <div className="text-7xl">{emoji}</div>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      {message && <p className="mt-2 text-base-content/70">{message}</p>}
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}