import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false, // Disable React Compiler for compatibility
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  },
};

export default nextConfig;
