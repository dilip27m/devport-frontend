// Type definitions for next-pwa
declare module "next-pwa" {
    import { NextConfig } from "next";

    interface RuntimeCachingRule {
        urlPattern: RegExp;
        handler: "CacheFirst" | "CacheOnly" | "NetworkFirst" | "NetworkOnly" | "StaleWhileRevalidate";
        method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        options?: {
            cacheName?: string;
            expiration?: {
                maxEntries?: number;
                maxAgeSeconds?: number;
            };
            networkTimeoutSeconds?: number;
            rangeRequests?: boolean;
        };
    }

    interface PWAConfig {
        dest?: string;
        sw?: string;
        register?: boolean;
        skipWaiting?: boolean;
        disable?: boolean;
        runtimeCaching?: RuntimeCachingRule[];
        buildExcludes?: RegExp[];
        publicExcludes?: string[];
        fallbacks?: {
            document?: string;
            image?: string;
            audio?: string;
            video?: string;
            font?: string;
        };
    }

    function withPWA(pwaConfig: PWAConfig): (nextConfig: NextConfig) => NextConfig;

    export default withPWA;
}
