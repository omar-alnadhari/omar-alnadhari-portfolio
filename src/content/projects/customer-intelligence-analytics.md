---
title: Customer Intelligence Analytics
category: Data & AI
summary: A reproducible customer-intelligence pipeline that transforms e-commerce transactions into segmentation, retention-risk, and predictive customer-lifetime-value insights.
technologies:
  - Python
  - Pandas
  - RFM
  - BG/NBD
  - Gamma-Gamma
  - Parquet
  - Pytest
  - GitHub Actions
order: 4
featured: true
image: /images/projects/customer-intelligence-analytics/01-retention-risk-vs-clv.png
---

## Overview

Customer Intelligence Analytics is a multi-stage analytics project that transforms raw e-commerce transaction data into customer-level behavioral and value insights.

The project combines descriptive customer analysis with probabilistic customer modeling to answer questions such as:

- Which customers are the most valuable?
- Which customers show signs of retention risk?
- How can customers be grouped by purchasing behavior?
- Which customers are expected to generate higher future value?
- How can the analytical workflow remain reproducible as it evolves?

The project was designed as a structured analytics pipeline rather than a single exploratory notebook.

---

## Problem

Raw transaction records contain information about purchases, customers, and monetary value, but they do not directly provide actionable customer intelligence.

A useful analytical workflow needs to transform transaction-level records into customer-level measures that support:

- Segmentation.
- Retention analysis.
- Repeat-purchase analysis.
- Future purchase modeling.
- Customer lifetime value estimation.

The workflow also needs to remain reproducible so that analytical outputs can be rebuilt consistently from the source data.

---

## Solution

I developed a staged Python analytics workflow that processes transaction data into validated analytical datasets and customer-level outputs.

The project combines:

- Transaction-data preparation.
- RFM analysis.
- Customer segmentation.
- Retention and churn-oriented analysis.
- Repeat-purchase modeling.
- BG/NBD modeling.
- Gamma-Gamma monetary-value modeling.
- Predictive customer lifetime value.
- Structured analytical outputs.
- Automated validation and CI checks.

Intermediate and final outputs are stored in reusable formats such as Parquet, CSV, and JSON.

---

## Retention Risk and Customer Value

One of the central goals of the project was to connect customer activity with customer value.

The following visualization helps identify customers whose future value may be meaningful while their recent behavior indicates greater retention risk.

![Retention risk compared with customer lifetime value](/images/projects/customer-intelligence-analytics/01-retention-risk-vs-clv.png)

This type of analysis can support prioritization decisions by highlighting customers who may deserve additional retention attention rather than treating all inactive or declining customers equally.

---

## RFM Customer Segmentation

RFM analysis summarizes customer behavior using three dimensions:

- **Recency** — how recently the customer purchased.
- **Frequency** — how often the customer purchased.
- **Monetary value** — how much the customer generated.

These measures were used to construct customer segments that provide a more interpretable view of the customer base.

![RFM customer segmentation](/images/projects/customer-intelligence-analytics/02-rfm-customer-segments.png)

The segmentation layer converts transaction history into business-oriented customer groups that can support differentiated engagement and retention strategies.

---

## Predictive Customer Lifetime Value

The project extends descriptive customer analysis with probabilistic modeling.

BG/NBD is used to model repeat-purchase behavior, while Gamma-Gamma modeling is used to estimate expected monetary value.

These components are combined to produce predictive customer lifetime value estimates.

![Predictive customer lifetime value tiers](/images/projects/customer-intelligence-analytics/03-predictive-clv-tiers.png)

The resulting CLV tiers provide a structured way to distinguish customers according to expected future economic value.

---

## Analytical Pipeline

The project follows a staged workflow rather than performing all processing inside one notebook.

Conceptually, the pipeline progresses through:

1. Raw transaction data.
2. Validation and cleaning.
3. Customer-level transformation.
4. RFM calculation.
5. Customer segmentation.
6. Retention and churn-oriented analysis.
7. BG/NBD repeat-purchase modeling.
8. Gamma-Gamma monetary-value modeling.
9. Predictive CLV generation.
10. Validation and structured output generation.

Separating the workflow into stages improves reproducibility, debugging, maintainability, and reuse of intermediate datasets.

---

## Reproducibility and Outputs

A major engineering goal was to make the analytical workflow rebuildable from the original source data.

The final project produces structured analytical artifacts across multiple formats, including Parquet, CSV, and JSON.

A verified local rebuild reproduced the expected pipeline outputs from the raw input data.

The project generated:

- **13 Parquet artifacts**
- **36 CSV/JSON artifacts**

The complete validated pipeline was also rebuilt locally in approximately **183 seconds** during final verification.

---

## Validation and CI

The project includes automated checks designed to protect the analytical workflow from silent regressions.

Validation covers important pipeline assumptions and generated outputs, while GitHub Actions is used to execute the reproducible workflow in CI.

The final project verification included:

- Successful end-to-end pipeline execution.
- Automated validation.
- Reproducible generated artifacts.
- Successful GitHub Actions execution.
- Clean dependency verification.

This moves the project beyond exploratory analysis toward a more engineering-oriented analytics workflow.

---

## Engineering Decisions

### Staged Pipeline

Breaking the workflow into stages makes failures easier to isolate and allows intermediate outputs to be reused without rerunning unrelated analysis.

### Parquet for Analytical Data

Parquet provides an efficient format for structured analytical datasets and preserves data types more effectively than plain-text formats.

### RFM for Interpretability

RFM provides an understandable behavioral segmentation layer before introducing more advanced predictive models.

### BG/NBD and Gamma-Gamma

The probabilistic models allow the project to move from historical description toward expected future purchasing behavior and monetary value.

### Automated Validation

Analytics pipelines can silently produce incorrect outputs even when code executes successfully.

Automated checks therefore provide an additional layer of confidence in the generated datasets and model outputs.

---

## Business Use

The project demonstrates how transaction history can support practical customer-management questions.

The resulting analysis can help identify:

- High-value customers.
- Customers showing retention risk.
- Behaviorally distinct customer segments.
- Customers with greater predicted future value.
- Groups that may require different engagement strategies.

The project does not represent deployment inside a real company; these outputs demonstrate how the analytical workflow could support customer-intelligence decisions.

---

## Limitations

The analysis is based on historical transaction behavior and therefore depends on the quality and representativeness of the underlying dataset.

Customer lifetime value estimates are model-based projections rather than guaranteed future outcomes.

The project also does not currently include a cohort-retention heatmap, so no such visualization is presented in this case study.

---

## Key Takeaways

This project demonstrates the combination of analytics, probabilistic modeling, and software-engineering practices in a reproducible customer-intelligence workflow.

Key lessons include:

- Raw transactions become more useful when transformed into customer-level behavioral metrics.
- RFM provides an interpretable segmentation layer.
- Retention risk should be considered together with customer value.
- Probabilistic models allow customer analysis to move beyond historical reporting.
- Reproducibility and validation are important even in analytics-focused projects.
- Structured pipelines are easier to maintain and extend than isolated notebooks.

---

## Technologies

- Python
- Pandas
- RFM analysis
- BG/NBD
- Gamma-Gamma
- Customer Lifetime Value modeling
- Parquet
- CSV / JSON
- Pytest
- GitHub Actions
- Jupyter Notebook

## Source Code

The complete source code, analytics pipeline, project outputs, and documentation are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/customer-intelligence-analytics)