
---
title: "Airline Passenger Time Series Forecasting"
category: "Data Science & Machine Learning"
summary: >-
  Developed a reproducible time-series forecasting pipeline using
  144 monthly observations, seasonal decomposition, exponential
  smoothing, ARIMA, and SARIMA. Holt-Winters achieved the lowest
  holdout RMSE of 32.49 and was used for a separate 12-month forecast.
technologies:
  - Python
  - Pandas
  - NumPy
  - statsmodels
  - Matplotlib
  - Jupyter
  - Pytest
order: 301
featured: false
group: codveda
level: advanced
image: "/images/projects/codveda-airline-passenger-time-series/cover.png"
github: "https://github.com/omar-alnadhari/codveda-airline-passenger-time-series"
---

## Project Overview

**Organization:** Codveda Technologies  
**Program:** Data Science Internship  
**Level:** Advanced — Level 3, Task 1  
**Year:** 2026

Developed a reproducible time-series analysis and forecasting workflow using historical monthly airline passenger observations.

The project investigates trend, seasonality, and temporal structure before comparing classical forecasting methods on a chronological holdout.

The implementation includes seasonal decomposition, moving averages, exponential smoothing, ARIMA, SARIMA, diagnostic visualizations, automated validation, and a separate 12-month future forecast.

The main objective was to compare forecasting approaches using consistent evaluation procedures rather than assuming that the most complex statistical model would perform best.

## Problem and Objective

Unlike ordinary regression datasets, time-series observations are ordered and can depend on their historical values.

Ignoring this ordering can produce unrealistic evaluations and information leakage.

The project addresses the following objectives:

- Validate and reconstruct the original monthly time series.
- Explore historical trend and seasonality.
- Decompose the series into interpretable components.
- Calculate a trailing 12-month moving average.
- Compare exponential smoothing methods.
- Develop ARIMA and SARIMA forecasting models.
- Evaluate all models using a shared chronological holdout.
- Compare original-scale forecast errors.
- Select a model for a separate 12-month forecast.
- Document assumptions and limitations.

## Dataset

The project uses the supplied `air_passengers.csv` dataset.

### Verified Dataset Characteristics

| Measure | Value |
| --- | ---: |
| Monthly observations | 144 |
| Start date | January 1949 |
| End date | December 1960 |
| Frequency | Monthly |
| Minimum observed value | 104 |
| Maximum observed value | 622 |
| Missing months | 0 |
| Missing observations | 0 |

The source file contains three columns:

- `rownames`
- `time`
- `value`

The `time` column uses fractional-year representations.

The pipeline converts these values into a monthly DatetimeIndex and validates that the resulting dates are unique, consecutive, and correctly ordered.

The processed dataset contains the columns `date` and `passengers`.

The original CSV is preserved unchanged, with its SHA-256 checksum used to support source-data integrity verification.

The CSV does not independently document its external provenance or a numerical unit multiplier, so the analysis retains the supplied measurement scale.

## Exploratory Time Series Analysis

### 1. Historical Trend

The observed series exhibits a rising long-term level between 1949 and 1960.

This indicates that models assuming a constant level may not adequately represent the historical pattern.

### 2. Annual Seasonality

The observations show a recurring seasonal pattern with a period of approximately 12 months.

Seasonal peaks and troughs become larger as the overall series level increases.

This suggests that multiplicative seasonal behavior may be more appropriate than constant-amplitude additive seasonality.

### 3. Seasonal Decomposition

The workflow uses multiplicative decomposition to examine:

- Trend
- Seasonal component
- Residual component

Decomposition helps explain the observed structure but does not, by itself, establish future forecasting accuracy.

### 4. Moving Average

Implemented a trailing 12-month moving average to smooth short-term seasonal fluctuations and visualize the underlying historical level.

The calculation uses past observations rather than future values.

## Forecasting Models

Six forecasting approaches are evaluated.

### 1. Seasonal Naive Baseline

Uses the final observed seasonal cycle from the training period as a fixed-origin forecast baseline.

This provides a reference for determining whether more sophisticated models improve forecasting accuracy.

### 2. Simple Exponential Smoothing

Models the series level without explicitly representing a trend or seasonal component.

Its main limitation is its inability to capture the strong upward trend and recurring seasonal pattern.

### 3. Holt's Linear Trend

Extends exponential smoothing by modeling both the series level and an additive trend.

However, it does not explicitly model annual seasonality.

### 4. Holt-Winters Exponential Smoothing

Models level, trend, and seasonality.

The selected specification uses:

- Additive trend
- Multiplicative seasonality
- Twelve-month seasonal period

The model specification was selected using training-period information and AIC comparison within the evaluated model family.

### 5. ARIMA

Implements an autoregressive integrated moving average model to represent temporal dependence and non-stationary behavior.

The documented selected specification is:

`ARIMA(1, 1, 1)`

The model operates on a log-transformed target.

### 6. SARIMA

Extends ARIMA by explicitly modeling seasonal dependencies.

The selected configuration is:

`SARIMA(0, 1, 1) × (0, 1, 1, 12)`

The model incorporates a twelve-month seasonal period and uses a log-transformed target.

Within-family candidate selection is performed using training data and AIC.

Convergence behavior, model warnings, and candidate errors are recorded.

## Train/Test Evaluation

The dataset is divided chronologically to preserve the order of observations.

| Partition | Period | Observations |
| --- | --- | ---: |
| Training | January 1949 – December 1958 | 120 |
| Testing | January 1959 – December 1960 | 24 |

The chronological split prevents later observations from being used to train models that are evaluated on earlier periods.

All models are evaluated against the same 24-month holdout.

Model selection within each configured statistical family uses training-period information.

### Evaluation Metrics

Two forecasting error metrics are reported.

**Root Mean Squared Error (RMSE)** measures the square root of the average squared forecast error, giving greater weight to larger mistakes.

**Mean Absolute Error (MAE)** measures the average absolute difference between observed and forecast values.

For log-transformed ARIMA and SARIMA models, forecasts are transformed back to the original target scale using a lognormal mean correction.

All reported errors are calculated on the original observation scale.

## Verified Model Results

The following values come from the documented model comparison.

| Forecasting Model | Holdout RMSE | Holdout MAE |
| --- | ---: | ---: |
| **Holt-Winters** | **32.4886** | **28.9772** |
| SARIMA | 40.6301 | 37.1393 |
| ARIMA | 74.9785 | 56.7189 |
| Seasonal Naive | 76.9946 | 71.2500 |
| Holt | 115.7035 | 91.6155 |
| Simple Exponential Smoothing | 137.3290 | 115.2500 |

### Best-Performing Model

**Holt-Winters achieved the lowest RMSE and MAE on the documented holdout.**

The selected model represents the historical upward trend and recurring multiplicative seasonal behavior.

SARIMA ranked second in this comparison.

The results demonstrate that a comparatively straightforward seasonal smoothing model can outperform more complex statistical alternatives on a particular dataset.

However, the winning family was identified using the shared holdout, so its reported result should be treated as descriptive of this evaluation rather than as an independent, untouched production-performance estimate.

## Twelve-Month Future Forecast

After the comparison, the selected Holt-Winters specification was refitted using all 144 historical observations.

The refitted model generates monthly predictions for:

**January 1961 – December 1961**

The future predictions are exported to:

`reports/future_forecast.csv`

A dedicated visualization is saved as:

`figures/future_forecast.png`

These predictions are model-based estimates conditional on historical patterns and assumptions.

They are not actual observed passenger counts for 1961.

## Visualizations and Diagnostic Analysis

The project generates original analytical figures.

### Historical Time Series

Displays the complete monthly series and its long-term development.

### Seasonal Decomposition

Visualizes trend, seasonal effects, and residual behavior.

### Moving Average

Compares the original observations with the trailing 12-month moving average.

### Exponential Smoothing

Illustrates the behavior of different smoothing approaches.

### ACF and PACF

Provides diagnostics for temporal autocorrelation and candidate model identification.

### Model Comparison

Compares forecasting performance across the evaluated approaches.

### Holdout Forecasts

Displays actual holdout observations alongside model predictions.

### Residual Diagnostics

Examines prediction errors for patterns that may indicate model limitations.

### Future Forecast

Shows the separate twelve-month forecast generated after refitting the selected model.

The corresponding original files are available under the repository's `figures/` directory.

## Testing and Reproducibility

The project includes automated Pytest validation and reproducible execution through `main.py`.

The documented tests cover:

- Raw dataset integrity.
- Fractional-year date conversion.
- Monthly frequency validation.
- Chronological training/test boundaries.
- Moving-average and baseline behavior without future-data leakage.
- Seasonal decomposition.
- Forecast alignment.
- Original-scale error calculations.
- Convergence-aware candidate selection.
- Generated reports and figures.
- Separate full-history refitting.

The project also includes a Jupyter Notebook and reusable Python modules for data processing, modeling, plotting, and reporting.

Generated reports preserve forecasting metrics and model-selection information for review.

## Engineering Challenges and Decisions

### Challenge 1: Reconstructing Monthly Dates

**Problem:** The source dataset represents dates through fractional years rather than conventional timestamps.

**Solution:** Convert the original time values into a validated monthly DatetimeIndex.

**Outcome:** The pipeline produces an ordered series with no missing or duplicate months.

### Challenge 2: Preventing Temporal Leakage

**Problem:** Randomly mixing past and future observations would make forecasting evaluation unreliable.

**Solution:** Use a chronological holdout and restrict model fitting and within-family selection to the training period.

**Outcome:** All models are compared against the same subsequent observations.

### Challenge 3: Representing Seasonality

**Problem:** The magnitude of seasonal fluctuations increases as the series level rises.

**Solution:** Investigate multiplicative seasonal decomposition and evaluate seasonal Holt-Winters and SARIMA models.

**Outcome:** Holt-Winters with multiplicative seasonality produces the lowest error in the documented comparison.

### Challenge 4: Comparing Forecasts Fairly

**Problem:** Forecasting models may use different transformations and produce outputs on different scales.

**Solution:** Align forecasts with the same holdout and calculate all reported metrics after returning predictions to the original target scale.

**Outcome:** The results provide a consistent model comparison.

### Challenge 5: Separating Evaluation from Future Forecasting

**Problem:** A future forecast should not be confused with predictions evaluated against observed test values.

**Solution:** Evaluate models on the historical holdout, freeze the chosen specification, and then refit it on the full history for a separate future forecast.

**Outcome:** Evaluation results and future estimates remain clearly distinguished.

## Limitations

This project uses a small historical univariate time series consisting of 144 monthly observations.

Its limitations include:

- No external economic, operational, or market variables.
- Only one fixed chronological holdout.
- No rolling-origin validation.
- Dependence on historical trend and seasonal assumptions.
- No explicit evaluation against structural breaks.
- Forecast uncertainty remains conditional on model assumptions.
- No demonstrated generalization to modern aviation demand.

A rolling-origin backtesting strategy and external predictors could provide stronger evidence of forecasting robustness.

The project is an educational time-series forecasting experiment, not a production aviation-demand prediction system.

## Source Code

The complete source code, Jupyter Notebook, original figures, evaluation reports, and automated tests are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/codveda-airline-passenger-time-series)
