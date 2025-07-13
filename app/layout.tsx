import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "@/context/auth";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "CarMart",
  description: "A car dealership app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <AuthProvider>
          <Navbar />
          {children}
          <p className="text-yellow-400 p-2">Developed by Shando-Paul Howell</p>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
