


/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },

  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";
    return [
      { source: "/api/server/:path*", destination: `${backend}/:path*` },
      { source: "/api/products/:path*", destination: `${backend}/products/:path*` },
      { source: "/api/blogs/:path*", destination: `${backend}/blogs/:path*` },
      { source: "/api/upload", destination: `${backend}/upload` },
      { source: "/api/orders", destination: `${backend}/orders` },
      { source: "/api/orders/:path*", destination: `${backend}/orders/:path*` },
      { source: "/api/wishlist", destination: `${backend}/wishlist` },
      { source: "/api/admin/customers", destination: `${backend}/admin/customers` },
      { source: "/api/checkout", destination: `${backend}/checkout` },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;