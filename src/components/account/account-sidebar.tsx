"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight, User, Shield, Building2, FolderOpen, Menu, X } from "lucide-react";
import { PAGES } from "@/config/pages.config";

type SidebarUser = {
  name: string | null;
  email: string | null;
};

type SidebarOrganization = {
  name: string;
  slug: string;
} | null;

const navItems = [
  { title: "Аккаунт", href: PAGES.ACCOUNT, icon: User },
  { title: "Безопасность", href: PAGES.ACCOUNT_SECURITY, icon: Shield },
  { title: "Организация", href: PAGES.ACCOUNT_ORGANIZATION, icon: Building2 },
  { title: "Проекты", href: PAGES.ACCOUNT_PROJECTS, icon: FolderOpen },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function initials(name?: string | null, email?: string | null) {
  const source = (name || email || "U").trim();
  const parts = source.split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "U");
  return letters.join("") || "U";
}

function SidebarContent({
  user,
  organization,
  pathname,
  onClose,
}: {
  user: SidebarUser;
  organization: SidebarOrganization;
  pathname: string | null;
  onClose?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Close button — mobile only */}
      {onClose && (
        <div className="flex items-center justify-between px-5 pt-5 pb-2 md:hidden">
          <span className="text-sm font-semibold text-black/40 uppercase tracking-[0.2em]">Меню</span>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-black/50 transition hover:bg-black/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* User info */}
      <div className="px-5 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gray-700 to-gray-900 text-xl font-semibold text-white shadow-sm">
            {initials(user.name, user.email)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-[#1d1d1f] leading-tight">
              {user.name || "Без имени"}
            </p>
            <p className="truncate text-sm text-black/40 mt-0.5">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="mx-5 h-px bg-black/5" />

      {/* Nav */}
      <nav className="mt-3 px-3 space-y-0.5 flex-1">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/account" && pathname?.startsWith(item.href + "/"));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cx(
                "flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-medium transition",
                active
                  ? "bg-black text-white"
                  : "text-black/65 hover:bg-black/5 hover:text-black",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cx("h-4 w-4 shrink-0", active ? "text-white" : "text-black/40")} />
                {item.title}
              </div>
              <ChevronRight className={cx("h-3.5 w-3.5 shrink-0", active ? "text-white/60" : "text-black/20")} />
            </Link>
          );
        })}
      </nav>

      {/* Organization — bottom of sidebar */}
      {organization && (
        <div className="mx-5 mb-6 mt-4">
          <div className="h-px bg-black/5 mb-4" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/30 px-1 mb-2">
            Организация
          </p>
          <div className="px-1">
            <p className="text-sm font-semibold text-[#1d1d1f] truncate">{organization.name}</p>
            <p className="text-xs text-black/40 mt-0.5">@{organization.slug}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function AccountSidebar({
  user,
  organization,
}: {
  user: SidebarUser;
  organization: SidebarOrganization;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed top-10 left-0 right-0 z-40 flex items-center justify-between bg-white/90 backdrop-blur border-b border-black/5 px-5 py-4 md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-gray-700 to-gray-900 text-xs font-semibold text-white">
            {initials(user.name, user.email)}
          </div>
          <span className="text-sm font-semibold text-[#1d1d1f]">
            {navItems.find(i => i.href === pathname || pathname?.startsWith(i.href + "/"))?.title ?? "Аккаунт"}
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-black/60 transition hover:bg-black/10"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-0 bg-white overflow-y-auto">
            <SidebarContent
              user={user}
              organization={organization}
              pathname={pathname}
              onClose={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-black/5 bg-white/90 backdrop-blur md:block">
        <SidebarContent
          user={user}
          organization={organization}
          pathname={pathname}
        />
      </aside>
    </>
  );
}
