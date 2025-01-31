/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Obligatoriskt för statisk export
  images: {
    unoptimized: true, // Nödvändigt för Netlify
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;