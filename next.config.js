const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
  clientsClaim: true,
  maximumFileSizeToCacheInBytes: 5000000,
  buildExcludes: [/middleware-manifest\.json$/, /_buildManifest\.js$/],
  // APP STORE READY PWA CONFIG
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
});

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    // Performance optimizations for App Store
    swcMinify: true,
    compiler: {
      removeConsole: process.env.NODE_ENV === "production",
    },
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
        },
        {
          protocol: "http",
          hostname: "127.0.0.1",
        },
        {
          protocol: "https",
          hostname: "**",
        },
        {
          protocol: "https",
          hostname: "cdn.builder.io",
        },
      ],
      // Optimize for mobile app
      formats: ["image/webp", "image/avif"],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    experimental: {
      serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
      optimizeCss: true,
      optimizePackageImports: ["@tabler/icons-react", "lucide-react"],
    },
    // Enable compression for production
    compress: true,
    // CRITICAL: App Store submission config
    assetPrefix:
      process.env.NODE_ENV === "production" ? "https://saintvisionai.com" : "",
    // Webpack optimization for mobile
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
          util: require.resolve("util"),
          buffer: require.resolve("buffer"),
        };
      }

      // Fix Supabase realtime dependency warnings
      config.ignoreWarnings = [
        {
          module: /node_modules\/@supabase\/realtime-js/,
          message:
            /Critical dependency: the request of a dependency is an expression/,
        },
      ];

      return config;
    },
  }),
);
