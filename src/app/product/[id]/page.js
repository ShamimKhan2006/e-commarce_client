"use client";

import { use, useEffect, useState } from "react";
import { Button, Card,  } from "@heroui/react";
import { ArrowLeft, ShoppingCart, Sparkles, Star, Lock } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProductDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { addToCart } = useCart();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/products/${productId}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Gate: only allow logged-in users to view product details
  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 px-4 text-center">
        <div className="rounded-full bg-primary/10 p-5 text-primary">
          <Lock className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Please sign in to view this product
        </h1>
        <p className="max-w-sm text-muted-foreground">
          You need to be logged in to access product details. Create an account
          or sign in to continue.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/login")}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Sign In
          </button>
          <Link
            href="/register"
            className="rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Product Not Found
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating,
    });

    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <ScrollReveal>
          <Link
            href="/products"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal y={20}>
            <div className="relative aspect-square rounded-2xl overflow-hidden border">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal y={20} delay={0.2}>
            <p className="text-sm font-medium text-primary uppercase mb-2">
              {product.category}
            </p>

            <h1 className="text-5xl font-bold mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold">
                {product.price}
              </h2>

              <div className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="ml-1">
                  {product.rating}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground text-lg mb-8">
              {product.description}
            </p>

            <Button
              color="primary"
              size="lg"
              startContent={<ShoppingCart size={20} />}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>

            <Card className="mt-10">
       
                <div className="flex gap-3">
                  <Sparkles className="text-primary" />

                  <div>
                    <h3 className="font-semibold mb-2">
                      AI Summary
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Highly rated{" "}
                      {product.category.toLowerCase()} product
                      with premium quality and excellent customer
                      satisfaction. Perfect for everyday use while
                      maintaining a stylish appearance.
                    </p>
                  </div>
                </div>
             
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}