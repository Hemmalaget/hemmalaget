import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hemmalaget",
  description:
    "Hemmalaget är det personliga assistans­bolaget som sätter dig och dina behov i fokus. Tillsam­mans ser vi till att du får den hjälp som du vill ha, utan onödigt krångel.",
  copyright: "Hemmalaget AB",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="sv">
    <body className={inter.className}>{children}</body>
  </html>
);

export default RootLayout;
