"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "@/components/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              LUXE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Products
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="text-muted-foreground hover:text-foreground transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/checkout" aria-label="Cart" className="text-muted-foreground hover:text-foreground transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            </Link>
            <ThemeToggle />
            
            {isPending ? (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse hidden sm:block"></div>
            ) : session?.user ? (
              <div className="hidden sm:flex items-center space-x-4">
                <Link href="/dashboard" aria-label="Account" className="text-muted-foreground hover:text-foreground transition-colors">
                  {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name} className="h-8 w-8 rounded-full object-cover border border-border" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Link>
                <button onClick={handleLogout} aria-label="Logout" className="text-muted-foreground hover:text-destructive transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link href="/login" aria-label="Login" className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden sm:block border border-border px-4 py-1.5 rounded-md">
                Sign In
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link href="/" className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">
              Home
            </Link>
            <Link href="/products" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              Products
            </Link>
            {session?.user ? (
              <>
                <Link href="/dashboard" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-destructive hover:bg-destructive/10">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
