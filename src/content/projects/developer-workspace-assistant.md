---
title: Developer Workspace Assistant
category: Backend Engineering
summary: A backend workspace service for managing developer tasks through REST and MCP interfaces, built with FastAPI, persistent storage, containerization, and automated testing.
technologies:
  - Python
  - FastAPI
  - MCP
  - SQLite
  - Docker
  - Pytest
order: 1
featured: true
image: /images/projects/developer-workspace-assistant/01-api-overview.png
---

## Overview

Developer Workspace Assistant is a backend service designed to manage developer tasks through both conventional REST endpoints and an MCP-compatible interface.

The project demonstrates how the same workspace data can be exposed to traditional API clients as well as AI and automation tools without maintaining separate systems.

## Problem

Developer workflows increasingly involve a combination of task-management interfaces, development tools, and AI-powered assistants.

A useful workspace service should provide reliable persistent task management while allowing both conventional applications and programmatic AI tools to work with the same underlying data.

## Solution

I built a FastAPI backend that exposes structured task-management operations through REST endpoints and an MCP-compatible interface.

Tasks are persisted using SQLite, request and response data are validated through structured models, Docker provides a reproducible runtime environment, and Pytest is used to verify core backend behavior.

## REST API

The service exposes CRUD operations for developer tasks, including task creation, retrieval, updates, and deletion.

![Creating a task through the FastAPI REST API](/images/projects/developer-workspace-assistant/02-task-api.png)

The example above shows a successful `POST /tasks` request returning HTTP `201 Created` together with the newly persisted task.

## Key Features

- Create, retrieve, update, and delete developer tasks.
- Persist task data using SQLite.
- Validate structured API input and output.
- Provide health-check and root endpoints.
- Expose workspace functionality through MCP.
- Run the backend in a reproducible Docker environment.
- Verify application behavior using automated tests.
- Run automated tests and Docker builds through GitHub Actions.

## Architecture

The application exposes the same task-management capabilities through two interfaces: a conventional REST API and an MCP interface for AI-compatible clients.

REST clients communicate with the FastAPI application directly, while MCP clients connect through a FastMCP server generated from the FastAPI operations.

Both interfaces ultimately use the same application models and SQLite persistence layer, allowing traditional applications and AI tools to work with the same workspace data without maintaining separate backends.

![Developer Workspace Assistant architecture diagram](/images/projects/developer-workspace-assistant/05-architecture.png)

## MCP Integration

The same workspace functionality is exposed through MCP tools, allowing compatible AI clients and automation tools to interact with the task system programmatically.

Available MCP tools include:

- `list_tasks`
- `create_task`
- `get_task`
- `update_task`
- `delete_task`

![MCP tools interacting with the workspace service](/images/projects/developer-workspace-assistant/04-mcp.png)

The MCP HTTP client successfully discovers the available tools, creates a new task, and retrieves persisted tasks from the shared workspace.

## Testing

The project includes automated Pytest coverage for core backend functionality.

![Automated Pytest suite with eight passing tests](/images/projects/developer-workspace-assistant/03-tests.png)

At the verified project stage, the test suite completed successfully with **8 passing tests**.

## Engineering Decisions

### FastAPI

FastAPI provides a typed API layer, automatic OpenAPI documentation, structured validation, and a clean development model for backend services.

### SQLite

SQLite keeps the first version lightweight and easy to run locally while still providing persistent relational storage.

The architecture can later migrate to PostgreSQL if stronger concurrency or production-scale database requirements are introduced.

### REST and MCP

Providing both REST and MCP interfaces allows traditional applications and AI-oriented clients to interact with the same workspace capabilities.

### Docker

Containerization makes the runtime environment reproducible and reduces environment-specific setup differences.

### Automated Testing

Automated tests protect the core backend behavior from regressions as the service evolves.

## Future Improvements

Potential next steps include:

- PostgreSQL support.
- Authentication and authorization.
- Structured application logging.
- Expanded MCP integration tests.
- Docker Compose for multi-service deployment.
- Automated continuous delivery and production deployment.
- Cloud deployment.

## Source Code

The complete source code, documentation, automated tests, Docker configuration, and MCP integration are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/developer-workspace-assistant)