import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tighter text-foreground">LUXE</h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Your destination for premium fashion and accessories. We curate the best styles for your everyday elegance.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-sm hover:text-foreground transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-sm hover:text-foreground transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-sm hover:text-foreground transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-sm hover:text-foreground transition-colors">
                YouTube
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Best Sellers</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button 
                type="button"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} LUXE E-Commerce. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
