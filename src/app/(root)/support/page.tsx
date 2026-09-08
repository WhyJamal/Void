import { Logo, LogoType } from "@/components/logo";
import { PAGES } from "@/config/pages.config";
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  Link2,
} from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <section className="w-full bg-white dark:bg-black transition-colors">

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-12 text-center">
        <div className="flex justify-center">
          <Logo logo={LogoType.secondary} />
        </div>

        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Поддержка Narsil
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Найдите ответы на вопросы или свяжитесь с нашей командой поддержки.
        </p>

        {/* Search */}
        <div className="relative mt-10 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

          <input
            type="text"
            placeholder="Поиск в центре поддержки..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition
            focus:ring-2 focus:ring-slate-200
            dark:border-slate-800
            dark:bg-slate-900
            dark:text-white
            dark:placeholder:text-slate-500
            dark:focus:ring-slate-700"
          />
        </div>
      </div>

      {/* Support options */}
      <div className="max-w-5xl mx-auto grid gap-6 px-6 py-10 md:grid-cols-2">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
          <MessageCircle className="h-6 w-6 text-slate-900 dark:text-white" />

          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            Чат с поддержкой
          </h3>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Получите быстрый ответ от нашей команды.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
          <Mail className="h-6 w-6 text-slate-900 dark:text-white" />

          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            Электронная почта
          </h3>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            info@narsil.uz
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
          <Phone className="h-6 w-6 text-slate-900 dark:text-white" />

          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            Телефон
          </h3>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            +998 93 911 91 11
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
          <HelpCircle className="h-6 w-6 text-slate-900 dark:text-white" />

          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            Частые вопросы
          </h3>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Ответы на популярные вопросы пользователей.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Нужна дополнительная помощь?
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Наша команда поддержки работает 24/7.
          </p>

          <Link
            href={PAGES.CONTACTS}
            className="mt-5 inline-flex items-center gap-2 text-blue-600 transition hover:underline dark:text-blue-400"
          >
            <Link2 className="h-4 w-4" />
            Связаться с нами
          </Link>

        </div>
      </div>

    </section>
  );
}