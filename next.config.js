/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.conexaonet-pp.com.br" }],
        destination: "https://conexaonet-pp.com.br/:path*",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
