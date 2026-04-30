"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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

    </main>
  );
}
