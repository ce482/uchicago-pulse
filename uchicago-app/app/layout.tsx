import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UChicago Pulse",
  description: "Your one-stop destination for campus life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <nav className="bg-white dark:bg-gray-900 shadow-lg border-b-4 border-accent">
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex-shrink-0">
                <Link
                  href="/"
                  className="text-lg sm:text-2xl font-bold text-primary truncate"
                >
                  UChicago Pulse
                </Link>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-8">
                <Link
                  href="/map"
                  className="text-sm sm:text-base text-gray-900 dark:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary"
                >
                  Map
                </Link>
                <Link
                  href="/events"
                  className="text-sm sm:text-base text-gray-900 dark:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary"
                >
                  Events
                </Link>
                <Link
                  href="/communities"
                  className="text-sm sm:text-base text-gray-900 dark:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary"
                >
                  Communities
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-grow w-full max-w-full overflow-x-hidden">
          {children}
        </main>
        <footer className="bg-white dark:bg-gray-900 border-t-4 border-accent">
          <div className="w-full max-w-7xl mx-auto py-4 sm:py-6 px-2 sm:px-6">
            <p className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} UChicago Pulse
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
