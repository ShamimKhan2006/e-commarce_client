"use client";

import { use, useEffect, useState } from "react";
import { Button, Card,  } from "@heroui/react";
import { ArrowLeft, ShoppingCart, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";

export default function ProductDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { addToCart } = useCart();

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