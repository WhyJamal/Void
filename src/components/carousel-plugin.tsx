"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full px-4 sm:px-8 lg:px-12"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="-ml-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2"
          >
            <div className="p-1">
              <Card className="rounded-2xl shadow-md">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">
                    {index + 1}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  )
}