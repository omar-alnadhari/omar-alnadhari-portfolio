
---
title: "House Price Prediction & Regression Modeling"
category: "Data Science & Machine Learning"
summary: >-
  Built reproducible, leakage-safe regression pipelines to predict
  area-level median housing values, comparing Linear Regression,
  Decision Tree, and Random Forest models. The best model achieved
  a held-out R² of 0.8769.
technologies:
  - Python
  - Pandas
  - NumPy
  - scikit-learn
  - Matplotlib
  - Pytest
  - Jupyter
order: 201
featured: false
group: codveda
level: intermediate
image: "/images/projects/codveda-house-price-regression/cover.png"
github: "https://github.com/omar-alnadhari/codveda-house-price-regression"
---

## Project Overview

**Organization:** Codveda Technologies  
**Program:** Data Science Internship  
**Level:** Intermediate — Level 2, Task 1  
**Year:** 2026

Developed a reproducible machine learning workflow for predicting area-level median housing values from numerical characteristics.

The project compares three regression algorithms:

- Linear Regression
- Decision Tree Regression
- Random Forest Regression

Its primary engineering focus is reliable data loading, leakage-safe preprocessing, consistent model evaluation, and transparent reporting of predictive performance.

The workflow includes reusable Python modules, a Jupyter Notebook, automated tests, and generated diagnostic visualizations.

## Problem and Objective

Regression modeling estimates continuous numerical outcomes from available features.

The objective was to evaluate how linear and nonlinear regression algorithms perform when predicting the `MEDV` target using 13 area-level numerical characteristics.

Rather than optimizing exclusively for training accuracy, the implementation compares models on an untouched test set to assess their ability to generalize to unseen observations from the same dataset.

The project does not predict individual property transactions or current real-estate market prices.

## Dataset

The project uses the supplied `house Prediction Data Set.csv` file.

### Verified Dataset Characteristics

| Measure | Value |
| --- | ---: |
| Total observations | 506 |
| Total columns | 14 |
| Numerical predictors | 13 |
| Target | MEDV |
| Missing values | 0 |
| Exact duplicate rows | 0 |
| Target range | 5.0–50.0 |

Each observation describes an aggregate geographic area rather than an individual home sale.

### Data Loading Challenge

Despite its `.csv` extension, the original file is whitespace-delimited and contains no column headers.

Using default CSV loading would incorrectly interpret the data.

The implementation explicitly handles the delimiter, assigns the documented 14-column schema, and validates the resulting dataset.

The raw input file is preserved without modification.

## Data Preparation and Preprocessing

### Target Separation

The target variable `MEDV` is separated from the predictor matrix before splitting or preprocessing.

This helps prevent accidental inclusion of the value being predicted among the model inputs.

### Reproducible Train/Test Split

The dataset is divided using a shuffled 80/20 holdout split with `random_state=42`.

| Dataset Partition | Observations |
| --- | ---: |
| Training | 404 |
| Testing | 102 |

All three models use the same training and test observations.

The test set remains separate during model fitting.

### Leakage-Safe Pipelines

Preprocessing is implemented inside scikit-learn pipelines so transformation parameters are learned from training data only.

For Linear Regression, the pipeline includes median imputation and feature standardization.

Decision Tree and Random Forest pipelines use median imputation without unnecessary feature scaling.

The dataset contains no missing values, so imputation did not replace any observations during the verified run.

### Outlier Policy

Extreme observations were retained rather than removed solely because they exceeded a statistical threshold.

The dataset also contains 16 observations whose target value is capped at 50.0. This upper-bound censoring is documented as a modeling limitation.

## Model Development

### Linear Regression

Linear Regression serves as the baseline model.

It provides a straightforward reference for evaluating how effectively a linear relationship explains variation in the target.

### Decision Tree Regressor

Decision Tree Regression captures nonlinear relationships and feature interactions.

An unrestricted tree was evaluated to examine both predictive performance and potential overfitting.

### Random Forest Regressor

Random Forest combines multiple decision trees to reduce the instability and overfitting often associated with individual trees.

The implementation uses 300 estimators and a fixed random seed for reproducibility.

## Model Evaluation

The models were evaluated using:

- Mean Squared Error (MSE)
- Root Mean Squared Error (RMSE)
- Mean Absolute Error (MAE)
- Coefficient of Determination (R²)

All reported test metrics come from the same held-out dataset.

## Verified Results

| Model | Test MSE | Test RMSE | Test R² |
| --- | ---: | ---: | ---: |
| Linear Regression | 24.2911 | 4.9286 | 0.6688 |
| Decision Tree | 17.8156 | 4.2209 | 0.7571 |
| **Random Forest** | **9.0292** | **3.0049** | **0.8769** |

### Best Performing Model

**Random Forest achieved the strongest held-out performance.**

Its verified results were:

- Test R²: **0.8769**
- Test MSE: **9.0292**
- Test RMSE: **3.0049**
- Test MAE: **2.0822**

Random Forest ranked first across the selected held-out evaluation metrics.

### Overfitting Analysis

The unrestricted Decision Tree achieved a training R² of 1.0000 but dropped to approximately 0.7571 on the test set.

This indicates substantial overfitting.

Random Forest demonstrated better generalization, with a smaller training/test performance gap and stronger held-out predictive accuracy.

Linear Regression had a smaller generalization gap but lower overall predictive performance.

## Model Diagnostics and Visualizations

The project generates four diagnostic figures:

### Actual vs. Predicted Values

Compares Random Forest predictions against the observed target values and an ideal prediction diagonal.

### Residual Analysis

Examines prediction errors using residuals defined as:

`Residual = Actual - Predicted`

This helps investigate systematic patterns and potential prediction bias.

### Model Comparison

Visualizes held-out R² and RMSE across the three regression algorithms.

### Feature Importance

Reports Random Forest impurity-based feature importance.

These values describe predictive contributions within the fitted model and should not be interpreted as causal effects.

The original figures are available in the project's GitHub repository.

## Testing and Reproducibility

The project includes automated Pytest validation.

**Verified result: 21 tests passed.**

The tests cover:

- Raw data integrity.
- Dataset loading and schema validation.
- Missing-value and duplicate checks.
- Correct target separation.
- Reproducible train/test splitting.
- Pipeline preprocessing behavior.
- Model configuration.
- Valid predictions and evaluation metrics.
- Generation of reports and visualization files.

The accompanying Jupyter Notebook contains 33 cells, including 19 executable code cells.

All 19 code cells were executed successfully during the documented verification.

The workflow can also run directly through `main.py`, producing reports and visualizations without requiring manual notebook execution.

## Engineering Challenges and Decisions

### Challenge 1: Nonstandard Input Format

**Problem:** The source file uses whitespace-separated values despite having a CSV extension.

**Solution:** Implement explicit parsing and schema validation rather than relying on default CSV assumptions.

### Challenge 2: Preventing Data Leakage

**Problem:** Applying preprocessing before separating training and test data can leak information into model evaluation.

**Solution:** Separate the target and holdout set before fitting, and keep learned preprocessing inside scikit-learn pipelines.

### Challenge 3: Fair Model Comparison

**Problem:** Different evaluation splits can make model comparisons misleading.

**Solution:** Evaluate all models against the same untouched test set using consistent regression metrics.

### Challenge 4: Model Overfitting

**Problem:** A single Decision Tree can fit training observations extremely closely while generalizing poorly.

**Solution:** Compare training and test behavior and evaluate Random Forest as an ensemble alternative.

### Challenge 5: Reproducibility

**Problem:** Manual notebooks alone can make it difficult to repeat and verify results.

**Solution:** Implement reusable modeling functions, a standalone execution script, documented output artifacts, and automated tests.

## Limitations and Responsible Use

The dataset is small, historical, and describes aggregate areas rather than individual real-estate transactions.

The documented evaluation measures performance on a random holdout from the same dataset. It does not demonstrate generalization to new geographic regions or future housing markets.

Additional limitations include:

- The target is capped at 50.0 for some observations.
- No external, geographical, or temporal validation was performed.
- The original source file does not provide complete provenance or licensing metadata.
- Some legacy predictors relate to racial composition and socioeconomic status and raise fairness concerns.
- Feature importance is predictive, not causal.

The model is an educational regression experiment and is not suitable for consequential housing, lending, pricing, or policy decisions without substantial additional validation and review.

No deployment or production prediction API was implemented.

## Source Code

The complete source code, Jupyter Notebook, automated tests, evaluation reports, and diagnostic figures are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/codveda-house-price-regression)
