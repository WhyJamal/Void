"use client";

import { Button } from "@/components/ui/button";
import { AuthFieldRow } from "@components/auth/auth-field-row";
import { ArrowActionButton } from "@components/auth/arrow-action-button";
import { useState } from "react";

export default function SignInCard() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!email) return;

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setStep("password");
  };

  return (
    <div className="w-full max-w-105">
      <p className="mb-7 text-center text-[18px] leading-7 text-neutral-700">
        Войдите в систему, используя свою учетную запись.
      </p>

      <div className="overflow-hidden rounded-2xl border border-neutral-300 shadow-sm">
        <AuthFieldRow
          label="Имя пользователя или Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={step === "password"}
          containerClassName={`border-b px-5 py-3 transition-colors duration-300 ${
            step === "password"
              ? "bg-[#dfeaf8] border-neutral-300"
              : email
              ? "bg-yellow-100 border-neutral-200"
              : "bg-white border-neutral-200"
          }`}
        />

        {step === "password" && (
          <AuthFieldRow
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            containerClassName={`relative px-5 py-3 pr-14 transition-colors duration-300 ${
              password ? "bg-yellow-100" : "bg-white"
            }`}
          >
            <ArrowActionButton
              className="absolute right-4 top-6 h-11 w-11 rounded-full border-2 border-neutral-400 bg-transparent hover:bg-white/40"
            />
          </AuthFieldRow>
        )}

        {step === "email" && email && (
          <div className="relative">
            <ArrowActionButton
              onClick={handleNext}
              loading={loading}
              variant="outline"
              className="absolute right-4 -top-15 h-11 w-11 rounded-full border-2 border-neutral-400 bg-transparent hover:bg-white/40"
            />
          </div>
        )}
      </div>

      <div className="mt-7 text-center">
        <Button variant="link" className="p-0 text-[17px] text-blue-600">
          Забыли пароль?
        </Button>
      </div>

    </div>
  );
}