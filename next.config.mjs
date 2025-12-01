/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ['images.unsplash.com'], // allow Unsplash images
  },
};

export default nextConfig;
