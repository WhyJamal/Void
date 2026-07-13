"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
    >
      {isLoading ? "Выход..." : "Выйти"}
    </button>
  );
}