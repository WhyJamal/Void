"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PAGES } from "@/config/pages.config";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isSignIn = pathname === PAGES.SIGN_IN;

    return (
        <div className="min-h-screen bg-white px-4 py-4">
            <div className="mx-auto w-full max-w-5xl space-y-9">
                <div className="flex items-center justify-between border-b border-neutral-300 pb-4">
                    <h1 className="text-[32px] font-normal tracking-tight text-neutral-900">
                        {isSignIn ? "Вход" : "Регистрация"}
                    </h1>

                    <Button
                        asChild
                        variant="link"
                        className="text-lg font-normal text-neutral-500"
                    >
                        <Link href={isSignIn ? PAGES.SIGN_UP : PAGES.SIGN_IN}>
                            {isSignIn ? "Sign up" : "Sign in"}
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center justify-center">
                    <div className="flex h-22 w-22 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-black/10">
                        <Image
                            src='/logos/favicon.png'
                            alt='Bazon'
                            width={70}
                            height={70}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    {children}
                </div>

                <div className="mt-10 text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                        <div className="flex items-center gap-1">
                            <div className="h-5 w-4 rounded-full bg-blue-500/90" />
                            <div className="h-5 w-4 rounded-full bg-blue-400/90" />
                        </div>
                    </div>

                    <Button variant="link" className="p-0 text-[16px] text-blue-600">
                        Узнайте, как используются ваши данные...
                    </Button>
                </div>

            </div>
        </div>
    );
}