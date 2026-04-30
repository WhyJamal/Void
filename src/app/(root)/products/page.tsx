"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { PRODUCTS } from "@/config/products.config";

function getProductClass(index: number, length: number) {
    const isLastOddItem = length % 2 === 1 && index === length - 1;

    return isLastOddItem ? "md:col-span-2" : "";
}

export default function ERPProductsPage() {
    return (
        <main className="min-h-screen bg-[#f9f9f9] text-black">

            <section className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
                {PRODUCTS.map((product, index) => (
                    <div
                        key={product.id}
                        className={`relative flex flex-col items-center px-8 pt-14 pb-10 min-h-140 overflow-hidden ${getProductClass(index, PRODUCTS.length)}`}
                    >
                        <Image
                            src={product.image}
                            alt={product.imageAlt}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        <div className="absolute inset-0 text-4xl sm:text-5xl font-semibold tracking-tight leading-tight mb-6 bg-linear-to-b from-black to-black/60 bg-clip-text text-transparent" />

                        <div className="relative z-10 flex flex-col items-center w-full flex-1">

                            <span className="mb-4 inline-block rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1">
                                {product.badge}
                            </span>

                            <h2 className="text-[36px] font-bold tracking-tight text-white text-center leading-tight mb-3">
                                {product.title}
                            </h2>

                            <p className="text-[15px] text-white/75 text-center leading-relaxed mb-8 max-w-70">
                                {product.subtitle}
                            </p>

                            <div className="flex items-center gap-3 flex-wrap justify-center">
                                <Link href={PAGES.PRODUCT(product.id)}>
                                    <Button size={"lg"}>
                                        Подробнее
                                    </Button>
                                </Link>

                                <Button size={"lg"} variant={"secondary"}>
                                    Запросить демо <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold mb-6">
                        Единая платформа для управления бизнесом
                    </h2>
                    <p className="text-black/60 text-lg leading-relaxed">
                        Наши продукты объединяются в единую систему, позволяя вам контролировать
                        финансы, склад, сотрудников и аналитику без переключения между сервисами.
                    </p>
                </div>
            </section>

        </main>
    );
}