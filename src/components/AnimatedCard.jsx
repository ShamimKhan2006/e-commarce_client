"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AnimatedCard({ children, href, className = "", delay = 0 }) {
  const CardWrapper = href ? Link : motion.div;
  const props = href 
    ? { href, className: `block ${className}` }
    : { className };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <CardWrapper {...props}>
        {children}
      </CardWrapper>
    </motion.div>
  );
}
