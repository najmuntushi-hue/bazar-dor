import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      emoji="🛒"
      title="৪০৪ — পেজটি খুঁজে পাওয়া যায়নি"
      message="আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।"
    />
  );
}