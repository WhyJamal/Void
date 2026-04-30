import type { MenuItem } from "@/types/header.types";
import CircleUserRound from "@/assets/icons/circle-user-round";
import { Bookmark, Package, Settings } from "lucide-react";
import { PAGES } from "./pages.config";

export const menuItems: MenuItem[] = [
  {
    label: "Продукт",
    columns: [
      {
        title: "Обзор",
        links: [
          { title: "Продукты", href: PAGES.PRODUCTS },
          { title: "Функции", href: "/features" },
          { title: "Интеграции", href: "/integrations" },
          { title: "Безопасность", href: "/security" },
        ],
      },
      {
        title: "Демо",
        links: [
          { title: "Живой просмотр", href: "/demo" },
        ],
      },
    ],
  },

  {
    label: "Решения",
    columns: [
      {
        title: "Для бизнеса",
        links: [
          { title: "Малый бизнес", href: "/use/small-business" },
          { title: "Средний бизнес", href: "/use/mid-market" },
          { title: "Предприятия", href: "/use/enterprise" },
        ],
      },
    ],
  },

  {
    label: "Цены",
    columns: [
      {
        title: "Тарифы",
        links: [
          { title: "Посмотреть цены", href: "/pricing" },
        ],
      },
    ],
  },

  {
    label: "Ресурсы",
    columns: [
      {
        title: "Поддержка",
        links: [
          { title: "Документация", href: "/docs" },
          { title: "Поддержка", href: "/support" },
        ],
      },
    ],
  },

  {
    label: "Компания",
    columns: [
      {
        title: "О нас",
        links: [
          { title: "О компании", href: "/about" },
          { title: "Контакты", href: "/contact" },
        ],
      },
    ],
  },
  {
    label: "profile",
    columns: [
      {
        title: "My Profile",
        links: [
          { title: "Orders", href: "/orders", icon: Package },
          { title: "Your Saves", href: "/saves", icon: Bookmark },
          { title: "Account", href: "/account", icon: Settings },
          { title: "Sign in", href: PAGES.SIGN_IN, icon: CircleUserRound },
        ],
      },
    ],
  },
];