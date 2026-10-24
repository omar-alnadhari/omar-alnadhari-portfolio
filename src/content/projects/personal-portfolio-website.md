---
title: "Personal Software Engineering Portfolio"
category: "Frontend Engineering / Web Development"
summary: >-
  A responsive personal software engineering portfolio built with
  Astro, TypeScript, and Tailwind CSS, featuring project case studies,
  accessible navigation, dark/light themes, and automated testing.
technologies:
  - Astro
  - TypeScript
  - Tailwind CSS
  - Playwright
  - Content Collections
  - Vercel
order: 5
featured: false

image: "/images/projects/personal-portfolio-website/01-portfolio-homepage.png"
---

## Project Overview

**Development:** 2026

I designed and developed a personal portfolio website to present my software engineering projects, technical skills, professional experience, and academic background.

The website focuses on performance, responsive design, accessibility, maintainability, and clear technical documentation.

## Technology Stack

- Astro
- TypeScript
- Tailwind CSS
- Astro Content Collections
- Playwright
- Vercel

## Key Features

- Responsive layouts for desktop and mobile devices.
- Dark and light themes with persistent user preferences.
- Sticky navigation with mobile menu support.
- Featured projects and a dedicated projects directory.
- Detailed project case studies.
- Professional experience and technical skills sections.
- Resume and contact links.
- Search engine metadata and custom error pages.
- Automated end-to-end browser testing.

## Engineering Decisions

### Content-Driven Project Management

Astro Content Collections separates project content from presentation components.

This allows projects to be added or updated without rebuilding the website's interface.

### Reusable Components

Shared components provide consistent project cards, navigation, layouts, and visual styling.

### Responsive Design and Accessibility

The website uses responsive layouts, semantic HTML, keyboard navigation support, and accessible interface controls.

### Automated Testing

Playwright tests verify essential website functionality, including navigation, project pages, resume links, and responsive menu behavior.

## Deployment

The website is deployed on Vercel and integrated with GitHub for version-controlled updates and automatic deployments.

## Source Code

[GitHub](https://github.com/omar-alnadhari/omar-alnadhari-portfolio)

## Live Website

[Visit Portfolio](https://omar-alnadhari-portfolio.vercel.app/)
