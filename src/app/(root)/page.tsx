"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

import { features } from "@/config/features.config";
import HeroSection from "@/components/home/hero-section";
import { FAQ } from "@/components/home/faq";
import SyncedCarousel from "@/components/home/showcase-section";
import { FeatureCard } from "@/components/home/feature-card";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/60 shadow-sm backdrop-blur">
      <Sparkles className="h-3.5 w-3.5" />
      <span>{children}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-black antialiased">

      <HeroSection />

      <section id="features" className="mx-auto max-w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-2xl">
            <SectionLabel>Функции</SectionLabel>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Всё, что нужно вашей команде, удобно организовано.
            </h2>

            <p className="mt-4 text-base leading-7 text-black/60 sm:text-lg">
              Держите интерфейс простым, с большими отступами и мягкими взаимодействиями для комфортной работы.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </motion.div>
      </section>

      <SyncedCarousel /> 
      <FAQ />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-[2rem] border border-black/8 bg-black px-6 py-10 text-white shadow-[0_20px_80px_rgba(0,0,0,0.2)] sm:px-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                Готово к запуску
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Сделайте ваш продукт более премиальным с первого клика.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                Этот макет адаптивный, минималистичный и создан для профессиональной презентации продукта.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/95"
              >
                Начать бесплатно
              </Link>

              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Связаться с продажами
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
