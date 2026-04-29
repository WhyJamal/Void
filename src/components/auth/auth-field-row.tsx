"use client";

import type { ChangeEvent, ReactNode } from "react";
import { Input } from "@/components/ui/input";

type AuthFieldRowProps = {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  containerClassName: string;
  inputClassName?: string;
  disabled?: boolean;
  children?: ReactNode;
};

export function AuthFieldRow({
  label,
  type,
  value,
  onChange,
  placeholder,
  containerClassName,
  inputClassName = "",
  disabled = false,
  children,
}: AuthFieldRowProps) {
  return (
    <div className={containerClassName}>
      <label className="mb-1 block text-sm text-neutral-500">{label}</label>

      <Input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`h-10 border-0 bg-transparent p-0 text-[22px] shadow-none focus-visible:ring-0 ${inputClassName}`}
      />

      {children}
    </div>
  );
}