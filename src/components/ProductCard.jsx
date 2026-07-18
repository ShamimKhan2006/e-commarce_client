"use client";

import { Star, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link href={`/product/${product._id}`} className="block h-full w-full group">
        <div className="flex flex-col bg-background rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all h-full">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              alt={product.title}
              className="w-full object-cover h-full group-hover:scale-110 transition-transform duration-500"
              src={product.image}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col flex-1 p-5 gap-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors flex-1">
                {product.title}
              </h4>
              <span className="font-semibold text-foreground text-sm shrink-0">{product.price}</span>
            </div>

            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-xs font-medium text-muted-foreground">{product.rating}</span>
            </div>

            <button className="mt-auto w-full flex items-center justify-center gap-2 rounded-md bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground py-2.5 text-sm font-medium transition-colors">
              <ShoppingBag className="h-4 w-4" />
              View Details
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

