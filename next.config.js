/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'disabilityforums.com.au',
        pathname: '**',
      },
    ],
  },
  };
  