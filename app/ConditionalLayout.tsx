"use client";

import { usePathname } from "next/navigation";
import { Footer, Navbar } from "./components/layout";
import { AppShell } from "@mantine/core";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Admin routes: no customer navbar/footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Customer routes: show navbar and footer
  return (
    <AppShell>
      <Navbar />
      {children}
      <Footer />
    </AppShell>
  );
}
