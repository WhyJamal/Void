"use client";

import { AuthFieldRow } from "@components/auth/auth-field-row";
import { ArrowActionButton } from "@components/auth/arrow-action-button";
import { useState } from "react";
import { registerAction } from "@actions/register.action";
import { useForm } from "@/hooks/use-form";
import { signUpSchema } from "@/schema/sign-up-schema";

export default function SignUpCard() {
  const [step, setStep] = useState<"base" | "password">("base");

  const {
    values: form,
    errors,
    loading,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    schema: signUpSchema,
    onSubmit: async (data) => {
      await registerAction(data);
    },
  });

  const handleNext = async () => {
    setStep("password");
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
          name="name"
          value={form.name}
          error={errors.name}
          onChange={handleChange}
          placeholder="Введите имя"
          containerClassName={`border-b px-5 py-3 transition-colors duration-300 ${step === "password"
            ? "bg-[#dfeaf8] border-neutral-300"
            : form.name
              ? "bg-yellow-100 border-neutral-200"
              : "bg-white border-neutral-200"
            }`}
        />

        <AuthFieldRow
          label="Электронная почта"
          type="email"
          name="email"
          value={form.email}
          error={errors.email}
          onChange={handleChange}
          placeholder="Введите email"
          containerClassName={`relative border-b px-5 py-3 transition-colors duration-300 ${step === "password"
            ? "bg-[#dfeaf8] border-neutral-300"
            : form.email
              ? "bg-yellow-100 border-neutral-200"
              : "bg-white border-neutral-200"
            }`}
        >
          {step === "base" && form.name && form.email && (
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
              name="password"
              error={errors.password}
              value={form.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              containerClassName={`border-b px-5 py-3 transition-colors duration-300 ${form.password
                ? "bg-yellow-100 border-neutral-200"
                : "bg-white border-neutral-200"
                }`}
            />

            <AuthFieldRow
              label="Подтвердите пароль"
              type="password"
              name="confirmPassword"
              error={errors.confirmPassword}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Повторите пароль"
              containerClassName={`relative px-5 py-3 pr-14 transition-colors duration-300 ${form.confirmPassword ? "bg-yellow-100" : ""
                }`}
            >
              {form.password && form.confirmPassword && (
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