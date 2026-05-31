import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    "three",
    "@react-three/drei",
    "@react-three/postprocessing",
  ],
};

export default nextConfig;
