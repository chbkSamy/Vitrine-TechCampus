import {
  ContactSettings,
  Hero,
  Highlight,
  Media,
  NewsItem,
  Program,
  Testimonial,
  Global,
} from "@/types/content";
import { strapiClient } from "./strapi-client";
import { pickMedia } from "./strapi-utils";

interface HeroResponse {
  title: string;
  subtitle: string;
  ctaLabel: string | null;
  ctaUrl: string | null;
  image?: Media | null;
}

interface NewsResponse {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  status?: string;
  startDate?: string | null;
  endDate?: string | null;
  image?: Media | null;
}

/**
 * Wrapper pour ajouter le cache Next.js aux requêtes Strapi
 * Le client @strapi/client ne gère pas nativement le cache Next.js
 */
async function fetchWithCache<T>(
  fetcher: () => Promise<T>,
  revalidate: number = 60
): Promise<T> {
  // Note: Pour le moment, on appelle directement le fetcher
  // Le cache Next.js sera géré au niveau des Server Components
  return fetcher();
}

export async function getHero(): Promise<Hero | null> {
  try {
    const response = await fetchWithCache(
      () => strapiClient.single("hero").find({ populate: "image" }),
      300
    );

    if (!response?.data) {
      return null;
    }

    const data = response.data as any;
    console.log("Hero reçu :", data);

    const result: Hero = {
      id: data.id,
      title: data.title || "",
      subtitle: data.subtitle || "",
      ctaLabel: data.ctaLabel || "",
      ctaUrl: data.ctaUrl || "",
      image: data.image || null,
    };

    console.log("Hero converti :", result);
    return result;
  } catch (error) {
    console.error("Error fetching hero:", error);
    return null;
  }
}

export async function getHighlights(): Promise<Highlight[]> {
  try {
    const response = await fetchWithCache(
      () => strapiClient.collection("highlights").find({ sort: "order:asc" }),
      300
    );

    if (!response?.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((item: any) => ({
      id: item.id,
      ...item,
    }));
  } catch {
    return [];
  }
}

export async function getNews(limit?: number): Promise<NewsItem[]> {
  try {
    const params: any = {
      sort: "date:desc",
    };

    if (limit) {
      params.pagination = { pageSize: limit };
    }

    const response = await fetchWithCache(
      () => strapiClient.collection("news").find(params),
      60
    );

    if (!response?.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((item: any) => ({
      id: item.id,
      ...item,
    }));
  } catch {
    return [];
  }
}

export async function getNewsSlugs(): Promise<string[]> {
  try {
    const response = await fetchWithCache(
      () =>
        strapiClient.collection("news").find({
          fields: ["slug"],
          pagination: { pageSize: 200 },
        }),
      600
    );

    if (!response?.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((entry: any) => entry.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const response = await fetchWithCache(
      () =>
        strapiClient.collection("news").find({
          filters: { slug: { $eq: slug } },
          populate: "image",
        }),
      60
    );

    if (!response?.data || !Array.isArray(response.data) || response.data.length === 0) {
      return null;
    }

    const item = response.data[0] as any;
    return {
      id: item.id,
      ...item,
    };
  } catch {
    return null;
  }
}

export async function getPrograms(): Promise<Program[]> {
  try {
    const response = await fetchWithCache(
      () => strapiClient.collection("programs").find({ sort: "level:asc" }),
      600
    );

    if (!response?.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((item: any) => ({
      id: item.id,
      ...item,
    }));
  } catch {
    return [];
  }
}

export async function getProgramSlugs(): Promise<string[]> {
  try {
    const response = await fetchWithCache(
      () =>
        strapiClient.collection("programs").find({
          fields: ["slug"],
          pagination: { pageSize: 200 },
        }),
      600
    );

    if (!response?.data || !Array.isArray(response.data)) {
      console.error("Error fetching program slugs: no data");
      return [];
    }

    const slugs = response.data.map((entry: any) => entry.slug).filter(Boolean);
    console.log("Slugs for generateStaticParams:", slugs);
    return slugs;
  } catch (error) {
    console.error("Error fetching program slugs for generateStaticParams:", error);
    return [];
  }
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  try {
    console.log("Fetching program by slug:", slug);
    const response = await fetchWithCache(
      () =>
        strapiClient.collection("programs").find({
          filters: { slug: { $eq: slug } },
        }),
      600
    );

    if (!response?.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.log("Program not found for slug:", slug);
      return null;
    }

    const program = response.data[0] as any;
    console.log("Program fetched by slug:", program ? program.slug : "not found");
    return {
      id: program.id,
      ...program,
    };
  } catch (error) {
    console.error(`Error fetching program by slug ${slug}:`, error);
    return null;
  }
}

export async function getContactSettings(): Promise<ContactSettings | null> {
  try {
    const response = await fetchWithCache(
      () => strapiClient.single("contact").find(),
      600
    );

    if (!response?.data) {
      return null;
    }

    const data = response.data as any;
    return {
      id: data.id,
      ...data,
    };
  } catch {
    return null;
  }
}

async function getGlobal(): Promise<Global | null> {
  try {
    const response = await fetchWithCache(
      () => strapiClient.single("global").find({ populate: "testimonials" }),
      300
    );

    if (!response?.data) {
      return null;
    }

    const data = response.data as any;
    return {
      id: data.id,
      ...data,
    };
  } catch {
    return null;
  }
}

export async function getHomePageContent() {
  const [global, hero, highlights, articles, programs, contact] = await Promise.all([
    getGlobal(),
    getHero(),
    getHighlights(),
    getNews(3),
    getPrograms(),
    getContactSettings(),
  ]);

  return {
    ...global,
    hero,
    highlights,
    articles,
    programs,
    contact,
  };
}
