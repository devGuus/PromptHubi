"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SETTINGS_NAV_ITEM } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card md:flex">
      <div className="flex h-16 items-center gap-2 px-5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
          P
        </span>
        <span className="text-base font-semibold tracking-tight">PromptHubi</span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-accent-soft text-accent-soft-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-3 py-2">
        <Link
          href={SETTINGS_NAV_ITEM.href}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive(pathname, SETTINGS_NAV_ITEM.href)
              ? "bg-accent-soft text-accent-soft-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <SETTINGS_NAV_ITEM.icon className="h-5 w-5" />
          {SETTINGS_NAV_ITEM.label}
        </Link>
      </div>
    </aside>
  );
}
