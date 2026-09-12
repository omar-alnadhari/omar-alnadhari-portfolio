# Eng. Omar Al-Nadhari — Software Engineering Portfolio

A modern, responsive personal portfolio built to present my software engineering experience, technical projects, skills, education, and professional background.

The site is designed as both a professional portfolio and a software engineering project, with a focus on performance, accessibility, maintainability, structured content, testing, and clean architecture.

## Live Website

Deployment URL will be added after production deployment.

## About

I am a Software Engineer and MSc Computer Science candidate specializing in Artificial Intelligence at the University of Pisa.

My work spans backend development, APIs, databases, software testing, parallel computing, machine learning, and data-driven systems.

## Featured Projects

### Developer Workspace Assistant

Backend task-management service exposing REST and MCP interfaces.

**Technologies:** Python, FastAPI, MCP, SQLite, Docker, Pytest

### E-Commerce Platform

Team-based full-stack e-commerce platform for electronic products.

**Technologies:** React, Laravel, PHP, Node.js, MySQL

### Scalable Parallel Computing

C++ performance-engineering project exploring shared-memory, distributed, and SIMD parallelism.

**Technologies:** C++, OpenMP, MPI, AVX2

### Customer Intelligence Analytics

Reproducible customer analytics pipeline covering segmentation, retention, cohorts, and customer lifetime value.

**Technologies:** Python, Pandas, BG/NBD, Gamma-Gamma, GitHub Actions

## Technology Stack

- Astro
- TypeScript
- Tailwind CSS
- Astro Content Collections
- Playwright
- Node.js
- npm
- Git

## Architecture

The portfolio uses a component-based Astro architecture.

```text
src/
├── components/
├── content/
│   └── projects/
├── layouts/
├── pages/
│   └── projects/
└── styles/
```

Project case studies are managed using Astro Content Collections and generated through dynamic static routes.

This makes it easy to add new projects without duplicating page structure or application logic.

## Main Features

- Responsive desktop and mobile design
- Reusable Astro components
- Dynamic project case-study generation
- Structured project content using Content Collections
- Mobile navigation
- Professional resume integration
- GitHub, LinkedIn, and email contact links
- Custom 404 page
- SEO metadata
- Open Graph metadata
- `robots.txt`
- Sitemap integration
- Automated end-to-end testing
- Production build support

## Local Development

### Requirements

- Node.js 22.12.0 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The local site will normally be available at:

```text
http://localhost:4321
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Testing

The portfolio includes Playwright end-to-end tests covering important user flows and site functionality.

Run the test suite with:

```bash
npm run test:e2e
```

Current verified status:

```text
5 tests passed
```

The tests currently verify:

- Homepage rendering
- Featured project navigation
- Project case-study routing
- Resume link availability
- Custom 404 handling
- Professional contact links

## Project Content

Project content is stored separately from page layout using Astro Content Collections.

Each project includes structured metadata such as:

- Title
- Category
- Summary
- Technologies
- Featured status
- Display order
- GitHub/demo links when available

This architecture allows future projects to be added with minimal changes to the application code.

## Resume

The portfolio includes a downloadable Software Engineering resume:

`Omar_AlNadhari_Software_Engineer_Resume.pdf`

## Deployment

Production deployment will be configured after the final portfolio review.

The intended deployment workflow is:

```text
GitHub
   ↓
Build & validation
   ↓
Vercel
   ↓
Production website
```

## Author

**Eng. Omar Al-Nadhari**

Software Engineer  
MSc Computer Science Candidate — Artificial Intelligence  
University of Pisa

- GitHub: https://github.com/omar-alnadhari
- LinkedIn: https://www.linkedin.com/in/omar-al-nadhari