"use client"

import * as React from "react"
import VideoHero from "./video-hero"
import { CarouselPlugin } from "./carousel-plugin"

export default function HeroSection() {
    const [isPlaying, setIsPlaying] = React.useState(true)

    const togglePlaying = () => {
        setIsPlaying((prev) => !prev)
    }

    return (
        <>
            <VideoHero isPlaying={isPlaying} onToggle={togglePlaying} />

            <CarouselPlugin
                isPlaying={isPlaying}
                onToggle={togglePlaying}
            />
        </>
    )
}