"use client";

export default function AuthLayoutSkeleton() {
    return (
        <div className="min-h-screen bg-white px-4 py-4 animate-pulse">
            <div className="mx-auto w-full max-w-5xl space-y-9">

                <div className="flex items-center justify-between border-b border-neutral-300 pb-4">
                    <div className="h-8 w-32 rounded bg-neutral-200" />
                    <div className="h-6 w-20 rounded bg-neutral-200" />
                </div>

                <div className="flex items-center justify-center">
                    <div className="flex h-22 w-22 items-center justify-center rounded-3xl bg-neutral-200 ring-1 ring-black/10" />
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-md space-y-4">
                        <div className="h-10 w-full rounded bg-neutral-200" />
                        <div className="h-10 w-full rounded bg-neutral-200" />
                        <div className="h-10 w-full rounded bg-neutral-200" />
                        <div className="h-10 w-1/2 mx-auto rounded bg-neutral-200" />
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200" />

                    <div className="h-5 w-64 mx-auto rounded bg-neutral-200" />
                </div>

            </div>
        </div>
    );
}