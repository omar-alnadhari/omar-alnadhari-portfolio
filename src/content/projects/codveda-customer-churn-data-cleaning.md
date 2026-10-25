
---
title: "Customer Churn Data Cleaning & Preprocessing"
category: "Data Science & Machine Learning"
summary: >-
  Developed a reproducible customer-churn preprocessing pipeline,
  transforming 2,666 raw records into 2,569 validated records
  with 72 numeric columns through IQR-based outlier filtering,
  categorical encoding, and feature standardization.
technologies:
  - Python
  - Pandas
  - NumPy
  - scikit-learn
  - Pytest
  - CSV
order: 102
featured: false
group: codveda
level: beginner
github: "https://github.com/omar-alnadhari/codveda-customer-churn-data-cleaning"
---

## Project Overview

**Organization:** Codveda Technologies  
**Program:** Data Science Internship  
**Level:** Beginner — Level 1, Task 2  
**Year:** 2026

Developed a reproducible data-cleaning and preprocessing pipeline for a customer-churn dataset supplied as part of the Codveda Technologies Data Science Internship.

The project focuses on preparing raw telecommunications customer data for potential downstream machine learning workflows through quality assessment, outlier handling, categorical encoding, numerical standardization, and automated validation.

The original dataset is preserved, while cleaned data and supporting quality reports are generated separately.

## Problem and Objective

Customer-churn datasets typically combine numerical measurements, categorical attributes, and behavioral information.

Before such data can be used for analytical or predictive tasks, preprocessing must address potential quality issues and ensure that features are represented consistently.

The project's objectives were to:

- Inspect the dataset and document its initial quality.
- Detect missing values and exact duplicate records.
- Identify statistical outliers using the Interquartile Range (IQR) method.
- Convert categorical attributes into numerical representations.
- Standardize eligible numerical features.
- Validate and export the processed dataset.
- Make the preprocessing workflow reproducible and testable.

## Dataset

The project uses the `churn-bigml-80.csv` dataset provided in the internship materials.

The original dataset contains:

- **2,666 customer records**
- **20 columns**
- Customer usage and account information
- Service-plan information
- A binary `Churn` target

The initial audit confirmed:

| Data Quality Measure | Initial Result |
| --- | ---: |
| Customer records | 2,666 |
| Columns | 20 |
| Missing values | 0 |
| Exact duplicate rows | 0 |
| Non-churn records | 2,278 |
| Churn records | 388 |

Although the implementation includes missing-value and duplicate-handling logic, the supplied dataset did not require either operation during the completed run.

## Data Cleaning and Preprocessing

### 1. Initial Data Quality Assessment

Used Pandas to inspect dataset dimensions, column types, missing values, duplicates, and target distribution.

The pipeline generates a data-quality summary to document the input dataset before transformation.

### 2. Outlier Detection Using IQR

Implemented the Interquartile Range method to identify statistical extremes.

For each selected feature, the IQR rule uses:

`IQR = Q3 - Q1`

Values outside the interval from `Q1 - 1.5 × IQR` to `Q3 + 1.5 × IQR` are flagged.

Outlier removal was limited to four independent continuous usage features:

- Total day minutes
- Total evening minutes
- Total night minutes
- Total international minutes

This avoids treating categorical codes, target values, and selected behavioral counts as continuous measurements.

The union of the detected outliers contained **97 unique records**, representing approximately **3.64%** of the original dataset.

After removing these records, **2,569 customer records** remained.

### 3. Categorical Encoding

Categorical features were converted into numerical representations.

The transformations included:

- One-hot encoding for 51 state categories.
- One-hot encoding for the three area-code categories.
- Binary encoding for international-plan status.
- Binary encoding for voice-mail-plan status.
- Binary encoding for the churn target.

The target column was handled separately from the feature transformations.

### 4. Numerical Standardization

Used scikit-learn's `StandardScaler` to standardize 15 eligible numerical features.

These include account length, usage minutes, call counts, charges, and customer-service-call counts.

Binary indicators, one-hot-encoded variables, and the target were excluded from numerical scaling.

### 5. Final Validation and Export

The final validation checks that the processed dataset:

- Contains no missing values.
- Contains no exact duplicate rows.
- Uses only numerical columns.
- Retains a binary churn target.
- Contains no accidental DataFrame index column.
- Is not empty.

The pipeline exports a processed CSV dataset and supporting preprocessing reports.

## Verified Results

The completed preprocessing run produced the following results:

| Measure | Before | After |
| --- | ---: | ---: |
| Records | 2,666 | **2,569** |
| Columns | 20 | **72** |
| Missing values | 0 | 0 |
| Duplicate rows | 0 | 0 |
| Records removed through IQR filtering | — | 97 |

The increase in columns is primarily the result of converting categorical variables into numerical indicator features.

The removed records represent statistical outliers under the selected preprocessing policy, not confirmed data-entry errors.

## Engineering Decisions

### Preserving the Raw Dataset

The original input file is treated as immutable.

All transformations produce separate outputs, allowing the workflow to be repeated and its results compared with the original data.

### Selective Outlier Removal

The pipeline avoids applying IQR removal indiscriminately to all numerical columns.

Instead, it uses selected independent usage-minute features to reduce the risk of discarding records simply because a behavioral count is unusually high.

### Choosing Appropriate Encoding Strategies

Nominal categories are one-hot encoded, while binary variables are mapped to numerical values.

Area codes are treated as identifiers rather than continuous quantities.

### Separating Features and Target

The churn target is kept separate during feature preprocessing to avoid inadvertently applying feature transformations to the label.

## Testing and Reproducibility

The project includes automated tests implemented with Pytest.

**Verified result: 7 passing tests.**

The tests cover:

- Dataset loading and quality assessment.
- Missing-value handling.
- Duplicate detection and removal.
- IQR outlier detection.
- Categorical encoding.
- Feature scaling.
- Final validation and output generation.
- Preservation of the original dataset.

The project also produces supporting reports, including a data-quality summary, outlier report, and preprocessing summary.

## Limitations

This project focuses specifically on data cleaning and preprocessing.

No customer-churn prediction model was trained or evaluated as part of this task.

The IQR method identifies statistical extremes, but unusual customer behavior is not necessarily invalid. Alternative preprocessing strategies could preserve or cap the flagged observations depending on the intended analytical objective.

Feature selection and predictive-model evaluation remain outside this project's scope.

## Source Code

The complete preprocessing implementation, generated datasets, documentation, and automated tests are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/codveda-customer-churn-data-cleaning)
