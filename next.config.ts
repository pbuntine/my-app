import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // Optional: recommended for S3 hosting to avoid broken links
  trailingSlash: true, 
  images: {
    unoptimized: true, // S3 cannot optimize images on the fly like Vercel
  },
};

export default nextConfig;
