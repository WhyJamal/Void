import { Button } from "@/components/ui/button";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="w-full bg-white dark:bg-black transition-colors">

      {/* Header */}
      <div className="bg-linear-to-r from-emerald-50 via-green-100 to-teal-100 dark:from-slate-950 dark:via-slate-900 dark:to-[#0F1B2D] transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
            Связаться с нами
          </h1>

          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Мы всегда открыты для новых проектов, партнерств и вопросов.
            Напишите нам — мы ответим в ближайшее время.
          </p>
        </div>

        <div className="h-20 bg-linear-to-b from-transparent to-white dark:to-black" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16">

        {/* Left */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Контактная информация
          </h2>

          <p className="mt-6 text-slate-600 dark:text-slate-400 leading-7">
            Вы можете связаться с нами любым удобным способом.
          </p>

          <div className="mt-10 space-y-6">

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
                <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Адрес
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Фергана, Узбекистан
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
                <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Email
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  info@narsil.uz
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
                <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Телефон
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  +998 93 911 91 11
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
                <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Website
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  www.narsil.uz
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {["Telegram", "Instagram", "LinkedIn"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Написать сообщение
          </h3>

          <form className="mt-6 space-y-4">

            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
            />

            <input
              type="text"
              placeholder="Тема"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
            />

            <textarea
              rows={5}
              placeholder="Сообщение..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
            />

            <Button
              type="submit"
              size="lg"
              className="w-full"
            >
              Отправить сообщение
            </Button>
          </form>
        </div>

      </div>

      {/* Bottom */}
      <div className="h-24 bg-linear-to-b from-transparent to-slate-50 dark:to-black" />
    </section>
  );
}