import Link from "next/link";
import { ArrowRight, Star, ShoppingBag, Truck, ShieldCheck, RefreshCw, Quote, MessageCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCard from "@/components/AnimatedCard";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Minimalist Leather Watch",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Premium Canvas Backpack",
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Classic Aviator Sunglasses",
    price: "$65.00",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Wireless Noise-Canceling Earbuds",
    price: "$150.00",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <ScrollReveal y={50}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Elevate Your Style
            </h1>
          </ScrollReveal>
          <ScrollReveal y={30} delay={0.2}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-zinc-200">
              Discover our premium collection of modern essentials designed for the contemporary lifestyle.
            </p>
          </ScrollReveal>
          <ScrollReveal y={20} delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/products" 
                className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black shadow transition-colors hover:bg-zinc-200 hover:scale-105"
              >
                Shop Collection
              </Link>
              <Link 
                href="/products" 
                className="inline-flex h-12 items-center justify-center rounded-md border border-white px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-black hover:scale-105"
              >
                Explore Features
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted/50 border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard delay={0.1} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On all orders over $100</p>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={0.2} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <RefreshCw className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={0.3} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Secure Checkout</h3>
                <p className="text-sm text-muted-foreground">100% protected payments</p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Shop by Category</h2>
            <Link href="/products" className="hidden sm:flex items-center text-sm font-medium text-primary hover:underline">
              View all categories <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedCard delay={0.1} href="/products?category=accessories" className="group relative overflow-hidden rounded-xl aspect-[4/3] w-full">
              <img 
                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800" 
                alt="Accessories" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity group-hover:from-black/90" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Accessories</h3>
                <span className="inline-flex items-center text-sm font-medium text-white/90 group-hover:text-white">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </span>
              </div>
            </AnimatedCard>
            
            <AnimatedCard delay={0.2} href="/products?category=apparel" className="group relative overflow-hidden rounded-xl aspect-[4/3] w-full">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" 
                alt="Apparel" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity group-hover:from-black/90" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Apparel</h3>
                <span className="inline-flex items-center text-sm font-medium text-white/90 group-hover:text-white">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </span>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.3} href="/products?category=tech" className="group relative overflow-hidden rounded-xl aspect-[4/3] sm:col-span-2 lg:col-span-1 w-full">
              <img 
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800" 
                alt="Tech Essentials" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity group-hover:from-black/90" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Tech Essentials</h3>
                <span className="inline-flex items-center text-sm font-medium text-white/90 group-hover:text-white">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </span>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Trending Now</h2>
            <Link href="/products" className="flex items-center text-sm font-medium text-primary hover:underline">
              View all products <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((product, index) => (
              <AnimatedCard key={product.id} delay={index * 0.1} className="group flex flex-col bg-background rounded-xl overflow-hidden border border-border shadow-sm">
                <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-muted block">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center space-x-1 mb-2 text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-xs font-medium text-muted-foreground ml-1">{product.rating}</span>
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-medium text-muted-foreground mt-1 mb-4">{product.price}</p>
                  <button className="mt-auto flex items-center justify-center w-full rounded-md bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground py-2.5 text-sm font-medium transition-colors">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what some of our favorite customers have to say about our products.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard delay={0.1} className="bg-muted/50 p-8 rounded-2xl border border-border relative">
              <Quote className="absolute top-8 right-8 h-10 w-10 text-primary/10" />
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-foreground mb-6 text-sm leading-relaxed">
                "The quality of the minimalist leather watch is absolutely outstanding. It looks much more expensive than it is, and I've received countless compliments since I started wearing it."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-300 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" alt="Sarah J." className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Sarah Jenkins</h4>
                  <p className="text-xs text-muted-foreground">Verified Buyer</p>
                </div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard delay={0.2} className="bg-muted/50 p-8 rounded-2xl border border-border relative">
              <Quote className="absolute top-8 right-8 h-10 w-10 text-primary/10" />
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-foreground mb-6 text-sm leading-relaxed">
                "I ordered the canvas backpack for my daily commute and it's perfect. The materials feel premium and it has exactly the right amount of pockets for all my tech gear."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-300 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="Michael T." className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Michael Torres</h4>
                  <p className="text-xs text-muted-foreground">Verified Buyer</p>
                </div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard delay={0.3} className="bg-muted/50 p-8 rounded-2xl border border-border relative">
              <Quote className="absolute top-8 right-8 h-10 w-10 text-primary/10" />
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-foreground mb-6 text-sm leading-relaxed">
                "Fast shipping and amazing customer service! I had to exchange a size and the process was completely frictionless. Will definitely be shopping here again."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-300 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Emily R." className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Emily Rogers</h4>
                  <p className="text-xs text-muted-foreground">Verified Buyer</p>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30 border-t border-border overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal className="text-center mb-12">
            <MessageCircle className="h-12 w-12 mx-auto text-primary mb-4 opacity-80" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Have questions? We're here to help. If you don't see your question here, drop us a line on our contact page.
            </p>
          </ScrollReveal>
          
          <div className="space-y-4">
            <ScrollReveal delay={0.1} className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-foreground mb-2">What is your return policy?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We offer a hassle-free 30-day return policy for all unworn and unwashed items with their original tags attached. Returns are completely free for all domestic orders.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-foreground mb-2">Do you ship internationally?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Yes, we ship to over 50 countries worldwide. International shipping rates are calculated at checkout based on your location and the weight of your order.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-foreground mb-2">How long will it take to receive my order?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Standard domestic shipping typically takes 3-5 business days. Expedited shipping options are available at checkout for 1-2 business day delivery.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Newsletter Promo */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Join Our Community</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Sign up for our newsletter and get 15% off your first order, plus exclusive access to new arrivals.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 h-12 rounded-md bg-white/10 border border-white/20 px-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button 
                type="button" 
                className="h-12 px-6 rounded-md bg-white text-primary font-medium hover:bg-zinc-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
