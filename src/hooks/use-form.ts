"use client";

import { useState } from "react";
import { z } from "zod";

type UseFormOptions<T> = {
  initialValues: T;
  schema: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void> | void;
};

export function useForm<T extends Record<string, any>>({
  initialValues,
  schema,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const result = schema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      await onSubmit(result.data);
    } finally {
      setLoading(false);
    }
  };

  const validateField = (name: keyof T): boolean => {
    const result = schema.safeParse(values);
    const fieldError = result.error?.issues.find(
      (err) => err.path[0] === name
    )?.message;

    setErrors((prev) => ({ ...prev, [name as string]: fieldError ?? "" }));
    return !fieldError;
  };

  return {
    values,
    errors,
    loading,
    validateField,
    handleChange,
    handleSubmit,
    setValues,
  };
}