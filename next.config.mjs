// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   turbopack: {
//     root: import.meta.dirname,
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/server/:path*",
//         destination: "http://localhost:5000/:path*",
//       },
//     ];
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },

  async rewrites() {
    return [
      {
        source: "/api/server/:path*",
        destination: "http://localhost:5000/:path*",
      },
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