
---
title: "Data Collection & Web Scraping"
category: "Data Science & Machine Learning"
summary: >-
  Built a Python web-scraping pipeline that collected 1,000 unique
  book records across 50 paginated pages, validated and deduplicated
  the data, and exported structured CSV and JSON datasets.
technologies:
  - Python
  - Requests
  - BeautifulSoup
  - Pandas
  - Pytest
  - CSV
  - JSON
order: 101
featured: false
group: codveda
level: beginner
github: "https://github.com/omar-alnadhari/codveda-data-collection-web-scraping"
---

## Project Overview

**Organization:** Codveda Technologies  
**Program:** Data Science Internship  
**Level:** Beginner — Level 1, Task 1  
**Year:** 2026

Developed a Python-based web-scraping pipeline to collect, validate, clean, and export structured product information from a paginated online book catalogue.

The project uses Books to Scrape, a public website specifically designed for practicing web scraping.

The implementation separates HTTP requests, HTML parsing, pagination, data validation, deduplication, and file exporting into independently testable components.

## Problem and Objective

Collecting data from multiple web pages introduces challenges such as incomplete records, duplicate entries, network failures, and inconsistent formatting.

The objective was to implement a reliable data-collection workflow that could navigate a paginated catalogue and produce clean datasets suitable for further analysis.

## Technical Implementation

### Web Data Extraction

Used Python Requests and BeautifulSoup to extract structured information from HTML product cards.

The scraper collects eight attributes per book:

- Title
- Price in GBP
- Star rating
- Availability
- Stock status
- Product URL
- Image URL
- Source page

### Automated Pagination

Implemented pagination by following the website's next-page links rather than hardcoding page URLs.

The scraper tracks visited pages to detect navigation loops and supports configurable limits for smaller demonstration runs.

### Data Validation and Cleaning

Implemented validation rules for required fields, numeric prices, ratings, stock indicators, and URLs.

Pandas is used to organize valid records and remove duplicates using product URLs as unique identifiers.

Malformed product cards are logged and excluded without discarding other valid records.

### Error Handling

The HTTP client includes configurable timeouts, bounded retries, request delays, and logging.

The implementation handles transient network failures, unexpected HTTP responses, invalid HTML content, and pagination errors.

### Data Export

The processed dataset is exported in two formats:

- CSV for spreadsheet and analytical workflows.
- JSON for structured programmatic consumption.

## Verified Results

A full collection run completed on August 15, 2026.

| Metric | Result |
| --- | ---: |
| Unique book records | 1,000 |
| Catalogue pages processed | 50 |
| Records per catalogue page | 20 |
| Dataset attributes | 8 |
| Export formats | CSV and JSON |

The automated Pytest suite passed successfully.

## Testing and Reliability

Deterministic tests use local HTML fixtures and mocked HTTP sessions instead of depending on live network availability.

The tests cover:

- HTML field extraction.
- URL normalization.
- Pagination and last-page detection.
- Duplicate removal.
- Invalid records.
- Request and retry behavior.
- CSV and JSON export.

## Engineering Challenges

### Reliable Pagination

**Challenge:** Navigate all catalogue pages without missing records or entering infinite loops.

**Solution:** Follow next-page links dynamically and track previously visited URLs.

### Data Quality

**Challenge:** Prevent malformed or repeated entries from contaminating the final dataset.

**Solution:** Validate extracted records and apply URL-based deduplication before exporting.

### Network Resilience

**Challenge:** Handle temporary HTTP failures without immediately terminating the collection process.

**Solution:** Apply request timeouts, bounded retries, controlled delays, and descriptive logging.

## Limitations

The dataset comes from a demonstration website containing fictional book information.

The project focuses on static HTML scraping. JavaScript-rendered websites and browser automation were intentionally outside its scope.

Changes to the source website's HTML structure may require updates to the parsing logic.

## Source Code

The complete implementation, documentation, tests, and dataset outputs are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/codveda-data-collection-web-scraping)
