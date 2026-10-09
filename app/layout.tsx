
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";

import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <html lang="bn" data-theme="bazar">
      <body className={`${hind.variable} flex min-h-screen flex-col`}>
        <Navbar categories={categories} />

        <Ticker products={products} />

        <main className="flex-1">{children}</main>

        <Footer />

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              padding: "14px 18px",
              fontSize: "14px",
              fontFamily: "var(--font-hind), sans-serif",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#16a34a",
                secondary: "#ffffff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
