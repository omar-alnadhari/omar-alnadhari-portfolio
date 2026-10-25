
---
title: "Exploratory Data Analysis — Customer Churn"
category: "Data Science & Machine Learning"
summary: >-
  Conducted a reproducible exploratory analysis of 2,666 customer
  records, examining distributions, outliers, feature correlations,
  and churn patterns through statistical summaries and visualizations.
technologies:
  - Python
  - Pandas
  - Matplotlib
  - Seaborn
  - Jupyter
  - Pytest
order: 103
featured: false
group: codveda
level: beginner
image: "/images/projects/codveda-exploratory-data-analysis/cover.png"
github: "https://github.com/omar-alnadhari/codveda-exploratory-data-analysis"
---

## Project Overview

**Organization:** Codveda Technologies  
**Program:** Data Science Internship  
**Level:** Beginner — Level 1, Task 3  
**Year:** 2026

Developed a reproducible exploratory data analysis (EDA) workflow to investigate customer behavior, telecommunications usage patterns, and customer churn.

The project uses Python, Pandas, Matplotlib, Seaborn, and Jupyter Notebook to examine data quality, summarize numerical features, visualize distributions, and identify relationships relevant to customer retention.

This is an independent exploratory analysis task. It does not reuse the processed dataset from the earlier data-cleaning project.

## Problem and Objective

Before developing a predictive model, analysts need to understand the structure and limitations of their data.

The project's objectives were to:

- Assess the completeness and consistency of the dataset.
- Describe numerical and categorical features.
- Identify skewed distributions and unusual observations.
- Examine relationships between numerical variables.
- Explore customer characteristics associated with churn.
- Produce reproducible visualizations and documented findings.

The emphasis was on evidence-based interpretation rather than predictive modeling.

## Dataset

The analysis uses the supplied `churn-bigml-80.csv` dataset.

### Dataset Overview

| Measure | Value |
| --- | ---: |
| Customer records | 2,666 |
| Columns | 20 |
| Numerical analytical features | 15 |
| Categorical features | 4 |
| Churned customers | 388 |
| Observed churn rate | 14.55% |
| Missing values | 0 |
| Duplicate rows | 0 |

The dataset includes customer usage, service-plan information, billing-related measures, and a Boolean churn outcome.

The original CSV was preserved unchanged throughout the analysis.

## Exploratory Analysis Workflow

### 1. Data Quality Assessment

Loaded the raw dataset using Pandas and inspected its dimensions, column types, feature roles, missing values, duplicates, and numerical ranges.

The initial assessment confirmed that all 2,666 records were complete and no exact duplicate rows were present.

### 2. Descriptive Statistics

Calculated descriptive measures including:

- Count and mean.
- Median.
- Standard deviation and variance.
- Minimum and maximum.
- Quartiles and range.
- Skewness.

These statistics provided an initial understanding of customer usage and behavioral variation.

### 3. Distribution Analysis

Created histograms to examine the distributions of selected numerical variables.

Daytime, evening, and nighttime usage were approximately symmetric.

Other features, including customer-service calls, international calls, and voice-mail counts, showed right-skewed distributions.

### 4. Outlier Exploration

Used box plots to examine feature dispersion and identify potential statistical extremes.

Unusual values were treated as observations requiring interpretation rather than automatically assuming that they represented incorrect records.

### 5. Correlation Analysis

Calculated a Pearson correlation matrix and visualized the results using a correlation heatmap.

The analysis identified strong associations between usage minutes and their corresponding charge fields.

These near-perfect relationships largely reflect the way billing charges are derived from usage.

Daytime and evening minutes showed almost no linear relationship, with a Pearson correlation of approximately `r = 0.004`.

### 6. Customer Churn Analysis

Compared selected customer behaviors and service-plan characteristics across churn outcomes.

The analysis used scatter plots and grouped summaries to explore customer-service interactions, daytime usage, and observed churn rates.

## Verified Analytical Findings

### Finding 1: International Plan and Churn

Customers with an international plan had an observed churn rate of **43.7%**, compared with **11.3%** among customers without the plan.

This represents a substantial descriptive difference between the groups.

It does not establish that international-plan enrollment causes customer churn.

### Finding 2: Customer Service Interactions

Churned customers averaged approximately **2.21 customer-service calls**, compared with **1.45 calls** among retained customers.

Customer-service calls had a Pearson correlation of approximately `r = 0.203` with churn.

This was among the strongest non-derived numerical associations identified, although the relationship remained weak in magnitude.

### Finding 3: Daytime Usage

Churned customers averaged approximately **205.2 daytime minutes**, compared with **175.1 minutes** among retained customers.

Daytime minutes had a Pearson correlation of approximately `r = 0.196` with churn.

This suggests a descriptive association in the observed dataset, not a causal relationship.

### Finding 4: Feature Redundancy

Usage-minute and corresponding charge variables exhibited near-perfect correlations.

This indicates that some numerical features contain substantially overlapping information.

Recognizing these relationships is valuable when considering later feature selection and model interpretation.

## Data Visualizations

The project produces analytical figures across multiple categories:

- Histograms of numerical distributions.
- Box plots for spread and potential outliers.
- Scatter plots of selected numerical relationships.
- Pearson correlation heatmap.
- Churn comparisons by service-plan status.

The repository documents **eight presentation-ready figure files containing twelve analytical plot panels**.

The figures are generated through the Jupyter workflow and stored in dedicated project directories.

## Reproducibility and Project Structure

The project includes:

- A Jupyter Notebook containing the exploratory workflow.
- The original input dataset.
- Exported data-quality and statistical summaries.
- A written EDA report.
- Generated visualization files.
- Pytest-based validation code.

The notebook supports execution from the project root or notebook directory using relative paths.

This helps avoid environment-specific absolute file references and supports regeneration of the analysis artifacts.

## Engineering Decisions

### Preserving Source Data

The original dataset remains unchanged, allowing the analysis to be reproduced and inspected independently of its outputs.

### Separating Analysis from Interpretation

Statistical summaries and visualizations provide the evidence for the written findings.

The project distinguishes numerical associations from causal explanations.

### Identifying Derived Features

Recognizing the relationship between usage minutes and billing charges prevents redundant relationships from being mistaken for independent behavioral discoveries.

### Reproducible Analysis

Using a structured notebook, dedicated output directories, and supporting reports makes the workflow easier to review and repeat.

## Limitations

The source dataset was supplied with the internship materials without a formal upstream data dictionary or detailed collection methodology.

The dataset filename suggests an 80% subset, but the repository does not contain documentation establishing the sampling process or a corresponding holdout dataset.

Additional limitations include:

- No unique customer identifier.
- An imbalanced churn outcome, with 14.55% positive cases.
- Missing upstream information about licensing, sampling, and collection period.
- Observational relationships that cannot establish causality.

This project is limited to exploratory analysis. It does not train, evaluate, or deploy a customer-churn prediction model.

## Source Code

The complete Jupyter Notebook, analysis scripts, statistical reports, visualization outputs, and documentation are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/codveda-exploratory-data-analysis)
