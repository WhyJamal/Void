"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mod } from "@utils/carousel-math";
import { topRow } from "@config/showcase.config";

const INTERVAL = 3000;
const N = topRow.length;

export function useSyncedCarousel() {
    const [vIdx, setVIdx] = useState(N);
    const [animated, setAnimated] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const jumpRef = useRef<number | null>(null);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => setVIdx((v) => v + 1), INTERVAL);
    }, []);

    const stopTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        if (isPlaying) startTimer();
        else stopTimer();
        return stopTimer;
    }, [isPlaying, startTimer, stopTimer]);

    const onTransitionEnd = useCallback(() => {
        setVIdx((v) => {
            if (v >= N * 2) jumpRef.current = v - N;
            else if (v < N) jumpRef.current = v + N;
            return v;
        });
    }, []);

    useEffect(() => {
        if (jumpRef.current === null) return;

        const target = jumpRef.current;
        jumpRef.current = null;

        setAnimated(false);
        setVIdx(target);

        requestAnimationFrame(() =>
            requestAnimationFrame(() => setAnimated(true))
        );
    });

    const goTo = useCallback(
        (realIdx: number) => {
            setVIdx((v) => {
                const curReal = mod(v, N);
                return v + (realIdx - curReal);
            });
            if (isPlaying) startTimer();
        },
        [isPlaying, startTimer]
    );

    const currentReal = mod(vIdx, N);

    return {
        vIdx,
        setVIdx,
        animated,
        isPlaying,
        setIsPlaying,
        startTimer,
        goTo,
        onTransitionEnd,
        currentReal,
    };
}