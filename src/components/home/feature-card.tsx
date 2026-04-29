import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={container}
      className="group rounded-3xl border border-black/8 bg-white/80 p-6 shadow-[0_1px_0_rgba(0,0,0,0.03),0_24px_60px_rgba(0,0,0,0.06)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-black/8 bg-black text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-black/60">{desc}</p>
    </motion.div>
  );
}