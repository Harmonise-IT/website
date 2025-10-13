import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    output: 'export',              // produce a fully static build in /out
    images: { unoptimized: true }, // makes <Image/> work on static hosts
};

export default nextConfig;
