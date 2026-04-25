export interface HeaderLink {
  title: string;
  href: string;
  icon?: React.ElementType;
}

export interface HeaderColumn {
  title: string;
  links: HeaderLink[];
}

export interface MenuItem {
  label: string;
  columns: HeaderColumn[];
  href?: string;
}