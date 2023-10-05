import "./globals.css";
import { Inter } from "next/font/google";

import { initializeApp } from "firebase/app";
import {} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdwPOex0qwoKT-sWaBH7kwJGFkLTh6IvY",
  authDomain: "hemmalaget-8e0ab.firebaseapp.com",
  projectId: "hemmalaget-8e0ab",
  storageBucket: "hemmalaget-8e0ab.appspot.com",
  messagingSenderId: "697129195408",
  appId: "1:697129195408:web:074bf5f850656b6b3c8515",
};
const app = initializeApp(firebaseConfig);

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
