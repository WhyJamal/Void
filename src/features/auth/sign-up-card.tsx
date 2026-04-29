"use client";

import { AuthFieldRow } from "@components/auth/auth-field-row";
import { ArrowActionButton } from "@components/auth/arrow-action-button";
import { useState } from "react";

export default function SignUpCard() {
  const [step, setStep] = useState<"base" | "password">("base");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    setStep("password");
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);

    alert("Успешная регистрация 🚀");
  };

  return (
    <div className="w-full max-w-105">
      <p className="mb-7 text-center text-[18px] leading-7 text-neutral-700">
        Создайте учетную запись, чтобы продолжить.
      </p>

      <div className="overflow-hidden rounded-2xl border border-neutral-300 shadow-sm">
        <AuthFieldRow
          label="Имя пользователя"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          containerClassName={`border-b px-5 py-3 transition-colors duration-300 ${step === "password"
              ? "bg-[#dfeaf8] border-neutral-300"
              : name
                ? "bg-yellow-100 border-neutral-200"
                : "bg-white border-neutral-200"
            }`}
        />

        <AuthFieldRow
          label="Электронная почта"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
          containerClassName={`relative border-b px-5 py-3 transition-colors duration-300 ${step === "password"
              ? "bg-[#dfeaf8] border-neutral-300"
              : email
                ? "bg-yellow-100 border-neutral-200"
                : "bg-white border-neutral-200"
            }`}
        >
          {step === "base" && name && email && (
            <ArrowActionButton
              onClick={handleNext}
              loading={loading}
              variant="outline"
              className="absolute right-4 top-6 h-11 w-11 rounded-full border-2 border-neutral-400 bg-transparent hover:bg-white/40"
            />
          )}
        </AuthFieldRow>

        {step === "password" && (
          <>
            <AuthFieldRow
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              containerClassName={`border-b px-5 py-3 transition-colors duration-300 ${password
                  ? "bg-yellow-100 border-neutral-200"
                  : "bg-white border-neutral-200"
                }`}
            />

            <AuthFieldRow
              label="Подтвердите пароль"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              containerClassName={`relative px-5 py-3 pr-14 transition-colors duration-300 ${confirmPassword ? "bg-yellow-100" : ""
                }`}
            >
              {password && confirmPassword && (
                <ArrowActionButton
                  onClick={handleSubmit}
                  loading={loading}
                  className="absolute right-4 top-6 h-11 w-11 rounded-full border-2 border-neutral-400 bg-transparent hover:bg-white/40"
                />
              )}
            </AuthFieldRow>
          </>
        )}
      </div>

      <p className="mt-6 text-center text-sm leading-6 text-neutral-500">
        Регистрируясь, вы соглашаетесь с{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">
          условиями использования
        </span>{" "}
        и{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">
          политикой конфиденциальности
        </span>.
      </p>

    </div>
  );
}