import { Button } from "@/components/ui/button";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <section className="w-full">

      {/* Header */}
      <div className="bg-linear-to-r from-emerald-50 via-green-100 to-teal-100">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-slate-900">
            Связаться с нами
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Мы всегда открыты для новых проектов, партнерств и вопросов.
            Напишите нам — мы ответим в ближайшее время.
          </p>
        </div>

        <div className="h-20 bg-linear-to-b from-transparent to-white" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16">

        {/* Left info */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Контактная информация
          </h2>

          <p className="mt-6 text-slate-600 leading-7">
            Вы можете связаться с нами любым удобным способом.
          </p>

          <div className="space-y-5 text-slate-700">

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-500" />
              <p>Фергана, Узбекистан</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-emerald-500" />
              <p>info@void.uz</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-emerald-500" />
              <p>+998 93 911 91 11</p>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-500" />
              <p>www.void.uz</p>
            </div>

          </div>

          <div className="mt-10 flex gap-3">
            <span className="px-4 py-2 rounded-full bg-slate-100 text-sm">
              Telegram
            </span>
            <span className="px-4 py-2 rounded-full bg-slate-100 text-sm">
              Instagram
            </span>
            <span className="px-4 py-2 rounded-full bg-slate-100 text-sm">
              LinkedIn
            </span>
          </div>
        </div>

        {/* Right form */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">
            Написать сообщение
          </h3>

          <form className="mt-6 space-y-4">

            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <input
              type="text"
              placeholder="Тема"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <textarea
              placeholder="Сообщение..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <Button type="submit" className="w-full" size="lg">
              Отправить сообщение
            </Button>
          </form>
        </div>

      </div>

      {/* Bottom soft section */}
      <div className="h-24 bg-linear-to-b from-transparent to-slate-50" />
    </section>
  );
}