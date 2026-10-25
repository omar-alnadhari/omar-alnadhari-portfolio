
---
title: "Customer Segmentation Using K-Means Clustering"
category: "Data Science & Machine Learning"
summary: >-
  Built a reproducible unsupervised learning pipeline to segment
  667 telecom customers using K-Means, feature auditing, standardized
  behavioral data, Elbow and Silhouette analysis, PCA visualization,
  and interpretable customer profiles.
technologies:
  - Python
  - scikit-learn
  - Pandas
  - NumPy
  - Matplotlib
  - Seaborn
  - Jupyter
  - Pytest
order: 203
featured: false
group: codveda
level: intermediate
image: "/images/projects/codveda-customer-segmentation-clustering/cover.png"
github: "https://github.com/omar-alnadhari/codveda-customer-segmentation-clustering"
---

## Project Overview

**Organization:** Codveda Technologies  
**Program:** Data Science Internship  
**Level:** Intermediate — Level 2, Task 3  
**Year:** 2026

Developed a reproducible unsupervised machine learning pipeline to explore customer segmentation using K-Means clustering.

The project analyzes telecommunications customer behavior through usage patterns, call activity, service interactions, and account tenure.

The workflow includes data auditing, feature selection, numerical standardization, cluster-count evaluation, PCA visualization, customer profiling, and automated testing.

Unlike supervised churn prediction, the objective is to identify patterns in customer behavior without using known churn labels to train the model.

## Problem and Objective

Customer populations often contain different behavioral patterns that are difficult to identify through manual inspection.

Unsupervised clustering provides a way to explore potential customer groups without requiring predefined segment labels.

The project objectives were to:

- Inspect and validate the supplied customer dataset.
- Select meaningful numerical behavior features.
- Identify redundant and unsuitable variables.
- Standardize features for distance-based clustering.
- Compare candidate numbers of clusters.
- Apply K-Means clustering.
- Visualize cluster assignments using PCA.
- Interpret cluster characteristics in the original feature scale.
- Validate results through automated tests.

The emphasis was on explainable segmentation and responsible interpretation rather than maximizing a clustering score without considering its meaning.

## Dataset

The project uses the supplied `churn-bigml-20.csv` dataset.

### Verified Dataset Characteristics

| Measure | Value |
| --- | ---: |
| Customer records | 667 |
| Total columns | 20 |
| Selected clustering features | 11 |
| Missing values | 0 |
| Exact duplicate rows | 0 |
| Non-finite numerical values | 0 |

The data includes customer account characteristics, telecommunications usage measurements, service-plan information, and a known churn outcome.

The original dataset is preserved, and the pipeline verifies its integrity through a stored SHA-256 checksum.

The `Churn` column is excluded from all clustering and PCA-fitting operations. It is used only for descriptive comparisons after clustering.

## Data Preparation and Feature Engineering

### 1. Dataset and Feature Audit

The initial workflow evaluates data quality, variable types, feature redundancy, and the suitability of attributes for distance-based clustering.

The analysis identifies highly correlated usage and billing fields to avoid unintentionally assigning duplicate importance to the same behavior.

### 2. Feature Selection

The final clustering matrix contains 11 numerical features:

1. Account length
2. Number of voicemail messages
3. Total daytime minutes
4. Total daytime calls
5. Total evening minutes
6. Total evening calls
7. Total nighttime minutes
8. Total nighttime calls
9. Total international minutes
10. Total international calls
11. Customer-service calls

These features represent account tenure, communication activity, and service interactions.

### 3. Excluding Unsuitable Features

Several variables were excluded from the clustering matrix.

**Churn:** Excluded because it is a known outcome and using it would undermine unsupervised segmentation.

**State:** Excluded because one-hot encoding 51 geographic categories could disproportionately influence Euclidean distances.

**Area Code:** Excluded because it is a nominal identifier rather than a continuous measurement.

**Billing Charges:** Excluded because charge values are almost perfectly correlated with their corresponding usage-minute fields.

**Voice Mail Plan:** Excluded because its information is already represented by the number of voicemail messages.

**International Plan:** Excluded after sensitivity analysis showed that including the standardized binary feature could make the clustering reproduce the existing international-plan categories rather than uncover broader behavioral patterns.

### 4. Numerical Standardization

Used scikit-learn's `StandardScaler` to place selected numerical features on comparable scales.

This is important because K-Means relies on Euclidean distances, and variables with larger numerical ranges could otherwise dominate cluster assignment.

No missing-value imputation was required.

Observed statistical extremes were retained because they were plausible observations rather than confirmed data errors.

## K-Means Clustering

### Model Configuration

The clustering implementation uses:

- Algorithm: K-Means
- Candidate cluster counts: K = 2 through 10
- Random state: 42
- Initializations: 20
- Input: 11 standardized numerical features

No supervised train/test split is used because the objective is unsupervised structure discovery.

### Elbow Method

The Elbow Method evaluates within-cluster inertia for different numbers of clusters.

The inertia curve decreases smoothly without producing a clearly defined elbow.

A geometric distance-to-chord heuristic identifies a weak bend around K = 5, but this alone is insufficient to establish an optimal solution.

### Silhouette Analysis

Silhouette analysis compares how closely observations resemble their assigned cluster relative to other clusters.

The documented results include:

| Clusters (K) | Silhouette Score |
| --- | ---: |
| **2** | **0.10974** |
| 3 | 0.07535 |
| 4 | 0.07268 |
| 5 | 0.07711 |
| 6 | 0.07476 |
| 7 | 0.07364 |
| 8 | 0.07474 |
| 9 | 0.07515 |
| 10 | 0.07324 |

K = 2 was selected because it produced the strongest silhouette score among the evaluated candidates while maintaining two non-trivial and interpretable groups.

However, the score remains modest, indicating substantial overlap between customers rather than sharply separated populations.

## Verified Clustering Results

The final K-Means model divides the 667 customers into two groups.

| Cluster | Descriptive Name | Customers | Share |
| --- | --- | ---: | ---: |
| 0 | Minimal Voicemail Use | 485 | 72.71% |
| 1 | Active Voicemail Users | 182 | 27.29% |

**Final Silhouette Score: 0.109737**

Cluster identifiers are arbitrary labels and do not represent rankings.

### Cluster 0 — Minimal Voicemail Use

This group contains 485 customers.

Customers average approximately **0.19 voicemail messages**, substantially below the overall dataset average of 8.41.

Other retained usage and service-contact measures remain relatively close to the overall customer averages.

### Cluster 1 — Active Voicemail Users

This group contains 182 customers.

Customers average approximately **30.30 voicemail messages**, considerably above the overall dataset average.

Other retained behavioral measures remain comparatively close to the overall averages.

These segments are primarily distinguished by voicemail activity rather than by consistently different behavior across every feature.

## Post-Hoc Customer Analysis

After cluster assignment, the project compares selected descriptive variables that were excluded from model fitting.

| Measure | Cluster 0 | Cluster 1 |
| --- | ---: | ---: |
| Churn rate | 16.70% | 7.69% |
| International-plan rate | 7.63% | 8.79% |
| Voice-mail-plan rate | 1.44% | 100.00% |

The observed churn rate differs between the two groups.

However, this is a post-hoc descriptive association.

The clustering model was not trained to predict churn, and the observed differences do not establish causality or predictive performance.

## Principal Component Analysis

Principal Component Analysis (PCA) is used to visualize the standardized customer data in two dimensions.

### Explained Variance

| Component | Explained Variance |
| --- | ---: |
| Principal Component 1 | 10.94% |
| Principal Component 2 | 10.20% |
| Combined | 21.14% |

The two-dimensional projection captures only **21.14%** of the standardized dataset's variance.

Therefore, the PCA scatter plot provides a partial visualization of the clustering structure.

The actual K-Means model is fitted using the full 11-dimensional standardized feature matrix, not the two PCA components.

## Visualizations and Reports

The project generates original analytical visualizations.

### Elbow Curve

Displays the relationship between candidate cluster counts and within-cluster inertia.

### Silhouette Score Comparison

Compares the silhouette scores of the evaluated K-Means solutions.

### PCA Cluster Projection

Displays customer cluster assignments in a two-dimensional PCA projection.

### Cluster Size Distribution

Compares the numbers of customers assigned to each segment.

### Cluster Profile Heatmap

Visualizes how cluster-level feature means differ from the overall standardized population means.

The original figures are available in the repository:

- `figures/elbow_curve.png`
- `figures/silhouette_scores.png`
- `figures/pca_clusters.png`
- `figures/cluster_sizes.png`
- `figures/cluster_profile_heatmap.png`

## Testing and Reproducibility

The project includes automated validation using Pytest.

**Verified result: 33 tests passed.**

The test suite covers:

- Source dataset integrity.
- Exclusion of the churn outcome from clustering.
- Feature selection and preprocessing.
- Valid standardized numerical values.
- Cluster-count evaluation.
- Final cluster labels.
- PCA output dimensions.
- Customer segment profiles.
- Generated datasets and reports.
- Visualization outputs.
- Preservation of the original dataset checksum.

The project also includes a Jupyter Notebook containing 32 cells, including 15 successfully executed code cells.

The workflow can be reproduced using the standalone `main.py` script.

Generated results include processed customer segments, clustering metrics, segment profiles, visualization files, and a structured analytical report.

## Engineering Challenges and Decisions

### Challenge 1: Selecting Meaningful Features

**Problem:** Redundant, categorical, or outcome-related attributes can distort distance-based clustering.

**Solution:** Conduct a feature-suitability audit and select 11 behavioral and account characteristics.

### Challenge 2: Avoiding Outcome Leakage

**Problem:** Including the known churn label would compromise the unsupervised nature of the experiment.

**Solution:** Exclude the outcome from all preprocessing, PCA fitting, cluster-count selection, and K-Means fitting.

### Challenge 3: Preventing Feature Dominance

**Problem:** Differences in feature scales and redundant billing variables can disproportionately influence Euclidean distances.

**Solution:** Apply numerical standardization and remove strongly redundant features.

### Challenge 4: Selecting the Number of Clusters

**Problem:** The inertia curve provides no decisive elbow, while silhouette scores remain relatively low.

**Solution:** Compare K = 2 through 10 and document the selection of K = 2 alongside the limited separation quality.

### Challenge 5: Interpreting Customer Segments

**Problem:** Cluster labels alone do not explain the business meaning of each group.

**Solution:** Examine feature averages in their original units and use descriptive cluster names that reflect the observed patterns.

### Challenge 6: Responsible Visualization

**Problem:** A two-dimensional PCA projection may hide important information from the original feature space.

**Solution:** Fit K-Means on the full standardized feature matrix and explicitly document the limited variance explained by the PCA visualization.

## Limitations

The selected K-Means solution has a modest silhouette score, indicating overlapping customer groups.

The final separation is driven largely by voicemail-message activity.

Other limitations include:

- The dataset contains only 667 observations.
- The original dataset's provenance, sampling process, and collection dates are undocumented.
- K-Means assumes distance-based cluster structure and is sensitive to feature selection and scaling.
- PCA retains only 21.14% of the standardized variance in two dimensions.
- Segment interpretations depend on the selected feature representation.
- Post-hoc churn comparisons are descriptive, not causal.
- No external dataset was used to validate segment stability.

The project is an exploratory unsupervised learning experiment.

It does not implement churn prediction, supervised classification, deployment, or a customer-facing recommendation system.

## Source Code

The complete implementation, Jupyter Notebook, processed dataset, clustering reports, original visualizations, and automated tests are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/codveda-customer-segmentation-clustering)
