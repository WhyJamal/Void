"use client";

import { IProduct } from "@/types/product.types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SolutionSection } from "@/components/product/solution-section";

interface ProductClientProps {
    product: IProduct;
}

export default function ProductClient({ product }: ProductClientProps) {
    return (
        <main className="min-h-screen bg-[#f9f9f9] text-black">
            <section className="relative min-h-[70vh] flex items-center overflow-hidden">

                <div className="absolute inset-0 bg-linear-to-br"
                    style={{
                        background: `linear-gradient(to bottom right, ${product.theme.from}, ${product.theme.via}, ${product.theme.to})`,
                    }}
                />

                <div className={`absolute -top-40 -left-40 w-125 h-125 rounded-full blur-3xl ${product.theme.glow1}`} />

                <div className={`absolute -bottom-40 -right-40 w-125 h-125 rounded-full blur-3xl ${product.theme.glow2}`} />

                <div
                    className="absolute top-0 right-0 h-full w-[55%]"
                    style={{
                        clipPath: "ellipse(100% 100% at 100% 50%)",
                    }}
                >
                    <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="relative z-10 w-full max-w-full px-12 md:px-20">
                    <div className="max-w-[45%]">

                        <h1 className="text-4xl sm:text-5xl font-bold text-[#2C1810] mb-5 leading-tight">
                            {product.title}
                        </h1>

                        <p className="text-[#2C1810]/70 text-base mb-6 leading-relaxed">
                            {product.subtitle}
                        </p>

                        <div className="flex gap-3 flex-wrap">
                            <Button size="lg">Начните использовать</Button>
                            <Button size="lg" variant="secondary">
                                Запросить демо <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                    </div>
                </div>

            </section>

            {product.solutionSection && (
                <SolutionSection data={product.solutionSection} />
            )}

            <section className="border-t border-black/10 bg-black text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                            Готово к запуску
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Запускайте продукт быстрее и масштабируйтесь без ограничений.
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                            Всё необходимое для роста: удобные инструменты, гибкость и высокая
                            производительность — чтобы вы могли сосредоточиться на развитии бизнеса.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button size={"lg"} variant={"secondary"}>
                            Начать бесплатно
                        </Button>

                        <Button
                            variant="outline"
                            className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-white hover:bg-white hover:text-black"
                        >
                            Посмотреть тарифы
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}