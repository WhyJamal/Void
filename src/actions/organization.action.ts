"use server"

import { OrganizationWorkspace } from "@/types/account.types";
import { getUniqueSlug, normalizeText, requireUser } from "@/utils/account.utils";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PAGES } from "@/config/pages.config";

const ACCOUNT_ROOT = PAGES.ACCOUNT;

export type OrganizationActionState = {
  success: boolean;
  message?: string;
};

async function getCurrentOrganization(userId: string): Promise<OrganizationWorkspace | null> {
  return prisma.organization.findFirst({
    where: {
      OR: [{ ownerId: userId }, { members: { some: { userId } } }],
    },
    orderBy: { createdAt: "desc" },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      members: {
        orderBy: [{ joinedAt: "asc" }],
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      products: {
        include: {
          product: {
            select: {
              id: true,
              slug: true,
              title: true,
              subtitle: true,
              badge: true,
              image: true,
              imageAlt: true,
              featured: true,
            },
          },
        },
      },
      projects: {
        orderBy: [{ dueDate: "asc" }, { createdAt: "asc" }],
        include: {
          product: {
            select: {
              id: true,
              slug: true,
              title: true,
              subtitle: true,
              badge: true,
              image: true,
              imageAlt: true,
              featured: true,
            },
          },
          pricingPlan: {
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              currency: true,
              billingPeriod: true,
              isPopular: true,
              seats: true,
            },
          },
        },
      },
    },
  }) as Promise<OrganizationWorkspace | null>;
}

export async function createOrganizationAction(
  _prevState: OrganizationActionState,
  formData: FormData,
): Promise<OrganizationActionState> {
  const user = await requireUser();

  const existing = await getCurrentOrganization(user.id);
  if (existing) {
    return {
      success: false,
      message: "У вас уже есть организация",
    };
  }

  const name = normalizeText(formData.get("name"));
  const inn = normalizeText(formData.get("inn"));
  const description = normalizeText(formData.get("description"));
  const logo = normalizeText(formData.get("logo"));
  const productId = normalizeText(formData.get("productId"));

  if (!name) {
    return {
      success: false,
      message: "Введите название организации",
    };
  }

  if (inn) {
    const existingInn = await prisma.organization.findUnique({
      where: { inn },
      select: { id: true },
    });

    if (existingInn) {
      return {
        success: false,
        message: "Организация с таким ИНН уже существует",
      };
    }
  }

  const slug = await getUniqueSlug(name, async (candidate) => {
    const row = await prisma.organization.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    return Boolean(row);
  });

  await prisma.organization.create({
    data: {
      name,
      slug,
      inn,
      description: description || null,
      logo: logo || null,
      ownerId: user.id,
      members: {
        create: {
          userId: user.id,
          role: "OWNER",
        },
      },
      ...(productId
        ? {
          products: {
            create: {
              productId,
            },
          },
        }
        : {}),
    },
  });

  revalidatePath(ACCOUNT_ROOT);
  revalidatePath(`${ACCOUNT_ROOT}/organization`);

  return {
    success: true,
  };
}

export async function updateOrganizationAction(formData: FormData) {
  const user = await requireUser();

  const organizationId = normalizeText(formData.get("organizationId"));
  const name = normalizeText(formData.get("name"));
  const slugInput = normalizeText(formData.get("slug"));
  const description = normalizeText(formData.get("description"));
  const logo = normalizeText(formData.get("logo"));

  if (!organizationId) {
    throw new Error("Организация не найдена");
  }

  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: { id: true, ownerId: true, slug: true },
  });

  if (!organization) {
    throw new Error("Организация не найдена");
  }

  if (organization.ownerId !== user.id) {
    throw new Error("Недостаточно прав");
  }

  const nextSlug = slugInput || organization.slug;
  const slug =
    nextSlug === organization.slug
      ? organization.slug
      : await getUniqueSlug(nextSlug, async (candidate) => {
        const row = await prisma.organization.findUnique({
          where: { slug: candidate },
          select: { id: true },
        });
        return Boolean(row) && row.id !== organization.id;
      });

  await prisma.organization.update({
    where: { id: organization.id },
    data: {
      name: name || undefined,
      slug,
      description: description || null,
      logo: logo || null,
    },
  });

  revalidatePath(ACCOUNT_ROOT);
  revalidatePath(`${ACCOUNT_ROOT}/organization`);
}

export async function linkProductToOrganizationAction(formData: FormData) {
  const user = await requireUser();

  const organizationId = normalizeText(formData.get("organizationId"));
  const productId = normalizeText(formData.get("productId"));

  if (!organizationId || !productId) {
    throw new Error("Выберите организацию и продукт");
  }

  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: { id: true, ownerId: true },
  });

  if (!organization || organization.ownerId !== user.id) {
    throw new Error("Недостаточно прав");
  }

  await prisma.organizationProduct.upsert({
    where: {
      organizationId_productId: {
        organizationId,
        productId,
      },
    },
    update: {},
    create: {
      organizationId,
      productId,
    },
  });

  revalidatePath(ACCOUNT_ROOT);
  revalidatePath(`${ACCOUNT_ROOT}/organization`);
  revalidatePath(`${ACCOUNT_ROOT}/projects`);
}