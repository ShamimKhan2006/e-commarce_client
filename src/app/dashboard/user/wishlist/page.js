"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartContext";
import toast from "react-hot-toast";

export default function UserWishlistPage() {
  const { addToCart } = useCart();
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("wishlist");
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, []);

  const remove = (id) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    localStorage.setItem("wishlist", JSON.stringify(next));
    toast.success("Removed from wishlist");
  };

  const moveToCart = (item) => {
    addToCart(item);
    remove(item.id);
    toast.success("Moved to cart");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Wishlist
        </h1>
        <p className="mt-1 text-muted-foreground">
          Items you've saved for later.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
          <Heart className="h-12 w-12 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Your wishlist is empty.
          </p>
          <Link
            href="/products"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-background p-4 shadow-sm"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-3 truncate text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {item.price}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => moveToCart(item)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => remove(item.id)}
                  className="rounded-lg border border-border p-2 text-muted-foreground hover:text-destructive"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
