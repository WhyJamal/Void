import { PAGES } from "./pages.config";

export const footerItems = [
  {
    title: "Продукт",
    links: [
      { title: "Функции", href: "/features" },
      { title: "Интеграции", href: "/integrations" },
      { title: "Безопасность", href: "/security" },
    ],
  },
  {
    title: "Решения",
    links: [
      { title: "Малый бизнес", href: "/use/small-business" },
      { title: "Средний бизнес", href: "/use/mid-market" },
      { title: "Предприятия", href: "/use/enterprise" },
    ],
  },
  {
    title: "Ресурсы",
    links: [
      { title: "Документация", href: "/docs" },
      { title: "Поддержка", href: PAGES.SUPPORT },
    ],
  },
  {
    title: "Компания",
    links: [
      { title: "О компании", href: PAGES.ABOUT_US },
      { title: "Контакты", href: PAGES.CONTACTS },
    ],
  },
];