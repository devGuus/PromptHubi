import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Library, Star, FolderOpen, Settings } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/prompts", label: "Todos os Prompts", icon: Library },
  { href: "/favorites", label: "Favoritos", icon: Star },
  { href: "/categories", label: "Categorias", icon: FolderOpen },
];

export const SETTINGS_NAV_ITEM: NavItem = {
  href: "/settings",
  label: "Configurações",
  icon: Settings,
};

export type SortOption = "recent" | "oldest" | "az" | "za";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Mais recentes" },
  { value: "oldest", label: "Mais antigos" },
  { value: "az", label: "Nome A-Z" },
  { value: "za", label: "Nome Z-A" },
];

export const DEFAULT_SORT: SortOption = "recent";

export const LIST_PAGE_SIZE_DASHBOARD = 4;
