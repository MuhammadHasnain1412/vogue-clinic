import Providers from "./providers";
import { Poppins } from "next/font/google";
import { Footer, Navbar } from "./components/layout";
import { AppShell } from "@mantine/core";
import './globals.css';  // Add this line


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Vogue Dental Aesthetics",
  description: "Premium Cosmetic & Dental Clinic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <AppShell>
            <Navbar />
            {children}
            <Footer />
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
