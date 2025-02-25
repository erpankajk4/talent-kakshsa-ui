/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "talentkaksha-bucket.blr1.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    // Extend the default Webpack configuration
    config.module.rules.push({
      test: /\.(mp4|m4v|webm|ogg)$/i,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "static/videos/",
          publicPath: "/_next/static/videos/",
        },
      },
    });

    // Add a rule for handling PDF files
    config.module.rules.push({
      test: /\.pdf$/i,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "static/pdfs/",
          publicPath: "/_next/static/pdfs/",
        },
      },
    });
    // Add a rule for handling MP3 files
    config.module.rules.push({
      test: /\.mp3$/i,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "static/audio/",
          publicPath: "/_next/static/audio/",
        },
      },
    });

    return config;
  },
};

export default nextConfig;
