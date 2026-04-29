"use client";

import Image from "next/image";
import { useHeaderMenu } from "@/components/hooks/use-header-menu";
import { menuItems } from "@config/header.config";
import DesktopNav from "./desktop-nav";
import DropdownMenu from "./dropdown-menu";
import HeaderIcons from "./header-icons";
import MobileMenu from "./mobile-menu";
import SearchOverlay from "./search-overlay";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";

export default function Header() {

    const {
        query,
        setQuery,

        activeMenu,
        activeItem,
        mobileOpen,
        activeMobileMenu,
        activeMobileItem,
        profilePinned,
        searchPinned,

        openMobile,
        closeMobile,
        openMobileMenu,
        closeMobileMenu,

        onNavEnter,
        onNavLeave,
        onProfileClick,
        onSearchClick,
        onDropdownEnter,
        onDropdownLeave,
        onSearchOverlayEnter,
        onSearchOverlayLeave,
    } = useHeaderMenu({ menuItems, closeDelay: 150 });

    return (
        <div className="sticky top-0 z-50">
            <nav
                className="w-full bg-[rgba(255,255,255,0.6)] backdrop-blur-2xl supports-backdrop-filter:bg-[rgba(255,255,255,0.5)] border-b border-[rgba(0,0,0,0.08)] relative z-50"
                style={{ height: "44px" }}
            >
                <div className="max-w-5xl mx-auto h-full flex items-center justify-between px-4">
                    <Link
                        href={PAGES.HOME}
                    >
                        <Image
                            src="/logo.black.png"
                            alt="void"
                            width={35}
                            height={35}
                            priority
                        />
                    </Link>

                    <DesktopNav
                        menuItems={menuItems}
                        activeItem={activeItem}
                        onMouseEnter={onNavEnter}
                        onMouseLeave={onNavLeave}
                    />

                    <HeaderIcons
                        profilePinned={profilePinned}
                        searchPinned={searchPinned}
                        onProfileClick={onProfileClick}
                        onSearchClick={onSearchClick}
                        onMobileOpen={openMobile}
                    />
                </div>
            </nav>

            <DropdownMenu
                activeItem={activeItem}
                onMouseEnter={onDropdownEnter}
                onMouseLeave={onDropdownLeave}
            />

            <SearchOverlay
                isOpen={searchPinned}
                query={query}
                onQueryChange={setQuery}
                onClose={onSearchClick}
                onMouseEnter={onSearchOverlayEnter}
                onMouseLeave={onSearchOverlayLeave}
            />

            {mobileOpen && (
                <MobileMenu
                    menuItems={menuItems}
                    activeMobileMenu={activeMobileMenu}
                    activeMobileItem={activeMobileItem}
                    onClose={closeMobile}
                    onOpenMenu={openMobileMenu}
                    onCloseMenu={closeMobileMenu}
                />
            )}

        </div>
    );
}