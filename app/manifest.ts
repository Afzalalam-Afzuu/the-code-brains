import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TheCodeBrains — Tech Reviews & Deals Portal',
    short_name: 'TheCodeBrains',
    description: "India's Trusted Tech Reviews, Smartphone & Laptop Buying Advice & Verified Deals",
    start_url: '/',
    display: 'standalone',
    background_color: '#f1f3f6',
    theme_color: '#2874f0',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
