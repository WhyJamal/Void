import Image from "next/image";

export default function CompanySection() {
    return (
        <section className="w-full mx-auto">
            <div className="bg-linear-to-r from-slate-50 via-blue-100 to-indigo-300">

                {/* Logo */}
                <div className="grid lg:grid-cols-2 gap-16 items-center py-10">
                    <div className="flex justify-center">
                        <Image
                            src="/logos/bazon-logo.png"
                            alt="Bazon"
                            width={800}
                            height={800}
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <span className="text-sm uppercase tracking-widest text-slate-500">
                            Разработка корпоративного ПО
                        </span>

                        <h1 className="mt-4 text-5xl font-bold text-slate-900 leading-tight">
                            Программные решения
                            <br />
                            для любого бизнеса
                        </h1>

                        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                            Мы разрабатываем и предоставляем современные облачные
                            решения для управления производством, персоналом,
                            складом, взаимоотношениями с клиентами и другими
                            бизнес-процессами.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <span className="px-4 py-2 rounded-full bg-slate-100">
                                ERP
                            </span>

                            <span className="px-4 py-2 rounded-full bg-slate-100">
                                CRM
                            </span>

                            <span className="px-4 py-2 rounded-full bg-slate-100">
                                HRM
                            </span>

                            <span className="px-4 py-2 rounded-full bg-slate-100">
                                WMS
                            </span>
                        </div>
                    </div>
                </div>
                <div className="h-20 bg-linear-to-b from-transparent to-white" />
            </div>


            <div className="max-w-4xl px-20 py-10">
                <h2 className="text-3xl font-semibold text-slate-900">
                    Единая платформа. Множество решений.
                </h2>

                <p className="mt-6 text-slate-600 leading-8">
                    Экосистема Bazon объединяет готовые программные продукты
                    для компаний различных отраслей. От управления персоналом
                    и производством до CRM-систем, аналитики и автоматизации
                    бизнес-процессов. Выбирайте необходимые инструменты и
                    масштабируйте бизнес без смены платформы.
                </p>
            </div>
        </section>
    );
}