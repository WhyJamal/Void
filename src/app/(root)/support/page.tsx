import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages.config";
import { Search, MessageCircle, Phone, Mail, HelpCircle, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SupportPage() {
  return (
    <section className="w-full bg-white">

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-12 text-center">
        <Image
          src="/logos/favicon.png"
          alt="VOID Logo"
          className="mx-auto"
          width={100}
          height={100}
        />

        <h1 className="text-5xl font-semibold text-slate-900 tracking-tight mt-5">
          Поддержка Bazon
        </h1>

        <p className="mt-5 text-lg text-slate-600 leading-relaxed">
          Найдите ответы на вопросы или свяжитесь с нашей командой поддержки.
        </p>

        {/* Search */}
        <div className="mt-10 relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск в центре поддержки..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
      </div>

      {/* Support options */}
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6 py-10">

        <div className="p-6 border border-slate-100 rounded-2xl hover:shadow-sm transition">
          <MessageCircle className="w-6 h-6 text-slate-900" />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Чат с поддержкой
          </h3>
          <p className="mt-2 text-slate-600 text-sm">
            Получите быстрый ответ от нашей команды.
          </p>
        </div>

        <div className="p-6 border border-slate-100 rounded-2xl hover:shadow-sm transition">
          <Mail className="w-6 h-6 text-slate-900" />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Электронная почта
          </h3>
          <p className="mt-2 text-slate-600 text-sm">
            Напишите нам: info@void.uz
          </p>
        </div>

        <div className="p-6 border border-slate-100 rounded-2xl hover:shadow-sm transition">
          <Phone className="w-6 h-6 text-slate-900" />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Телефон
          </h3>
          <p className="mt-2 text-slate-600 text-sm">
            +998 93 911 91 11
          </p>
        </div>

        <div className="p-6 border border-slate-100 rounded-2xl hover:shadow-sm transition">
          <HelpCircle className="w-6 h-6 text-slate-900" />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Частые вопросы
          </h3>
          <p className="mt-2 text-slate-600 text-sm">
            Ответы на популярные вопросы пользователей.
          </p>
        </div>
      </div>

      {/* Footer help block */}
      <div className="border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">
            Нужна дополнительная помощь?
          </h2>

          <p className="mt-3 text-slate-600">
            Наша команда поддержки работает 24/7.
          </p>


          <Link href={PAGES.CONTACTS} className="text-blue-600 hover:underline mt-2 inline-block">
          <Link2 className="w-4 h-4 inline-block mr-1" />
              Связаться с нами
          </Link>

        </div>
      </div>

    </section>
  );
}