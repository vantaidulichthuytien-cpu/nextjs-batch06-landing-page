import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { destinations } from "@/lib/destinations";
import { vehicles } from "@/lib/vehicles";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...destinations.map((d) => ({
      url: `${SITE_URL}/dia-diem/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...vehicles.map((v) => ({
      url: `${SITE_URL}/xe/${v.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
