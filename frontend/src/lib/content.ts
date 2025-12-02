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

interface HeroResponse extends Omit<Hero, "image"> {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaUrl: string;
  image?: { data: { id: number; attributes: Media } | null };
}

interface NewsResponse extends Omit<NewsItem, "image"> {
  image?: { data: { id: number; attributes: Media } | null };
}

export async function getHero(): Promise<Hero | null> {
  try {
    const data = await fetchStrapi<{ data: { id: number; attributes: HeroResponse } }>("/api/hero", {
      query: { populate: "image" },
      revalidate: 300,
    });
    const hero = fromSingle(data);
    if (!hero) return null;
    return {
      ...hero,
      image: pickMedia(hero.image as never),
    };
  } catch {
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
    const data = await fetchStrapi<{ data: Array<{ attributes: { slug: string } }> }>("/api/news", {
      query: { fields: "slug", "pagination[pageSize]": "200" },
      revalidate: 600,
    });
    return data.data.map((entry) => entry.attributes.slug);
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
        filters: JSON.stringify({ slug: { $eq: slug } }),
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
    const data = await fetchStrapi<{ data: Array<{ attributes: { slug: string } }> }>("/api/programs", {
      query: { fields: "slug", "pagination[pageSize]": "200" },
      revalidate: 600,
    });
    return data.data.map((entry) => entry.attributes.slug);
  } catch {
    return [];
  }
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const data = await fetchStrapi<{ data: Array<{ id: number; attributes: Program }> }>("/api/programs", {
      query: { filters: JSON.stringify({ slug: { $eq: slug } }) },
      revalidate: 600,
    });
    const [program] = fromCollection(data);
    return program ?? null;
  } catch {
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

