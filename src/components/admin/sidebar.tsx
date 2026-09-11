"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Newspaper, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/posts", label: "Posts", icon: Newspaper },
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface p-4">
      <div className="mb-6">
        <p className="text-sm font-semibold">CityScout Admin</p>
        <p className="truncate text-xs text-muted-foreground">{email}</p>
      </div>
      <nav className="flex-1 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
              pathname === href && "bg-muted text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <form action={signOut}>
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="w-full gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </form>
    </aside>
  );
}
