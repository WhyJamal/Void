"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ToggleTheme() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Toggle theme"
                className="h-4 w-4 hover:bg-transparent dark:hover:bg-transparent text-[#4a5565] dark:text-[#f5f5f7] hover:text-[#1d1d1f] dark:hover:text-[#6e6e73]"
            >

                <Moon className="h-5 w-5" />
            </Button>
        );
    }

    const isDark = theme === "dark";

    return (
        <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className="h-4 w-4 hover:bg-transparent dark:hover:bg-transparent text-[#4a5565] dark:text-[#f5f5f7] hover:text-[#1d1d1f] dark:hover:text-[#6e6e73]"
        >
            {isDark ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </Button>
    );
}