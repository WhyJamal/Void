interface ITheme {
    from: string;
    via: string;
    to: string;
    glow1: string;
    glow2: string;
}

export interface IProductSolutionItem {
  text: string;
}

export interface IProductSolutionSection {
  badge?: string;
  title: string;
  description?: string;
  media: {
    type: "video" | "image";
    src: string;
    alt?: string;
    videoSrc?: string;
  };
  listTitle: string;
  items: IProductSolutionItem[];
  ctaLabel?: string;
  ctaHref?: string;
}


export interface IProduct {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
    badge: string;

    theme: ITheme;

    solutionSection?: IProductSolutionSection;
}