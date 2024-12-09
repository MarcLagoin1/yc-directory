import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    dangerouslyAllowSVG: true,
    remotePatterns : 
  [
    {
      protocol : 'https',
      hostname : '*',
    }
  ]},

  experimental: {
     ppr: 'incremental',
  },

  devIndicators: {
    appIsrStatus: true, // defaults to true
    buildActivity: true, // defaults to true
    buildActivityPosition: 'bottom-right'
  }
};

export default nextConfig;
