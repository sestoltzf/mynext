/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Obligatoriskt för statisk export
  images: {
    unoptimized: true, // Nödvändigt för Netlify
  },
};

export default nextConfig;

