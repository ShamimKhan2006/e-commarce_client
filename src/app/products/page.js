import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Minimalist Leather Watch",
    category: "Accessories",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Premium Canvas Backpack",
    category: "Accessories",
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Classic Aviator Sunglasses",
    category: "Accessories",
    price: "$65.00",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Wireless Noise-Canceling Earbuds",
    category: "Tech",
    price: "$150.00",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
  },
  {
    id: 5,
    title: "Cotton Crewneck Sweater",
    category: "Apparel",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
  },
  {
    id: 6,
    title: "Slim Fit Chino Pants",
    category: "Apparel",
    price: "$55.00",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
  },
  {
    id: 7,
    title: "Smart Home Speaker",
    category: "Tech",
    price: "$89.00",
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=800",
    rating: 4.4,
  },
  {
    id: 8,
    title: "Leather Crossbody Bag",
    category: "Accessories",
    price: "$110.00",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollReveal className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">All Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our complete collection of premium fashion, accessories, and tech essentials.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
