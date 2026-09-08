import { Logo } from "@/components/logo";
import Image from "next/image";

export default function CompanySection() {
    return (
        <section className="w-full mx-auto bg-white dark:bg-black transition-colors">
            <div className="bg-linear-to-r from-slate-50 via-blue-100 to-indigo-300 dark:from-slate-950 dark:via-slate-900 dark:to-[#0F1B2D] transition-colors">

                {/* Logo */}
                <div className="grid lg:grid-cols-2 gap-16 items-center py-10">
                    <div className="flex justify-center">
                        <Logo size="xl" />
                    </div>

                    {/* Content */}
                    <div>
                        <span className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Разработка корпоративного ПО
                        </span>

                        <h1 className="mt-4 text-5xl font-bold leading-tight text-slate-900 dark:text-white">
                            Программные решения
                            <br />
                            для любого бизнеса
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            Мы разрабатываем и предоставляем современные облачные
                            решения для управления производством, персоналом,
                            складом, взаимоотношениями с клиентами и другими
                            бизнес-процессами.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {["ERP", "CRM", "HRM", "WMS"].map((item) => (
                                <span
                                    key={item}
                                    className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 border border-slate-200
                                    dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Gradient pastga silliq o'tishi */}
                <div className="h-20 bg-linear-to-b from-transparent to-white dark:to-black" />
            </div>

            {/* Pastki qism */}
            <div className="max-w-4xl px-20 py-10">
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                    Единая платформа. Множество решений.
                </h2>

                <p className="mt-6 leading-8 text-slate-600 dark:text-slate-400">
                    Экосистема Narsil объединяет готовые программные продукты
                    для компаний различных отраслей. От управления персоналом
                    и производством до CRM-систем, аналитики и автоматизации
                    бизнес-процессов. Выбирайте необходимые инструменты и
                    масштабируйте бизнес без смены платформы.
                </p>
            </div>
        </section>
    );
}