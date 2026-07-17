"use client";

import { use } from "react";
import { Button, Card, CardContent } from "@heroui/react";
import { ArrowLeft, Star, ShoppingCart, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

// Placeholder data since we don't fetch from API yet
const MOCK_PRODUCTS = {
  1: {
    id: 1,
    title: "Minimalist Leather Watch",
    category: "Accessories",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    description: "A premium minimalist leather watch designed for everyday elegance. Features a genuine leather strap, scratch-resistant sapphire crystal glass, and a precise quartz movement. Water-resistant up to 50 meters, making it durable for any adventure."
  },
  2: {
    id: 2,
    title: "Premium Canvas Backpack",
    category: "Accessories",
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    description: "Designed for the modern commuter, this premium canvas backpack offers a dedicated laptop sleeve, multiple organizational pockets, and water-resistant coating. The ergonomic shoulder straps ensure comfort even during long days."
  },
};

const DEFAULT_PRODUCT = {
  id: "default",
  title: "Premium Classic Item",
  category: "General",
  price: "$99.00",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
  rating: 4.5,
  description: "Experience the perfect blend of style and functionality. This carefully crafted item is designed to elevate your everyday experience with premium materials and thoughtful details."
};

export default function ProductDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;
  const product = MOCK_PRODUCTS[productId] || { ...DEFAULT_PRODUCT, id: productId };

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
          {/* Product Image */}
          <ScrollReveal y={20} className="w-full">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-muted border border-border">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Product Info */}
          <ScrollReveal y={20} delay={0.2} className="flex flex-col">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-3xl font-semibold text-foreground">{product.price}</h2>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium text-muted-foreground ml-1">{product.rating} / 5</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground font-medium text-base w-full sm:w-auto px-8"
                startContent={<ShoppingCart className="h-5 w-5" />}
              >
                Buy Now
              </Button>
            </div>

            {/* AI Summary Card */}
            <Card className="bg-primary/5 border-primary/20 shadow-none mt-auto">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-1">AI Summary</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Highly rated {product.category.toLowerCase()} item known for its premium build quality. Customers frequently highlight its durability and elegant design. An excellent choice for both everyday use and special occasions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
