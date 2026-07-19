"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Store,
  LogOut,
  X,
  FileText,
  Heart,
  User as UserIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

// Admin-only navigation
const ADMIN_NAV = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/products", label: "Products", icon: Package },
  { href: "/dashboard/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/admin/customers", label: "Customers", icon: Users },
  { href: "/dashboard/admin/blog", label: "Blog", icon: FileText },
  { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
];

// Customer navigation
const USER_NAV = [
  { href: "/dashboard/user", label: "My Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/user/orders", label: "My Orders", icon: ShoppingCart },
  { href: "/dashboard/user/wishlist", label: "Wishlist", icon: Heart },
  { href: "/dashboard/user/profile", label: "Profile", icon: UserIcon },
  { href: "/dashboard/user/settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar({ open, onClose }) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const isAdmin = session?.user?.role === "admin";
  const NAV_ITEMS = isAdmin ? ADMIN_NAV : USER_NAV;

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-background transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              LUXE
            </Link>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {session?.user?.role && (
            <span
              className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                isAdmin
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {session.user.role}
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/dashboard/admin" || href === "/dashboard/user"
                ? pathname === href
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Store className="h-5 w-5 shrink-0" />
            Back to Store
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
