import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://travel-webapp-eta.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://travel-webapp-eta.vercel.app/tour',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: 'https://travel-webapp-eta.vercel.app/culture',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.5,
        },
        {
            url: 'https://travel-webapp-eta.vercel.app/hotel',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.5,
        },
        {
            url: 'https://travel-webapp-eta.vercel.app/mylocation',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.5,
        },
    ];
}