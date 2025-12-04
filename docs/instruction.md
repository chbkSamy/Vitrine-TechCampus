# PROJECT CONTEXT – TECH CAMPUS SHOWCASE WEBSITE

***

## Project overview

- School project simulating a response to a real RFP (request for proposal) from a school.  
- Team of three roles:  
  - Dev / Product Owner  
  - Dev / Lead Tech  
  - Dev  
- Scope of this file: the public showcase website of the school.  
- Intranet (logged-in area, school tools, etc.) is handled by other team members and is out of scope here.

Goal of the showcase website:  
Present the school, its programs, its strengths and news, and provide simple ways for prospective students to contact the school.

***

## High-level functional scope

Main pages (MVP):

- Home page  
- News (list + detail)  
- Programs / Courses (list + optionally detail pages)  
- Contact (either a dedicated page and/or a section on the home page)

Editorial requirement:  
All content should be editable through a headless CMS (Strapi), so non-technical staff can update the website without changing the code.

***

## Tech stack and architecture

Frontend:

- Next.js  
- Recommended: TypeScript  
- Rendering strategy:
  - SSG (Static Site Generation) for most content-driven pages (home, news, programs, etc.)  
  - SSR or incremental regeneration if needed for freshness
- Styling: free choice (CSS Modules, Tailwind, etc.) but code should stay simple and readable.

Backend / CMS:

- Strapi as headless CMS  
- Content exposed via HTTP API (REST or GraphQL, up to the implementation choice)  
- Clear separation between:
  - Next.js app (frontend)
  - Strapi backend (content back-office)

Non-goals:

- No complex auth / permissions on the public site.  
- No heavy custom backend logic outside Strapi’s standard features for this school project.

***

## Planned Strapi content types

The AI should assume at least these content types exist or will exist. Field names can be adjusted, but the structure should stay similar.

1) Hero (home page hero content)

- Collection or single type (single type recommended).  
- Fields:
  - title: string  
  - subtitle: string  
  - ctaLabel: string  
  - ctaUrl: string (relative URL or full URL)  
  - image: media (single image)

Use case: editable hero on the home page with main message + call-to-action.

2) News (or “Post”, “Article”, etc.)

- Collection type.  
- Fields:
  - title: string  
  - slug: UID based on title  
  - date: date  
  - excerpt: text  
  - content: rich text  
  - image: media (cover image)  
  - status: enum or boolean (e.g. draft/published)  
  - startDate: date (optional, visibility start)  
  - endDate: date (optional, visibility end)

Use case: news/events of the school, displayed on home + dedicated pages.

3) Highlight / School advantage (arguments on the home page)

- Collection type.  
- Fields:
  - title: string  
  - description: short text  
  - icon: string or media (icon or illustration)  
  - order: integer (for display sorting)

Use case: small cards like “High employment rate”, “Project-based learning”, etc.

4) Program / Course

- Collection type.  
- Fields:
  - title: string  
  - slug: UID  
  - level: string (e.g. “Bac+3”, “Bac+5”)  
  - type: enum (e.g. “initial”, “apprenticeship”, “continuing”)  
  - shortDescription: text  
  - longDescription: rich text or markdown  
  - optional: duration, prerequisites, campus, etc.

Use case: list of programs on the “Programs” page and detailed program pages.

5) Contact block / Contact settings

- Single type.  
- Fields:
  - title: string (e.g. “Any questions?”)  
  - description: text  
  - email: string  
  - phone: string (optional)  
  - formEnabled: boolean (whether a contact form is active on the site)

Use case: configurable contact section on home and/or contact page.

The AI should generate Strapi-related code, types, and API calls that are compatible with this model or minor variations of it.

***

## Target Next.js routing and pages

Recommended routes:

- `/`  
  - Home page
  - Displays hero, highlights, a few latest news items, a short “programs” section, and a contact block.

- `/news`  
  - Lists all public/published news items (paginated if necessary).

- `/news/[slug]`  
  - Displays a detailed view for a single news item fetched by slug.

- `/programs`  
  - Displays a list of all programs with their key info (title, level, type, shortDescription).

- `/programs/[slug]` (optional but recommended)  
  - Detailed program page.

- `/contact` (optional if not fully integrated in the home page)  
  - Contact page with form and/or contact info from Strapi.

The AI should generate examples using `app` router or `pages` router depending on what the user asks, but must be consistent within the project.

***

## Key user stories (functional constraints for the code)

The AI should keep these user stories in mind when proposing implementations.

1) Home hero visible and editable

- As a visitor, I want to see a clear hero (title, subtitle, CTA, image) on the home page.  
- As an editor, I want to update this hero via Strapi without touching code.

Implications for code:

- Create a Strapi single type for hero content.  
- Fetch hero data from Strapi at build time or via server-side rendering.  
- Handle missing content (fallback text/image).

2) News: list + detail

- As a visitor, I want to see recent news on the homepage and browse all news on a dedicated page.  
- As a visitor, I want to click a news item to reach a dedicated detail page by slug.  
- As an editor, I want to create/update/publish/unpublish news via Strapi.

Implications for code:

- List only published news items within valid date range (startDate/endDate, if used).  
- Use clean and SEO-friendly URLs (`/news/[slug]`).  
- Use static generation with `getStaticPaths` / `getStaticProps` or equivalent for slug-based pages, or the app router equivalent.

3) Highlights / advantages section

- As a visitor, I want to quickly understand the main advantages of the school through highlight cards.  
- As an editor, I want to manage these highlights in Strapi and control their order.

Implications for code:

- Fetch highlights from Strapi, sorted by the `order` field.  
- Display them in a responsive grid.

4) Programs list (and optional detail)

- As a visitor, I want to understand what types of programs exist and which ones fit my level.  
- As an editor, I want to manage programs in Strapi (add/update/remove) without code changes.

Implications for code:

- Fetch all programs from Strapi and display key information in a list.  
- If detail pages exist, use slug-based routing (`/programs/[slug]`).

5) Contact block and form

- As a visitor, I want to see clear contact information and optionally send a message via a simple form.  
- As an editor, I want to update the contact text and channels in Strapi.

Implications for code:

- Contact block content should come from the “Contact settings” single type.  
- Optional form with basic validation (name, email, subject, message).  
- Backend handling of the form can be simple (e.g. send email, or just mock it in this school context).

6) Basic performance & SEO

- The site should load fast and be SEO-friendly.  
- Pages should have meaningful `<title>` and meta descriptions.  
- URLs should be readable.

Implications for code:

- Prefer SSG where possible.  
- Use `<Head>` or metadata APIs to set titles and descriptions.  
- Handle images properly (Next Image component, compression).

***

## What the AI should prioritize when helping

When the user asks for help, the AI should:

- Propose code snippets that:
  - Use Next.js (with or without TypeScript, depending on the question).  
  - Integrate with Strapi using HTTP calls (fetch, axios, etc.).  
  - Respect the content types and routes defined in this file.

- Focus on:
  - Fetching data from Strapi (list and detail).  
  - Page generation (SSG/SSR) for news and programs.  
  - Reusable components for layout sections (Hero, NewsCard, ProgramCard, HighlightSection, ContactSection).  
  - Clean, readable code suitable for a school project.

- Avoid:
  - Overly complex patterns that are unnecessary for a small showcase website.  
  - Introducing technologies that are not mentioned, unless explicitly requested.

***

## Example kinds of questions for the AI

This file is meant to be the base context for questions like:

- “Generate a Hero component in Next.js that fetches the hero single type from Strapi and renders it on the home page.”  
- “Show me how to implement `/news/[slug]` with static generation using data from Strapi.”  
- “Give me TypeScript interfaces for the Hero, News, Program, and Highlight content types described in this context.”  
- “Write a helper function to fetch all published news from Strapi with date filtering.”  
- “Propose a simple folder structure for this Next.js + Strapi showcase site.”

The AI should always assume this file is the source of truth for the project’s functional and technical context, unless the user explicitly overrides something.

