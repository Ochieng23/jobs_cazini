/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "caziniaifiles.blob.core.windows.net",
          port: "",
          pathname: "/**",
        },
      ],
    },
  };
  
  export default nextConfig;
  