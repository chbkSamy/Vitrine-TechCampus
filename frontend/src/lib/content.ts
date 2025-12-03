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
import { fetchStrapi, fromCollection, fromSingle, pickMedia } from "./strapi";

interface HeroResponse {
  title: string;
  subtitle: string;
  ctaLabel: string | null;
  ctaUrl: string | null;
  image?: Media | null;
}

interface NewsResponse extends Omit<NewsItem, "image"> {
  image?: { data: { id: number; attributes: Media } | null };
}

export async function getHero(): Promise<Hero | null> {
  try {
    console.log("🔍 Fetching hero from Strapi...");
    const data = await fetchStrapi<{ data: { id: number; attributes: HeroResponse } }>("/api/hero", {
      query: { populate: "*" },
      revalidate: 300,
    });

    console.log("📥 Raw Strapi response:", JSON.stringify(data, null, 2));

    if (!data.data) {
      console.log("❌ No data.data in response");
      return null;
    }

    console.log("📋 Attributes:", data.data.attributes);
    console.log("🖼️ Image field:", data.data.attributes?.image);

    const hero = fromSingle(data);
    console.log("🔄 After fromSingle:", JSON.stringify(hero, null, 2));

    if (!hero) {
      console.log("❌ Hero is null after fromSingle");
      return null;
    }

    // L'image vient déjà traitée par fromSingle car Strapi la retourne directement
    console.log("🖼️ Hero.image (already from Strapi):", hero.image);

    const result: Hero = {
      id: hero.id,
      title: hero.title || "",
      subtitle: hero.subtitle || "",
      ctaLabel: hero.ctaLabel || "",
      ctaUrl: hero.ctaUrl || "",
      image: hero.image || null,
    };
    console.log("✅ Final hero object:", JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error("❌ Error in getHero:", error);
    return null;
  }
}

export async function getHighlights(): Promise<Highlight[]> {
  try {
    const data = await fetchStrapi<{ data: Array<{ id: number; attributes: Highlight }> }>("/api/highlights", {
      query: { sort: "order:asc" },
      revalidate: 300,
    });
    return fromCollection(data);
  } catch {
    return [];
  }
}


export async function getNews(limit?: number): Promise<NewsItem[]> {
  try {
    const query: Record<string, string> = {
      populate: "image",
      sort: "date:desc",
    };

    if (limit) {
      query["pagination[pageSize]"] = String(limit);
    }

    const data = await fetchStrapi<{ data: Array<{ id: number; attributes: NewsResponse }> }>("/api/news", {
      query,
      revalidate: 60,
    });

    return fromCollection(data).map((item) => ({
      ...item,
      image: pickMedia(item.image as never),
    }));
  } catch {
    return [];
  }
}

export async function getNewsSlugs(): Promise<string[]> {
  try {
    const data = await fetchStrapi<any>("/api/news", {
      query: { fields: "slug", "pagination[pageSize]": "200" },
      revalidate: 600,
    });
    return fromCollection(data).map((entry: any) => entry.slug);
  } catch {
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const data = await fetchStrapi<{
      data: Array<{ id: number; attributes: NewsResponse }>;
    }>("/api/news", {
      query: {
        "filters[slug][$eq]": slug,
        populate: "image",
      },
      revalidate: 60,
    });

    const [item] = fromCollection(data);
    if (!item) return null;
    return {
      ...item,
      image: pickMedia(item.image as never),
    };
  } catch {
    return null;
  }
}

export async function getPrograms(): Promise<Program[]> {
  try {
    const data = await fetchStrapi<{ data: Array<{ id: number; attributes: Program }> }>("/api/programs", {
      query: { sort: "level:asc" },
      revalidate: 600,
    });
    return fromCollection(data);
  } catch {
    return [];
  }
}

export async function getProgramSlugs(): Promise<string[]> {
  try {
    const data = await fetchStrapi<any>("/api/programs", {
      query: { fields: "slug", "pagination[pageSize]": "200" },
      revalidate: 600,
    });
    const slugs = fromCollection(data).map((entry: any) => entry.slug);
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
    const data = await fetchStrapi<{ data: Array<{ id: number; attributes: Program }> }>("/api/programs", {
      query: {
        "filters[slug][$eq]": slug
      },
      revalidate: 600,
    });
    const [program] = fromCollection(data);
    console.log("Program fetched by slug:", program ? program.slug : "not found");
    return program ?? null;
  } catch (error) {
    console.error(`Error fetching program by slug ${slug}:`, error);
    return null;
  }
}

export async function getContactSettings(): Promise<ContactSettings | null> {
  try {
    const data = await fetchStrapi<{ data: { id: number; attributes: ContactSettings } }>("/api/contact", {
      revalidate: 600,
    });
    return fromSingle(data);
  } catch {
    return null;
  }
}

async function getGlobal(): Promise<Global | null> {
  try {
    const data = await fetchStrapi<{ data: { id: number; attributes: Global } }>("/api/global", {
      query: { populate: "testimonials" },
      revalidate: 300,
    });
    return fromSingle(data);
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

