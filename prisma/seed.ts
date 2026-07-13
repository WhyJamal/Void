import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const password = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "owner@void.app" },
    update: {},
    create: {
      name: "Owner",
      email: "owner@void.app",
      password,
    },
  });

  const organization = await prisma.organization.upsert({
    where: { slug: "void-studio" },
    update: {},
    create: {
      name: "Void Studio",
      slug: "void-studio",
      ownerId: user.id,
      members: {
        create: {
          user: { connect: { id: user.id } },
          role: "OWNER",
        },
      },
    },
  });

  const products = [
    {
      slug: "retail-commerce",
      title: "Розница и торговля",
      subtitle: "Аналитика в реальном времени по всем отделам в единой панели управления.",
      badge: "Новинка",
      description: "Платформа для магазинов, сетей и дистрибуции с понятной аналитикой и управлением запасами.",
      image: "/images/products/stock-market.webp",
      imageAlt: "Розница и торговля",
      featured: true,
      themeFrom: "#ffffff",
      themeVia: "#fff7ed",
      themeTo: "#fef3c7",
      glow1: "bg-yellow-200/40",
      glow2: "bg-orange-200/30",
      solutionSection: {
        badge: "Решения для розничной торговли",
        title:
          "Повышение эффективности и роста в розничной торговле с помощью единой цифровой платформы",
        description:
          "Оптимизируйте операции, улучшайте клиентский опыт и принимайте решения на основе данных в реальном времени.",

        media: {
          type: "image",
          src: "/images/products/stock-market.webp",
          alt: "Розничный магазин",
        },

        listTitle:
          "Решения помогут вам в решении следующих задач:",

        items: [
          {
            text: "Централизация данных о продажах и клиентах",
          },
          {
            text: "Оптимизация управления запасами",
          },
          {
            text: "Автоматизация процессов продаж",
          },
        ],

        ctaLabel: "Читать информационный документ",
        ctaHref: "/docs/retail-brief.pdf",
      },
    },
    {
      slug: "team-erp",
      title: "Командный ERP",
      subtitle: "Задачи, роли, дедлайны и контроль процессов в одном продукте.",
      badge: "Популярно",
      description: "Внутренний продукт для управления проектами, сотрудниками и процессами компании.",
      image: "/images/showcase/photo-1552664730-d307ca884978.webp",
      imageAlt: "Командный ERP",
      featured: false,
      themeFrom: "#eff6ff",
      themeVia: "#dbeafe",
      themeTo: "#bfdbfe",
      glow1: "bg-blue-200/35",
      glow2: "bg-sky-200/25",
      solutionSection: {
        badge: "Решения для розничной торговли",
        title:
          "Повышение эффективности и роста в розничной торговле с помощью единой цифровой платформы",
        description:
          "Оптимизируйте операции, улучшайте клиентский опыт и принимайте решения на основе данных в реальном времени.",

        media: {
          type: "image",
          src: "/images/products/stock-market.webp",
          alt: "Розничный магазин",
        },

        listTitle:
          "Решения помогут вам в решении следующих задач:",

        items: [
          {
            text: "Централизация данных о продажах и клиентах",
          },
          {
            text: "Оптимизация управления запасами",
          },
          {
            text: "Автоматизация процессов продаж",
          },
        ],

        ctaLabel: "Читать информационный документ",
        ctaHref: "/docs/retail-brief.pdf",
      },
    },
    {
      slug: "finance-analytics",
      title: "Финансы и аналитика",
      subtitle: "Отчеты, бюджеты и прозрачная картина по деньгам и эффективности.",
      badge: "Для роста",
      description: "Финансовый модуль для руководителей, аналитиков и операционных команд.",
      image: "/images/showcase/photo-1551288049-bebda4e38f71.webp",
      imageAlt: "Финансы и аналитика",
      featured: false,
      themeFrom: "#f8fafc",
      themeVia: "#e2e8f0",
      themeTo: "#cbd5e1",
      glow1: "bg-slate-200/40",
      glow2: "bg-zinc-200/25",
      solutionSection: {
        badge: "Решения для розничной торговли",
        title:
          "Повышение эффективности и роста в розничной торговле с помощью единой цифровой платформы",
        description:
          "Оптимизируйте операции, улучшайте клиентский опыт и принимайте решения на основе данных в реальном времени.",

        media: {
          type: "image",
          src: "/images/products/stock-market.webp",
          alt: "Розничный магазин",
        },

        listTitle:
          "Решения помогут вам в решении следующих задач:",

        items: [
          {
            text: "Централизация данных о продажах и клиентах",
          },
          {
            text: "Оптимизация управления запасами",
          },
          {
            text: "Автоматизация процессов продаж",
          },
        ],

        ctaLabel: "Читать информационный документ",
        ctaHref: "/docs/retail-brief.pdf",
      },
    },
  ] as const;

  const dbProducts = [] as Array<{ id: string; slug: string; title: string }>;

  for (const product of products) {
    const item = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        title: product.title,
        subtitle: product.subtitle,
        badge: product.badge,
        description: product.description,
        image: product.image,
        imageAlt: product.imageAlt,
        featured: product.featured,
        themeFrom: product.themeFrom,
        themeVia: product.themeVia,
        themeTo: product.themeTo,
        glow1: product.glow1,
        glow2: product.glow2,
      },
      create: {
        ...product,
      },
      select: { id: true, slug: true, title: true },
    });

    dbProducts.push(item);
  }

  const retail = dbProducts.find((item) => item.slug === "retail-commerce");
  const team = dbProducts.find((item) => item.slug === "team-erp");
  const finance = dbProducts.find((item) => item.slug === "finance-analytics");

  if (!retail || !team || !finance) {
    throw new Error("Не удалось создать продукты");
  }

  const retailProject = await prisma.project.upsert({
    where: { slug: "retail-rollout-2026" },
    update: {},
    create: {
      name: "Retail Rollout 2026",
      slug: "retail-rollout-2026",
      description: "Пилотный запуск для сети магазинов.",
      organizationId: organization.id,
      productId: retail.id,
      status: "ACTIVE",
      startsAt: new Date("2026-01-05T00:00:00.000Z"),
      endsAt: new Date("2026-07-01T00:00:00.000Z"),
      dueDate: new Date("2026-06-30T00:00:00.000Z"),
      budget: 250000,
    },
  });

  const teamProject = await prisma.project.upsert({
    where: { slug: "internal-workspace-v2" },
    update: {},
    create: {
      name: "Internal Workspace v2",
      slug: "internal-workspace-v2",
      description: "Обновление внутренней системы для команды.",
      organizationId: organization.id,
      productId: team.id,
      status: "PLANNING",
      startsAt: new Date("2026-02-01T00:00:00.000Z"),
      endsAt: new Date("2026-08-01T00:00:00.000Z"),
      dueDate: new Date("2026-07-20T00:00:00.000Z"),
      budget: 180000,
    },
  });

  await prisma.project.upsert({
    where: { slug: "finance-suite-migration" },
    update: {},
    create: {
      name: "Finance Suite Migration",
      slug: "finance-suite-migration",
      description: "Миграция финансовых отчетов и аналитики.",
      organizationId: organization.id,
      productId: finance.id,
      status: "ON_HOLD",
      startsAt: new Date("2026-03-10T00:00:00.000Z"),
      endsAt: new Date("2026-09-10T00:00:00.000Z"),
      dueDate: new Date("2026-08-15T00:00:00.000Z"),
      budget: 220000,
    },
  });

  await prisma.organizationProduct.createMany({
    data: [
      { organizationId: organization.id, productId: retail.id },
      { organizationId: organization.id, productId: team.id },
      { organizationId: organization.id, productId: finance.id },
    ],
  });

  const pricingPlans = [
    {
      productId: retail.id,
      name: "Старт",
      slug: "starter",
      description: "Для небольших торговых команд.",
      price: 49000,
      currency: "USD",
      billingPeriod: "MONTHLY",
      features: ["1 магазин", "Базовая аналитика", "Email-поддержка"],
      isPopular: false,
      seats: 5,
    },
    {
      productId: retail.id,
      name: "Рост",
      slug: "growth",
      description: "Для сетей и расширения ассортимента.",
      price: 99000,
      currency: "USD",
      billingPeriod: "MONTHLY",
      features: ["До 10 магазинов", "Сквозная аналитика", "Роли и права", "Приоритетная поддержка"],
      isPopular: true,
      seats: 20,
    },
    {
      productId: retail.id,
      name: "Пилот проекта",
      slug: "pilot-project",
      description: "Спецусловия для запуска пилота.",
      price: 150000,
      currency: "USD",
      billingPeriod: "ONE_TIME",
      features: ["Настройка под сеть", "Обучение команды", "Запуск за 30 дней"],
      isPopular: false,
      seats: 10,
    },
    {
      productId: team.id,
      name: "Команда",
      slug: "team",
      description: "Для рабочих групп и отделов.",
      price: 30000,
      currency: "USD",
      billingPeriod: "MONTHLY",
      features: ["Задачи и дедлайны", "Канбан", "Комментарии"],
      isPopular: true,
      seats: 15,
    },
    {
      productId: team.id,
      name: "Корпоративный проект",
      slug: "enterprise-project",
      description: "Тариф под внедрение в компанию.",
      price: 120000,
      currency: "USD",
      billingPeriod: "MONTHLY",
      features: ["Больше ролей", "Расширенный аудит", "SLA и внедрение"],
      isPopular: false,
      seats: 50,
    },
    {
      productId: finance.id,
      name: "Аналитика",
      slug: "analytics",
      description: "Пакет для контроля финансов.",
      price: 45000,
      currency: "USD",
      billingPeriod: "MONTHLY",
      features: ["Отчеты", "Бюджеты", "Графики"],
      isPopular: true,
      seats: 8,
    },
  ] as const;

  for (const plan of pricingPlans) {
    const existingPlan = await prisma.pricingPlan.findFirst({
      where: {
        productId: plan.productId,
        slug: plan.slug,
      },
    })

    if (existingPlan) {
      await prisma.pricingPlan.update({
        where: { id: existingPlan.id },
        data: {
          name: plan.name,
          description: plan.description,
          price: plan.price,
          currency: plan.currency,
          billingPeriod: plan.billingPeriod,
          features: plan.features,
          isPopular: plan.isPopular,
          seats: plan.seats,
        },
      });
      continue;
    }

    await prisma.pricingPlan.create({
      data: {
        ...plan,
      },
    });
  }

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
