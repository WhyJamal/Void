"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

type RegisterInput = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export async function registerAction(data: RegisterInput) {
    const { name, email, password, confirmPassword } = data;

    const exists = await prisma.user.findUnique({
        where: { email },
    });

    if (exists) {
        throw new Error("Этот email уже зарегистрирован");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return { ok: true };
}