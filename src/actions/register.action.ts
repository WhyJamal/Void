"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { slugifyText } from "@lib/slug";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

async function makeUniqueOrganizationSlug(baseName: string) {
  const baseSlug = slugifyText(baseName);
  let slug = baseSlug;
  let counter = 2;

  while (await prisma.organization.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
}

export async function registerAction(data: RegisterInput) {
  const { name, email, password, confirmPassword } = data;

  if (password !== confirmPassword) {
    throw new Error("Пароли не совпадают");
  }

  const exists = await prisma.user.findUnique({
    where: { email },
  });

  if (exists) {
    throw new Error("Этот email уже зарегистрирован");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // const orgSlug = await makeUniqueOrganizationSlug(name || email.split("@")[0]);
  // const organization = await prisma.organization.create({
  //   data: {
  //     name: `${name || email.split("@")[0]} workspace`,
  //     slug: orgSlug,
  //     ownerId: user.id,
  //     members: {
  //       create: {
  //         user: { connect: { id: user.id } },
  //         role: "OWNER",
  //       },
  //     },
  //   },
  // });

  return { ok: true };
}
