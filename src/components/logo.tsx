"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export enum LogoType {
    main = "MAIN",
    secondary = "SECONDARY",
}

interface LogoProps {
    logo?: LogoType;
}

export function Logo({ logo = LogoType.main }: LogoProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? resolvedTheme === "dark" : true;

    const src =
        logo === LogoType.main
            ? isDark
                ? "/logos/bazon-white-logo.png"
                : "/logos/bazon-logo.png"
            : isDark
                ? "/logos/bazon-laurel-wreath-white.png"
                : "/logos/bazon-laurel-wreath.png";

    return (
        <Image
            src={src}
            alt="Bazon"
            width={100}
            height={100}
            priority
        />
    );
}