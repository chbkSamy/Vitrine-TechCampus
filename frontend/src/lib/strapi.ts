import type { Media } from "@/types/content";
type QueryValue = string | number | boolean | undefined | null;

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
};

if (STRAPI_API_TOKEN) {
  defaultHeaders.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
}

const buildQuery = (query?: Record<string, QueryValue>): string => {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.append(key, String(value));
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
};

export const getStrapiURL = (path = ""): string => {
  return `${STRAPI_URL}${path}`;
};

interface FetchStrapiOptions {
  query?: Record<string, QueryValue>;
  cache?: RequestCache;
  revalidate?: number;
}

export async function fetchStrapi<T>(path: string, options: FetchStrapiOptions = {}): Promise<T> {
  const { query, cache = "force-cache", revalidate = 60 } = options;
  const url = `${getStrapiURL(path)}${buildQuery(query)}`;

  const response = await fetch(url, {
    headers: defaultHeaders,
    cache,
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

interface StrapiEntity<T> {
  id: number;
  attributes?: T;
  [key: string]: any;
}

type StrapiSingle<T> = { data: StrapiEntity<T> | null };
type StrapiCollection<T> = { data: StrapiEntity<T>[] };

export const fromSingle = <T>(payload: StrapiSingle<T>): (T & { id: number }) | null => {
  if (!payload?.data) return null;
  if (payload.data.attributes) {
    return { id: payload.data.id, ...payload.data.attributes };
  }
  return payload.data as unknown as T & { id: number };
};

export const fromCollection = <T>(payload: StrapiCollection<T>): Array<T & { id: number }> => {
  if (!payload?.data?.length) return [];
  return payload.data.map((entry) => {
    if (entry.attributes) {
      return { id: entry.id, ...entry.attributes };
    }
    return entry as unknown as T & { id: number };
  });
};

interface MediaAttributes {
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface MediaRelation {
  data: StrapiEntity<MediaAttributes> | null;
}

export const pickMedia = (relation?: MediaRelation | null): Media | null => {
  if (!relation?.data || !relation.data.attributes) return null;

  const { id } = relation.data;
  const { url, alternativeText, width, height } = relation.data.attributes;

  // Optionnel mais safe : si pas d'URL, on considère que c'est invalide
  if (!url) return null;

  return {
    id,
    url,
    alternativeText: alternativeText ?? null,
    width: width ?? null,
    height: height ?? null,
  };
};

export const resolveMediaUrl = (url?: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};

