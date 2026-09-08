"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export enum LogoType {
    main = "MAIN",
    secondary = "SECONDARY",
}

export type LogoSizeType = "sm" | "md" | "lg" | "xl";

interface LogoProps {
    logo?: LogoType;
    size?: LogoSizeType;
}

export function Logo({
    logo = LogoType.main,
    size = "sm",
}: LogoProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? resolvedTheme === "dark" : true;

    const src =
        logo === LogoType.main
            ? isDark
                ? "/logos/narsil-white-logo.png"
                : "/logos/narsil-logo.png"
            : isDark
                ? "/logos/n-white-logo.png"
                : "/logos/n-logo.png";

    const dimensions = useMemo(() => {
        switch (size) {
            case "sm":
                return { width: 100, height: 100 };
            case "md":
                return { width: 180, height: 180 };
            case "lg":
                return { width: 280, height: 280 };
            case "xl":
                return { width: 800, height: 800 };
            default:
                return { width: 100, height: 100 };
        }
    }, [size]);

    return (
        <Image
            src={src}
            alt="Narsil"
            width={dimensions.width}
            height={dimensions.height}
            priority
        />
    );
}