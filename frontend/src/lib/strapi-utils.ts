import type { Media } from "@/types/content";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";

/**
 * Retourne l'URL complète de l'API Strapi
 */
export const getStrapiURL = (path = ""): string => {
    return `${STRAPI_URL}${path}`;
};

/**
 * Résout une URL de média Strapi en URL absolue
 */
export const resolveMediaUrl = (url?: string | null): string | null => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${STRAPI_URL}${url}`;
};

/**
 * Extrait et formate les informations d'un média depuis une relation Strapi
 */
interface MediaAttributes {
    url: string;
    alternativeText?: string | null;
    width?: number | null;
    height?: number | null;
}

interface MediaRelation {
    data: {
        id: number;
        attributes: MediaAttributes;
    } | null;
}

export const pickMedia = (relation?: MediaRelation | null): Media | null => {
    if (!relation?.data || !relation.data.attributes) return null;

    const { id } = relation.data;
    const { url, alternativeText, width, height } = relation.data.attributes;

    if (!url) return null;

    return {
        id,
        url,
        alternativeText: alternativeText ?? null,
        width: width ?? null,
        height: height ?? null,
    };
};
