"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { PAGES } from "@/config/pages.config";

export default function FooterWrapper() {
  const pathname = usePathname();

  const shouldHideFooter =
    pathname.startsWith(PAGES.ACCOUNT)

  if (shouldHideFooter) return null;

  return <Footer />;
} 