import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import QueryProvider from "@/src/providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Modern Task Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <QueryProvider>

          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

        </QueryProvider>

      </body>
    </html>
  );
}