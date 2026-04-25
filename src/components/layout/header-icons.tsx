"use client";

import { Menu, Search } from "lucide-react";
import { Button } from "@components/ui/button";
import CircleUserRound from "@icons/circle-user-round";

interface HeaderIconsProps {
    profilePinned: boolean;
    searchPinned: boolean;
    onProfileClick: () => void;
    onSearchClick: () => void;
    onMobileOpen: () => void;
}

export default function HeaderIcons({
    profilePinned,
    searchPinned,
    onProfileClick,
    onSearchClick,
    onMobileOpen,
}: HeaderIconsProps) {
    return (
        <div className="flex items-center gap-4 text-[#4a5565]">
            <button
                onClick={onSearchClick}
                aria-label="Open search"
                className={`cursor-pointer transition-colors ${
                    searchPinned ? "text-[#1d1d1f]" : "hover:text-[#1d1d1f]"
                }`}
            >
                <Search size={20} />
            </button>

            <div
                onClick={onProfileClick}
                className={`cursor-pointer transition-colors ${
                    profilePinned ? "text-[#1d1d1f]" : "hover:text-[#1d1d1f]"
                }`}
            >
                <CircleUserRound />
            </div>

            {/* <Button size="sm">Sign in</Button> */}

            <button
                className="md:hidden"
                onClick={onMobileOpen}
                aria-label="Open menu"
            >
                <Menu className="text-gray-600" />
            </button>
        </div>
    );
}