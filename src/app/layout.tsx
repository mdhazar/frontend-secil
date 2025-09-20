import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "./globals.css";
import Provider from "./components/Provider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Login App",
  description: "A simple login app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
