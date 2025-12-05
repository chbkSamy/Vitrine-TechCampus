# TechCampus Vitrine

Projet full-stack combinant un backend Strapi (`backend/my-strapi-app`) et un frontend Next.js (`frontend`) pour présenter l’offre du Tech Campus : page d’accueil, actualités, programmes et contact.

## Structure

- `backend/my-strapi-app` : CMS Strapi (SQLite par défaut) avec les types de contenus décrits dans `docs/instruction.md`.
- `frontend` : site vitrine Next.js (App Router) consommant les API publiques + token Strapi.
- `docs/` : documentation métier (modèles, contenus à saisir).

## Prérequis

- Node.js 18.18+ (20+ recommandé).
- npm ou yarn (selon vos préférences).
- Accès réseau entre les deux apps (`STRAPI_URL`, par défaut `http://localhost:1337`).

## Démarrage rapide

### 1. Backend Strapi

```bash
cd backend/my-strapi-app
npm install          # première installation
npm run develop      # démarre Strapi avec autoReload (http://localhost:1337/admin)
```

Commande utiles :
- `npm run build` : build du panel admin.
- `npm run start` : exécute Strapi en mode prod (sans autoReload).

> Pensez à créer un compte admin Strapi lors du premier lancement puis à importer/saisir les contenus décrits dans `docs/instruction.md`.

### 2. Frontend Next.js

```bash
cd frontend
npm install
cp .env.example .env.local  # si vous gardez un fichier d’exemple
# ou créez manuellement :
# STRAPI_URL=http://localhost:1337
# STRAPI_API_TOKEN=token_api_public
npm run dev                 # http://localhost:3000
```

Variables attendues dans `frontend/.env.local` :

```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<token avec lecture Hero/News/Program/Contact>
```

Commandes utiles côté frontend :
- `npm run build` : build de production.
- `npm run start` : serveur Next.js en mode prod.

## Scripts communs

| Contexte | Commande | Description |
| --- | --- | --- |
| Backend | `npm run develop` | Strapi en mode dev (hot reload). |
| Backend | `npm run build` | Build du panel admin Strapi. |
| Backend | `npm run start` | Strapi en mode prod. |
| Frontend | `npm run dev` | Next.js en mode dev (port 3000). |
| Frontend | `npm run build` | Génération du build production. |
| Frontend | `npm run start` | Next.js en mode prod. |

## Bonnes pratiques

- Ne pas versionner les dossiers générés (`backend/.cache`, `backend/.tmp`, `node_modules`, etc.) : le `.gitignore` racine est paramétré en ce sens.
- Centraliser toute nouvelle documentation fonctionnelle dans `docs/`.
- Créer les tokens API Strapi avec les permissions minimales (lecture seule pour le frontend public).

## Ressources supplémentaires

- [Documentation Strapi](https://docs.strapi.io) – configuration, contenus, déploiement.
- [Documentation Next.js](https://nextjs.org/docs) – App Router, ISR, déploiement.


Bon développement ! 🎉

