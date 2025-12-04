import { strapi } from '@strapi/client';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Créer l'instance du client Strapi
export const strapiClient = strapi({
    baseURL: `${STRAPI_URL}/api`,
    auth: STRAPI_API_TOKEN,
});

export default strapiClient;
