"use client";

import { useCart } from "@/components/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { data: session, isPending: authPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  // Compute pricing totals
  const subtotal = cart.reduce((total, item) => {
    const priceString = String(item.price);
    const price = parseFloat(priceString.replace(/[^0-9.]/g, "")) || 0;
    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% sales tax
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (authPending) {
      toast.error("Please wait, loading your session...");
      return;
    }
    if (!session?.user?.id || !session?.user?.email) {
      toast.error("Session expired. Please sign in again.");
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-user-id": session.user.id,
        "x-user-email": session.user.email,
        "x-user-role": session.user.role || "user",
      };
      const response = await fetch(`/api/checkout`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          items: cart,
          total: total,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (response.ok) {
        toast.success("Order placed successfully!");
        window.location.href = "/success";
      } else {
        toast.error(data.error || "Failed to proceed to checkout.");
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <ScrollReveal className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">Shopping Cart</h1>
          <p className="text-muted-foreground">Review your premium selection before finishing your purchase.</p>
        </ScrollReveal>

        {cart.length === 0 ? (
          <ScrollReveal y={20} className="text-center py-24 border border-dashed border-border rounded-2xl bg-secondary/10">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/60 mb-6" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              Explore our exquisite catalog to add items to your selection.
            </p>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition-all shadow cursor-pointer"
            >
              Continue Shopping
            </Link>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col sm:flex-row gap-6 p-5 rounded-2xl border border-border bg-background/50 backdrop-blur-sm shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-28 aspect-square rounded-xl overflow-hidden bg-muted border border-border/40 shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-semibold text-foreground text-lg line-clamp-1">{item.title}</h3>
                        <span className="font-semibold text-foreground">{item.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{item.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      {/* Quantity Toggles */}
                      <div className="flex items-center border border-border rounded-lg bg-secondary/20 p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 rounded hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3.5 text-sm font-semibold text-foreground w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 rounded hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.error(`${item.title} removed from cart`);
                        }}
                        className="text-muted-foreground hover:text-destructive p-2 rounded-lg hover:bg-red-500/5 transition-all cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <ScrollReveal y={20} delay={0.1} className="p-6 rounded-2xl border border-border bg-secondary/15 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm mb-6 border-b border-border/80 pb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Sales Tax (8%)</span>
                  <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-8">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full h-12 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow cursor-pointer text-sm"
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Proceed to Payment <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {shipping > 0 && (
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Add <span className="font-semibold">${(100 - subtotal).toFixed(2)}</span> more to qualify for Free Shipping.
                </p>
              )}
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  );
}
