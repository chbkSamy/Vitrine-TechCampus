## Tech Campus – Frontend

Site vitrine Next.js alimenté par Strapi pour présenter le Tech Campus : hero éditable, actualités, programmes et bloc contact.

### Pré-requis

- Node.js 18.18+ (recommandé : 20+)
- Strapi ≥ 4 avec les contenus décrits dans `docs/instruction.md`

### Variables d’environnement

Créez un fichier `.env.local` à la racine du dossier `frontend` :

```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=token_api_public
```

`STRAPI_API_TOKEN` doit avoir accès en lecture aux types Hero, News, Highlight, Program et Contact.

### Installation & commandes

```bash
cd frontend
npm install
npm run dev    # http://localhost:3000
npm run build  # build de production
npm run start  # serveur prod
```

### Structure fonctionnelle

- `src/lib/content.ts` : appels aux endpoints Strapi (SSG + revalidate).
- `src/lib/strapi.ts` : helper HTTP + normalisation des entités.
- `src/types/` : contrats communs Hero, News, Program, etc.
- `src/components/sections` : sections réutilisables (hero, highlights, news, programmes, contact).
- `src/app` : routes App Router (`/`, `/news`, `/news/[slug]`, `/programs`, `/programs/[slug]`, `/contact`).

### Aller plus loin

- Ajouter les validations de formulaire côté `/contact`.
- Mettre en place des tests E2E (Playwright) pour les parcours principaux.
- Connecter l’upload d’images Strapi à un CDN (Cloudinary, Uploadcare…).
