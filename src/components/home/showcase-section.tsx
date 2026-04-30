"use client";

import { bottomRow, topRow } from "@config/showcase.config";
import { useMobile } from "@hooks/use-mobile";
import { Pause, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSyncedCarousel } from "@components/hooks/use-synced-carousel";
import Image from "next/image";

const N = topRow.length;

const clonedTop = [...topRow, ...topRow, ...topRow];
const clonedBottom = [...bottomRow, ...bottomRow, ...bottomRow];

export default function SyncedCarousel() {
    const isMobile = useMobile();

    const {
        vIdx,
        setVIdx,
        animated,
        isPlaying,
        setIsPlaying,
        startTimer,
        goTo,
        onTransitionEnd,
        currentReal,
    } = useSyncedCarousel();

    const rootRef = useRef<HTMLDivElement>(null);
    const [rootW, setRootW] = useState(0);

    const vh = typeof window !== "undefined" ? window.innerHeight : 0;

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const ro = new ResizeObserver(() => setRootW(el.offsetWidth));
        ro.observe(el);
        setRootW(el.offsetWidth);

        return () => ro.disconnect();
    }, []);

    const slideW = rootW ? (isMobile ? rootW * 0.86 : rootW / 1.2) : 0;
    const thumbW = rootW ? (isMobile ? rootW * 0.45 : rootW / topRow.length) : 0;

    const mainH = slideW ? (isMobile ? vh * 0.7 : (slideW * 9) / 16) : 0;
    const thumbH = thumbW ? (isMobile ? vh * 0.28 : (thumbW * 9) / 16) : 0;

    const mainOffset = vIdx * slideW - (rootW - slideW) / 2;
    const thumbOffset = vIdx * thumbW - (rootW - thumbW) / 2;

    return (
        <div
            ref={rootRef}
            className="w-full select-none overflow-hidden"
        >
            <h1 className="ml-9 text-3xl font-semibold text-[#1d1d1f] py-3 tracking-tight">
                Управляйте задачами проще.
            </h1>

            <div className="flex w-full overflow-hidden py-3">
                <div
                    className="flex"
                    style={{
                        width: clonedTop.length * slideW,
                        transform: `translateX(-${mainOffset}px)`,
                        transition: animated ? "transform 500ms cubic-bezier(0.4,0,0.2,1)" : "none",
                    }}
                    onTransitionEnd={onTransitionEnd}
                >
                    {clonedTop.map((s, i) => {
                        const isCurrent = i === vIdx;
                        return (
                            <div
                                key={i}
                                className="relative shrink-0 cursor-pointer overflow-hidden"
                                style={{ width: slideW, height: mainH }}
                                onClick={() => {
                                    const diff = i - vIdx;
                                    setVIdx((v) => v + diff);
                                    if (isPlaying) startTimer();
                                }}
                            >
                                <Image
                                    src={s.image}
                                    alt={s.title}
                                    className="w-full h-full object-cover block px-3"
                                    draggable={false}
                                    fill
                                    sizes="900px"
                                />
                                <div
                                    className="absolute inset-0 bg-black/22 transition-opacity duration-300"
                                    style={{ opacity: isCurrent ? 0 : 1 }}
                                />
                                {isCurrent && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:bottom-10 sm:left-80 sm:-translate-x-1/2 flex flex-col sm:flex-row items-center gap-2.5">

                                        <span
                                            className="hidden sm:flex bg-white text-black font-medium px-5 py-2 sm:px-9 sm:py-3 rounded-full border border-white/30 text-sm sm:text-base text-center"
                                        >
                                            {s.title}
                                        </span>

                                        <span className="text-white truncate max-w-65 text-sm sm:text-base text-center sm:text-left">
                                            {s.subtitle}
                                        </span>

                                        <span
                                            className="flex sm:hidden bg-white text-black font-medium px-5 py-2 sm:px-9 sm:py-3 rounded-full border border-white/30 text-sm sm:text-base text-center"
                                        >
                                            {s.title}
                                        </span>

                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="w-full overflow-hidden gap-1">
                <div
                    className="flex"
                    style={{
                        width: clonedBottom.length * thumbW,
                        transform: `translateX(-${thumbOffset}px)`,
                        transition: animated ? "transform 500ms cubic-bezier(0.4,0,0.2,1)" : "none",
                    }}
                >
                    {clonedBottom.map((s, i) => {
                        const isActive = i === vIdx;
                        return (
                            <div
                                key={i}
                                className="relative shrink-0 cursor-pointer overflow-hidden"
                                style={{ width: thumbW, height: thumbH }}
                                onClick={() => goTo(i % N)}
                            >
                                <Image
                                    src={s.image}
                                    alt={s.title}
                                    className="w-full h-full object-cover block px-2"
                                    draggable={false}
                                    fill
                                    sizes="700px"
                                />
                                <div
                                    className="absolute inset-0 transition-opacity duration-300"
                                    style={{ opacity: isActive ? 0 : 1 }}
                                />
                                <div className="absolute bottom-0 left-2 right-0 text-white text-[10px] sm:text-[15px] font-medium truncate px-2 pb-1.5 pt-5">
                                    {s.title}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-center items-center gap-1.5 py-5 relative">
                {topRow.map((_, i) => {
                    const isActive = i === currentReal;

                    return (
                        <div
                            key={i}
                            onClick={() => goTo(i)}
                            className="relative overflow-hidden cursor-pointer shrink-0"
                            style={{
                                width: isActive ? 30 : 9,
                                height: 9,
                                borderRadius: isActive ? 4 : 99,
                                background: "rgba(29,29,31,0.4)",
                            }}
                        >
                            {isActive && (
                                <div
                                    key={currentReal}
                                    className="absolute left-0 top-0 h-full bg-[#1d1d1f]"
                                    style={{
                                        width: "100%",
                                        transformOrigin: "left",
                                        animation: "progressFill 3000ms linear forwards",
                                        animationPlayState: isPlaying ? "running" : "paused",
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
                <button
                    onClick={() => setIsPlaying((p) => !p)}
                    className="absolute right-4 top-2 h-9 w-9 rounded-full bg-transparent flex items-center justify-center cursor-pointer transition-colors"
                    style={{ border: "0.5px solid rgba(29,29,31,0.3)" }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <Pause fill="#000" className="h-3 w-3" />
                    ) : (
                        <Play fill="#000" className="h-3 w-3 left-1" />
                    )}
                </button>
            </div>
        </div>
    );
}