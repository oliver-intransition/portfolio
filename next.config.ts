import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sample content uses local placeholder SVGs; replace with real
    // photography/cover images and remove this once done.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
