"use server";

import { prisma } from "@/lib/prisma";
import type { IProduct, IPricingPlan, IProjectBrief } from "@/types/product.types";
import type {
  PrismaProductWithRelations,
} from "@/types/prisma.types";

type PrismaProduct = any;

function toProjectBrief(project: any): IProjectBrief {
  return {
    id: project.id,
    name: project.name,
    slug: project.slug,
    description: project.description,
    status: project.status,
    dueDate: project.dueDate ? project.dueDate.toISOString() : null,
    organizationName: project.organization?.name ?? null,
    organizationSlug: project.organization?.slug ?? null,
  };
}

function toPricingPlan(plan: any): IPricingPlan {
  return {
    id: plan.id,
    name: plan.name,
    slug: plan.slug,
    description: plan.description,
    price: plan.price,
    currency: plan.currency,
    billingPeriod: plan.billingPeriod,
    features: Array.isArray(plan.features) ? plan.features.map((item: string) => String(item)) : [],
    isPopular: plan.isPopular,
    seats: plan.seats,
    projectName: plan.project?.name ?? null,
    projectSlug: plan.project?.slug ?? null,
  };
}

function toProduct(product: PrismaProductWithRelations): IProduct {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    subtitle: product.subtitle,
    image: product.image,
    imageAlt: product.imageAlt,
    badge: product.badge,
    description: product.description,
    featured: product.featured,
    theme: {
      from: product.themeFrom,
      via: product.themeVia,
      to: product.themeTo,
      glow1: product.glow1,
      glow2: product.glow2,
    },
    solutionSection: product.solutionSection ?? null,
    
    pricingPlans:
      product.pricingPlans?.map((plan) =>
        toPricingPlan({
          ...plan,
          project: plan.project ?? null,
        }),
      ) ?? [],
    projects:
      product.projects?.map((project) =>
        toProjectBrief({
          ...project,
          organization: project.organization ?? null,
        }),
      ) ?? [],
  };
}

const productIncludes = {
  pricingPlans: {
    orderBy: [{ isPopular: "desc" as const }, { price: "asc" as const }],
    // include: {
    //   project: {
    //     select: {
    //       name: true,
    //       slug: true,
    //     },
    //   },
    // },
  },
  projects: {
    orderBy: [{ dueDate: "asc" as const }, { createdAt: "asc" as const }],
    include: {
      organization: { 
        select: {
          name: true,
          slug: true,
        },
      },
    },
  },
} as const;

export async function getProductsAction() {
  const products = await prisma.product.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
    include: productIncludes,
  });

  return products.map(toProduct);
}

export async function getProductByIdAction(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: productIncludes,
  });

  return product ? toProduct(product) : null;
}

export async function getPricingProductsAction() {
  const products = await prisma.product.findMany({
    orderBy: [{ featured: "desc" }, { title: "asc" }],
    include: productIncludes,
  });

  return products.map((product: PrismaProductWithRelations) => {
    const mapped = toProduct(product);
    return {
      ...mapped,
      pricingPlans: mapped.pricingPlans?.filter(Boolean) ?? [],
    };
  });
}
