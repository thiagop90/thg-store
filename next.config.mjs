import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thg-store.s3.us-east-2.amazonaws.com',
        pathname: '**',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
