import type {
  Product,
  PricingPlan,
  Project,
  Organization,
  OrganizationProduct,
  Prisma
} from "@/generated/prisma/client";


export type OrganizationWithRelations =
  Prisma.OrganizationGetPayload<{
    include: {
      members: {
        include: {
          user: true;
        };
      };
      projects: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
  
/**
 * Extended Prisma Product type with relations
 */
export type PrismaProductWithRelations = Product & {
  pricingPlans: (PricingPlan & {
    project?: Pick<Project, "id" | "name" | "slug"> | null;
  })[];

  projects: (Project & {
    organization?: Pick<Organization, "id" | "name" | "slug"> | null;
  })[];

  organizations?: OrganizationProduct[];
};

/**
 * PricingPlan with optional project relation
 */
export type PrismaPricingPlanWithProject = PricingPlan & {
  project?: Pick<Project, "id" | "name" | "slug"> | null;
};

/**
 * Project with organization relation
 */
export type PrismaProjectWithOrganization = Project & {
  organization?: Pick<Organization, "id" | "name" | "slug"> | null;
};

/**
 * Safe JSON type for Prisma Json fields
 */
export type PrismaJson =
  | string
  | number
  | boolean
  | null
  | PrismaJson[]
  | { [key: string]: PrismaJson };