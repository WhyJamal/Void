"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { updateOrganizationAction } from "@/actions/organization.action";

type OrganizationEditorProps = {
  organization: {
    id: string;
    name: string;
    slug: string;
    inn: string | null;
    description: string | null;
    logo: string | null;
  };
};

export function OrganizationEditor({ organization }: OrganizationEditorProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#f0f0f0] text-2xl font-bold text-black/25">
            {organization.logo ? (
              <img
                src={organization.logo}
                alt={organization.name}
                className="h-full w-full object-cover"
              />
            ) : (
              organization.name.slice(0, 1).toUpperCase()
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-[#1d1d1f] leading-tight">
              {organization.name}
            </h2>
            <p className="text-sm text-black/40 mt-0.5">@{organization.slug}</p>
            {organization.description && (
              <p className="mt-2 text-sm leading-6 text-black/55 max-w-lg">
                {organization.description}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
          className="inline-flex shrink-0 rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-[#1d1d1f] transition hover:bg-black/10"
        >
          {isEditing ? "Отмена" : "Изменить"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isEditing && (
          <motion.div
            key="edit-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="h-px bg-black/5 mb-6" />

            <form
              action={async (formData) => {
                await updateOrganizationAction(formData);
                setIsEditing(false);
              }}
              className="space-y-5"
            >
              <input type="hidden" name="organizationId" value={organization.id} />

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#1d1d1f]">Настройки</h3>
                <p className="text-sm text-black/40">Название, slug и описание.</p>
              </div>

              <div className="space-y-4">
                <Field label="Название" name="name" defaultValue={organization.name} />
                <Field label="Slug" name="slug" defaultValue={organization.slug} />
                <Field
                  label="ИНН"
                  value={organization.inn ?? "—"}
                  readOnly
                  hint="ИНН изменить нельзя"
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#1d1d1f]">Описание</label>
                  <textarea
                    name="description"
                    rows={4}
                    defaultValue={organization.description ?? ""}
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#1d1d1f] outline-none transition focus:border-black/25"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex rounded-full bg-[#1d1d1f] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-black/80"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({
  label,
  name,
  defaultValue,
  value,
  placeholder,
  readOnly,
  hint,
}: {
  label: string;
  name?: string;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-[#1d1d1f]">{label}</label>
        {hint && <span className="text-xs text-black/35">{hint}</span>}
      </div>
      <input
        name={name}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-[#1d1d1f] outline-none transition focus:border-black/25 read-only:bg-[#f5f5f7] read-only:text-black/45"
      />
    </div>
  );
}