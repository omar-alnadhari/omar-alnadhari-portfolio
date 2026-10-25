
---
title: "Al-Nadhari Campus"
category: "Android Application"
summary: >-
  A native Android application for organizing study tasks,
  managing courses, tracking deadlines, and monitoring task
  completion, built with Java and SQLite.
technologies:
  - Java
  - Android
  - XML
  - SQLite
  - JUnit
  - Android SDK
order: 6
featured: false
group: core
image: "/images/projects/al-nadhari-campus/dashboard.png"
github: "https://github.com/omar-alnadhari/al-nadhari-campus"
---

## Project Overview

**Project:** Al-Nadhari Campus  
**Type:** Native Android Application  
**Developer:** Omar Al-Nadhari  
**Year:** 2026  
**Status:** Completed — Initial Release

**Organize Tasks. Manage Courses. Stay Productive.**

Al-Nadhari Campus is a native Android productivity application designed to help students organize their academic responsibilities through a structured and intuitive interface.

Built with Java and Android XML, the application combines task management, course organization, deadline tracking, priority classification, and progress monitoring.

It uses an on-device SQLite database to persist records and maintain relational integrity between tasks and courses.

The project demonstrates practical native Android development, object-oriented programming, relational database design, CRUD operations, interface implementation, and automated testing.

## Problem and Objectives

Academic responsibilities often involve multiple courses, overlapping deadlines, and tasks with different priorities.

Managing this information across disconnected tools can make it difficult to maintain a clear overview of upcoming work and completed activities.

Al-Nadhari Campus addresses this challenge by bringing essential study-planning features into a single Android application.

The primary objectives were to:

- Organize academic tasks by course.
- Track deadlines and task priorities.
- Monitor pending and completed work.
- Search existing tasks efficiently.
- Persist application data locally.
- Maintain valid relationships between tasks and courses.
- Provide a straightforward interface for everyday use.

## Key Features

### Task Management

Users can create, view, edit, and delete academic tasks.

Each task contains structured information, including a title, description, associated course, due date, priority, and completion status.

Deletion operations include confirmation to reduce the risk of accidental data loss.

### Course Management

Users can create, view, rename, and delete courses.

Tasks can be associated with individual courses, allowing academic work to be organized around specific subjects.

The application prevents deletion of a course while tasks are still associated with it.

### Deadline Tracking

Users can assign due dates to tasks and review tasks ordered by their deadlines.

This provides a structured view of upcoming academic responsibilities.

### Priority Classification

Tasks can be assigned one of three priority levels:

- Low
- Medium
- High

Priority classification helps distinguish between tasks based on their relative importance.

### Task Status Tracking

Each task can be marked as:

- Pending
- Completed

Status updates are persisted in the local database and reflected in the application's task statistics.

### Task Search

The application supports searching by:

- Task title
- Task description
- Course name

This allows users to locate relevant tasks without manually browsing the complete list.

### Dashboard Statistics

The main dashboard provides a summary of:

- Total tasks
- Pending tasks
- Completed tasks

These statistics give users an overview of their recorded workload and completion progress.

### Offline Data Persistence

Tasks and courses are stored locally using SQLite.

The application's core functionality does not require a user account, external API, hosted database, or internet connection.

## Technology Stack

| Area | Technology |
| --- | --- |
| Platform | Native Android |
| Programming Language | Java |
| User Interface | Android XML, Android Views |
| Database | SQLite |
| Database Management | SQLiteOpenHelper |
| Lists | RecyclerView |
| Navigation | Activities and Intents |
| Build System | Gradle Kotlin DSL |
| Development Environment | Android Studio |
| Unit Testing | JUnit |
| Instrumented Testing | AndroidJUnit4 |
| Minimum Android SDK | API 24 |
| Application ID | com.alnadhari.campus |
| Version | 1.0 |

## Application Architecture

Al-Nadhari Campus follows an Activity-based Android application structure.

The implementation separates screen interactions, list presentation, and database operations through dedicated Java classes.

### User Interface Layer

Android Activities manage individual screens and coordinate user interactions.

The application includes screens for:

- Dashboard navigation and task statistics.
- Creating and editing tasks.
- Browsing recorded tasks.
- Viewing task details and updating status.
- Searching tasks.
- Managing courses.

### List Presentation

RecyclerView components display task and course records through reusable item views.

Dedicated adapters bind application data to these lists.

### Data Access Layer

`DatabaseHelper`, implemented using `SQLiteOpenHelper`, manages the local SQLite database.

Its responsibilities include:

- Database creation.
- Table definitions.
- Task CRUD operations.
- Course CRUD operations.
- Search queries.
- Task ordering.
- Dashboard statistics.
- Relational integrity enforcement.

The architecture keeps database operations centralized rather than embedding SQL directly throughout the interface code.

## Database Design

The application uses a relational SQLite database containing two principal tables.

### Courses

The `courses` table stores:

- Course ID
- Unique course name

### Tasks

The `tasks` table stores:

- Task ID
- Title
- Description
- Course ID
- Due date
- Priority
- Status

### Relational Data Integrity

A course can contain multiple tasks, creating a one-to-many relationship.

The `course_id` field in the tasks table references the corresponding course record.

Foreign-key enforcement protects the relationship between these tables.

The database uses `ON DELETE RESTRICT` to prevent deletion of a course that still contains associated tasks.

This ensures that linked task records are not left referencing nonexistent courses.

## Application Screens

The application includes five principal interfaces.

### Dashboard / Home Screen

Provides application navigation and summary statistics for total, pending, and completed tasks.

### Add New Task

Allows users to enter task information, select an associated course, configure priority, and assign a due date.

The same workflow supports editing existing tasks.

### My Tasks

Displays saved tasks and supports navigation to task details, status changes, editing, and deletion.

### Search Tasks

Allows users to locate tasks through their titles, descriptions, or associated courses.

### Manage Courses

Provides course creation, renaming, listing, and deletion with relational integrity safeguards.


## Application Screenshots

The following screenshots were captured directly from the running Android application using Android Emulator. They showcase the main application screens and workflows.

<div class="not-prose my-8 grid grid-cols-1 gap-6 sm:grid-cols-2">

  <figure class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
    <img
      src="/images/projects/al-nadhari-campus/dashboard.png"
      alt="Al-Nadhari Campus dashboard"
      class="mx-auto block max-h-[520px] max-w-full object-contain"
      loading="lazy"
    />
    <figcaption class="mt-4 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
      Dashboard / Home Screen
    </figcaption>
  </figure>

  <figure class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
    <img
      src="/images/projects/al-nadhari-campus/add-task.png"
      alt="Al-Nadhari Campus Add New Task screen"
      class="mx-auto block max-h-[520px] max-w-full object-contain"
      loading="lazy"
    />
    <figcaption class="mt-4 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
      Add New Task
    </figcaption>
  </figure>

  <figure class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
    <img
      src="/images/projects/al-nadhari-campus/task-list.png"
      alt="Al-Nadhari Campus My Tasks screen"
      class="mx-auto block max-h-[520px] max-w-full object-contain"
      loading="lazy"
    />
    <figcaption class="mt-4 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
      My Tasks
    </figcaption>
  </figure>

  <figure class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
    <img
      src="/images/projects/al-nadhari-campus/search-tasks.png"
      alt="Al-Nadhari Campus Search Tasks screen"
      class="mx-auto block max-h-[520px] max-w-full object-contain"
      loading="lazy"
    />
    <figcaption class="mt-4 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
      Search Tasks
    </figcaption>
  </figure>

  <figure class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
    <img
      src="/images/projects/al-nadhari-campus/manage-courses.png"
      alt="Al-Nadhari Campus Manage Courses screen"
      class="mx-auto block max-h-[520px] max-w-full object-contain"
      loading="lazy"
    />
    <figcaption class="mt-4 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
      Manage Courses
    </figcaption>
  </figure>

</div>


## Testing & Quality Assurance

The project includes automated unit and Android instrumented tests executed during development.

### Verified Test Results

| Test Suite | Passed | Total |
| --- | ---: | ---: |
| Java Unit Tests | 3 | 3 |
| Android Instrumented Tests | 8 | 8 |
| **Total** | **11** | **11** |

**11 Automated Tests Passed**

### Java Unit Testing

The local JUnit tests verify aspects of the task and course data models.

They cover model property storage and independence between task instances.

### Android Instrumented Testing

The Android instrumented tests verify SQLite database behavior in an Android environment.

Covered operations include:

- Default course creation.
- Course creation, updating, and deletion.
- Task creation, updating, and deletion.
- Task completion status changes.
- Input and status validation.
- Search operations.
- Deadline-based task ordering.
- Restrictions on deleting courses with associated tasks.

Instrumented database tests use a fresh in-memory SQLite database to isolate test data from normal application records.

### Testing Scope

The reported results represent the 11 automated tests that were executed successfully.

They do not establish complete code coverage or comprehensive automated testing of every user-interface interaction.

## Engineering Challenges and Solutions

### Maintaining Relational Integrity

**Challenge:** Prevent tasks from referencing deleted courses.

**Solution:** Implement SQLite foreign-key constraints and restrict deletion of courses with associated tasks.

**Outcome:** The database preserves valid task-to-course relationships.

### Managing Persistent Application State

**Challenge:** Ensure that task and course changes remain available between application sessions.

**Solution:** Centralize database operations in SQLiteOpenHelper and update stored records when users modify application data.

**Outcome:** Application records persist locally on the Android device.

### Keeping Task Records Searchable

**Challenge:** Allow users to find tasks across different types of stored information.

**Solution:** Implement queries that search task titles, descriptions, and associated course names.

**Outcome:** Users can locate tasks through a single search workflow.

### Verifying Database Operations

**Challenge:** Validate CRUD behavior and relational constraints in an Android environment.

**Solution:** Implement Android instrumented tests using an isolated SQLite database.

**Outcome:** Eight database-focused instrumented tests passed successfully.

### Creating a Maintainable Android Interface

**Challenge:** Support multiple screens and reusable task and course lists.

**Solution:** Use dedicated Activities, Android XML layouts, RecyclerView adapters, and centralized data operations.

**Outcome:** The application provides separated workflows for navigation, task management, search, and course organization.

## Development Status

**Completed — Initial Release (2026)**

The current release implements the core application workflows for:

- Academic task management.
- Course organization.
- Deadline tracking.
- Priority and status management.
- Searchable task records.
- Dashboard statistics.
- Local SQLite persistence.

The application has been launched successfully on an Android Emulator.

All 11 implemented automated tests passed during the documented development verification.

## Limitations and Future Improvements

Al-Nadhari Campus is currently a locally operated Android application.

The initial release does not include:

- Cloud synchronization.
- User accounts or remote authentication.
- A hosted backend.
- A web application.
- Scheduled deadline notifications.

Potential future enhancements include scheduled reminders, database migration support, additional automated UI tests, and accessibility improvements.

These features are not presented as part of the completed initial release.

## Source Code

Al-Nadhari Campus is available as a public source-code repository on GitHub.

The repository contains the Android application source code, Gradle configuration, project documentation, and automated tests.

[View on GitHub](https://github.com/omar-alnadhari/al-nadhari-campus)
