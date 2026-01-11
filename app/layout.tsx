import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeToggle } from "@/components/products/ThemeToggle";
import { Package } from "lucide-react";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Explorer - Browse Amazing Products",
  description: "Discover and explore a wide range of products with our intuitive product explorer dashboard. Filter, search, and save your favorites.",
  keywords: ["products", "shopping", "e-commerce", "product explorer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Product Explorer
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Discover Amazing Products
                  </p>
                </div>
              </Link>

              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p className="text-sm">
                Built with Next.js, TypeScript, and Tailwind CSS
              </p>
              <p className="text-xs mt-2">
                Data provided by{" "}
                <a
                  href="https://fakestoreapi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  FakeStore API
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

