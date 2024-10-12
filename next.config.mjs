/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com"], // Replace with your external domain
  },
  webpack: (config) => {
    // Custom Webpack configuration
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/,
      use: [
        {
          loader: "file-loader",
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
