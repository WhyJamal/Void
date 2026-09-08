"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PAGES } from "@/config/pages.config";
import { getCurrentOrganization } from "@/actions/account.actions";
import { normalizeText, getUniqueSlug, requireUser } from "@/utils/account.utils";

/**
 * Pricing/Product sahifasidagi "Tarifni tanlash" tugmasi shu action'ga
 * ulanadi. Foydalanuvchi tizimga kirmagan bo'lsa — `requireUser()`
 * avtomatik sign-in sahifasiga yo'naltiradi. Tashkiloti bo'lmasa —
 * o'zi uchun standart tashkilot avtomatik yaratiladi (foydalanuvchini
 * "avval tashkilot tuzing" degan alohida qadamda to'xtatib qo'ymaslik
 * uchun) — u buni keyin Account → Organization bo'limida tahrirlashi
 * mumkin.
 */
export async function purchaseProductAction(formData: FormData) {
  const user = await requireUser();

  const productId = normalizeText(formData.get("productId"));
  const pricingPlanId = normalizeText(formData.get("pricingPlanId"));

  if (!productId) {
    throw new Error("Mahsulot tanlanmagan");
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, title: true },
  });
  if (!product) {
    throw new Error("Mahsulot topilmadi");
  }

  let plan: { id: string; productId: string; name: string } | null = null;
  if (pricingPlanId) {
    plan = await prisma.pricingPlan.findUnique({
      where: { id: pricingPlanId },
      select: { id: true, productId: true, name: true },
    });
    if (!plan || plan.productId !== productId) {
      throw new Error("Tanlangan tarif bu mahsulotga tegishli emas");
    }
  }

  let organization = await getCurrentOrganization(user.id);

  if (!organization) {
    const baseName = user.name?.trim() || user.email.split("@")[0];
    const orgName = `${baseName} — ishchi maydon`;
    const slug = await getUniqueSlug(orgName, async (candidate) => {
      const row = await prisma.organization.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });
      return Boolean(row);
    });

    await prisma.organization.create({
      data: {
        name: orgName,
        slug,
        ownerId: user.id,
        members: {
          create: { userId: user.id, role: "OWNER" },
        },
      },
    });

    organization = await getCurrentOrganization(user.id);
  }

  if (!organization) {
    throw new Error("Tashkilot yaratib bo'lmadi");
  }

  await prisma.organizationProduct.upsert({
    where: {
      organizationId_productId: {
        organizationId: organization.id,
        productId: product.id,
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      productId: product.id,
    },
  });

  // Bir xil mahsulot + tarif uchun ikkinchi marta "xarid" bosilsa,
  // dublikat loyiha yaratilmaydi — mavjudi qaytariladi.
  const existingProject = await prisma.project.findFirst({
    where: {
      organizationId: organization.id,
      productId: product.id,
      pricingPlanId: plan?.id ?? null,
    },
    select: { id: true },
  });

  if (!existingProject) {
    const projectName = plan ? `${product.title} — ${plan.name}` : product.title;
    const slug = await getUniqueSlug(projectName, async (candidate) => {
      const row = await prisma.project.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });
      return Boolean(row);
    });

    await prisma.project.create({
      data: {
        organizationId: organization.id,
        productId: product.id,
        pricingPlanId: plan?.id ?? null,
        name: projectName,
        status: "ACTIVE",
        slug,
      },
    });
  }

  revalidatePath(PAGES.ACCOUNT);
  revalidatePath(PAGES.ACCOUNT_PROJECTS);
  revalidatePath(PAGES.ACCOUNT_ORGANIZATION);

  redirect(`${PAGES.ACCOUNT_PROJECTS}?purchased=1`);
}
