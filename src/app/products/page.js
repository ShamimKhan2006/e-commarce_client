import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";


export default async function ProductsPage () { 
       const res= await fetch(`${process.env.NEXT_PUBLIC_URL}/products`,{
        method:"GET",
        headers:{
          "Context-Type":"application/json"
        },
        cache:"no-store"
       })

       const products=await res.json() 
       console.log("products",products)
    
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
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
