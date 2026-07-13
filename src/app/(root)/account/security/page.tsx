import { changePasswordAction, getAccountWorkspaceAction } from "@/actions/account.actions";

export const dynamic = "force-dynamic";

export default async function SecurityPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <header className="space-y-1">
        <p className="text-xs font-semibold tracking-[0.22em] text-black/35 uppercase">
          Безопасность
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">
          Пароль и доступ
        </h1>
        <p className="text-sm text-black/40 mt-1">
          Обновляйте пароль и держите доступ под контролем.
        </p>
      </header>

      <div className="h-px bg-black/5" />

      {/* Password form — flat */}
      <form action={changePasswordAction} className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-[#1d1d1f]">
            Сменить пароль
          </h2>
          <p className="text-sm text-black/40">Минимум 8 символов.</p>
        </div>

        <div className="space-y-4">
          <Field label="Текущий пароль" name="currentPassword" type="password" />
          <Field label="Новый пароль" name="newPassword" type="password" />
          <Field label="Повторите новый пароль" name="confirmPassword" type="password" />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex rounded-full bg-[#1d1d1f] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-black/80"
          >
            Обновить пароль
          </button>
        </div>
      </form>

      <div className="h-px bg-black/5" />

      {/* Info row */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-[#1d1d1f]">
          Подсказка
        </h2>
        <p className="text-sm leading-6 text-black/50 max-w-xl">
          Если пароль потерян, используйте восстановление через email.
          Сейчас здесь минимальный безопасный поток.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-[#1d1d1f]">{label}</label>
      <input
        name={name}
        type={type}
        className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-[#1d1d1f] outline-none transition focus:border-black/25"
      />
    </div>
  );
}
