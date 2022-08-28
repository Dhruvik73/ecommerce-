/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    ROUTE:process.env.ROUTE,
    JWT:process.env.JWT
  }
}

module.exports = nextConfig
