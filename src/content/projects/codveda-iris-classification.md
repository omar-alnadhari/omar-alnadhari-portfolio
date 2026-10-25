
---
title: "Iris Species Classification & Model Comparison"
category: "Data Science & Machine Learning"
summary: >-
  Developed leakage-safe multiclass classification pipelines for
  150 Iris flower samples, comparing Logistic Regression, Decision
  Tree, Random Forest, and SVM. The best-performing model achieved
  96.67% held-out test accuracy and 0.9983 macro OvR ROC-AUC.
technologies:
  - Python
  - scikit-learn
  - Pandas
  - NumPy
  - Matplotlib
  - Jupyter
  - Pytest
order: 202
featured: false
group: codveda
level: intermediate
image: "/images/projects/codveda-iris-classification/cover.png"
github: "https://github.com/omar-alnadhari/codveda-iris-classification"
---

## Project Overview

**Organization:** Codveda Technologies  
**Program:** Data Science Internship  
**Level:** Intermediate — Level 2, Task 2  
**Year:** 2026

Developed a reproducible multiclass machine learning workflow for classifying Iris flower species using numerical flower measurements.

The project implements Logistic Regression as its primary classification model and compares its performance against Decision Tree, Random Forest, and Support Vector Machine (SVM).

The implementation emphasizes leakage-safe preprocessing, consistent evaluation, multiclass classification metrics, and transparent model comparison.

The project includes reusable Python code, a Jupyter Notebook, diagnostic visualizations, generated evaluation reports, and automated tests.

## Problem and Objective

Multiclass classification requires predicting one category from several possible classes.

The objective was to identify Iris flower species using four numerical measurements while comparing different classification algorithms under consistent evaluation conditions.

The project addresses several important machine learning concerns:

- Separating training and testing observations.
- Preventing information leakage during preprocessing.
- Selecting appropriate preprocessing for different algorithms.
- Evaluating classification beyond accuracy alone.
- Computing meaningful multiclass ROC curves.
- Comparing model performance and identifying possible overfitting.

## Dataset

The project uses the supplied `iris.csv` dataset.

### Dataset Characteristics

| Measure | Value |
| --- | ---: |
| Total observations | 150 |
| Total columns | 5 |
| Numerical features | 4 |
| Target classes | 3 |
| Missing values | 0 |
| Non-finite values | 0 |
| Additional exact duplicate occurrences | 3 |

### Input Features

The classifier uses four flower measurements:

1. Sepal length
2. Sepal width
3. Petal length
4. Petal width

### Classification Target

The target variable is `species`, containing three classes:

| Iris Species | Samples |
| --- | ---: |
| Setosa | 50 |
| Versicolor | 50 |
| Virginica | 50 |

The dataset is balanced across the three classes.

Consequently, synthetic oversampling, class weighting, and class resampling were not required for this experiment.

Three exact duplicate occurrences were retained because their labels were consistent and there was no evidence of data corruption.

## Machine Learning Workflow

The modeling process follows these stages:

1. Dataset inspection and validation.
2. Feature and target separation.
3. Stratified training/test split.
4. Training-only preprocessing.
5. Training four classification models.
6. Held-out prediction and evaluation.
7. Multiclass ROC-AUC analysis.
8. Model comparison and selection.
9. Exporting reports and visualizations.

### Reproducible Data Splitting

The dataset is divided using an 80/20 stratified split with `random_state=42`.

| Partition | Samples |
| --- | ---: |
| Training | 120 |
| Testing | 30 |

Stratification preserves the representation of all three classes in both partitions.

All four models use the same split for consistent comparison.

### Leakage-Safe Preprocessing

Feature scaling is performed within scikit-learn pipelines.

For models requiring standardization, `StandardScaler` is fitted using training observations only.

The fitted transformations are subsequently applied to the held-out observations.

This prevents the preprocessing stage from learning distributional information from the test data.

## Classification Models

### 1. Logistic Regression

Logistic Regression serves as the primary model required by the internship task.

The implementation uses:

- StandardScaler
- LogisticRegression
- Maximum iterations: 1,000

The pipeline supports multiclass species prediction using standardized numerical measurements.

### 2. Decision Tree Classifier

Decision Tree classification provides a nonlinear alternative based on recursive feature splits.

The implementation uses a fixed random seed for reproducibility.

Feature standardization is not required.

### 3. Random Forest Classifier

Random Forest combines multiple decision trees into an ensemble classifier.

The implementation uses:

- 300 estimators
- Fixed random seed
- Unscaled numerical features

The ensemble provides a comparison against an individual Decision Tree.

### 4. Support Vector Machine

Support Vector Machine uses an RBF kernel and standardized numerical features.

The implementation uses:

- StandardScaler
- RBF Support Vector Classifier
- Decision scores for ROC analysis

SVM achieved the strongest held-out results in the documented comparison.

## Classification Evaluation

The models were evaluated using multiple classification metrics.

### Accuracy

Measures the proportion of correctly classified observations.

### Precision

Measures how often predictions assigned to a particular class are correct.

### Recall

Measures how effectively actual instances of a class are identified.

### F1-Score

Combines precision and recall into a harmonic mean.

### ROC-AUC

Evaluates the ranking discrimination of model outputs across different classification thresholds.

Because the dataset contains three classes, the project implements multiclass One-vs-Rest ROC analysis.

Macro-averaged metrics treat each class equally.

## Verified Model Results

The following results come from the documented project run.

| Model | Test Accuracy | Macro F1 | Macro OvR ROC-AUC |
| --- | ---: | ---: | ---: |
| Logistic Regression | 93.33% | 0.9333 | 0.9967 |
| Decision Tree | 93.33% | 0.9333 | 0.9500 |
| Random Forest | 90.00% | 0.8997 | 0.9883 |
| **Support Vector Machine** | **96.67%** | **0.9666** | **0.9983** |

### Best-Performing Model

**Support Vector Machine (SVM)** achieved the strongest held-out classification performance.

Its recorded metrics were:

- Test Accuracy: **96.67%**
- Macro Precision: **0.9697**
- Macro Recall: **0.9667**
- Macro F1-Score: **0.9666**
- Macro OvR ROC-AUC: **0.9983**

SVM was selected through a documented comparison prioritizing macro F1, followed by ROC-AUC, accuracy, and the training/test performance gap.

Because model selection used held-out evaluation results, these scores should be interpreted as results from a limited comparison experiment rather than an independently validated estimate of final deployment performance.

### Overfitting Assessment

The Decision Tree achieved 100% training accuracy but approximately 93.33% test accuracy.

Random Forest also achieved 100% training accuracy while obtaining 90% on the test set.

These training/test gaps indicate possible overfitting.

SVM demonstrated a smaller gap and stronger performance on the evaluated test set.

However, conclusions remain limited by the small sample size and the use of a single split.

## Multiclass ROC Analysis

The project uses One-vs-Rest (OvR) ROC curves.

For each species, the evaluation compares that class against the other two classes.

Model probability outputs or decision scores are aligned with the fitted classifier's class ordering.

The comparison report uses the arithmetic mean of the three class-level ROC-AUC values.

An additional interpolated macro-average ROC curve is presented graphically.

Its geometric area can differ slightly from the arithmetic average reported in the metrics table.

ROC-AUC measures ranking discrimination and should not be interpreted as probability calibration.

## Visualizations and Reports

The project generates several evaluation artifacts.

### Class Distribution

Visualizes the balanced representation of the three Iris species.

### ROC Curves

Displays multiclass One-vs-Rest ROC curves for the classification evaluation.

### Model Comparison

Compares the performance of Logistic Regression, Decision Tree, Random Forest, and SVM.

### Confusion Matrices

Shows the distribution of correct and incorrect classifications for each model.

The source repository contains the original figure files:

- `figures/class_distribution.png`
- `figures/roc_curves.png`
- `figures/model_comparison.png`
- `figures/confusion_matrices/`

The original graphics will be incorporated into the portfolio presentation.

## Testing and Reproducibility

The project includes automated tests using Pytest.

**Verified result: 22 tests passed.**

The tests cover:

- Raw dataset integrity.
- Schema and target validation.
- Feature and target separation.
- Reproducible stratified splitting.
- Training-only feature scaling.
- Configuration of all four classification models.
- Prediction outputs.
- Multiclass ROC evaluation data.
- Report and figure generation.

The tests verify pipeline behavior rather than hardcoding expected model performance.

The project also provides a standalone `main.py` script for generating evaluation artifacts without requiring manual notebook execution.

## Engineering Challenges and Decisions

### Challenge 1: Preventing Data Leakage

**Problem:** Scaling the entire dataset before splitting would expose test-set distribution information to the training process.

**Solution:** Use training-only preprocessing inside scikit-learn pipelines.

### Challenge 2: Consistent Model Comparison

**Problem:** Evaluating models using different observations or preprocessing conditions can produce misleading comparisons.

**Solution:** Use one reproducible stratified split and evaluate all models using the same held-out observations.

### Challenge 3: Multiclass ROC Evaluation

**Problem:** Binary ROC evaluation cannot be directly applied as a single curve to a three-class classification problem.

**Solution:** Implement One-vs-Rest evaluation with correctly aligned class scores.

### Challenge 4: Recognizing Overfitting

**Problem:** High training accuracy does not guarantee strong generalization.

**Solution:** Compare training and test performance and report potential overfitting signals.

### Challenge 5: Reproducibility

**Problem:** Results can become difficult to reproduce when execution depends on manual notebook steps.

**Solution:** Separate reusable classification logic, automated tests, and artifact generation into a structured Python project.

## Limitations

The dataset contains only 150 observations, including 30 in the final test partition.

This means that a small number of incorrect classifications can substantially affect reported accuracy.

Further limitations include:

- Only one reproducible holdout split was used.
- Repeated stratified cross-validation was not performed.
- Three retained duplicate occurrences could appear across both partitions and make results optimistic.
- Extensive hyperparameter optimization was not performed.
- The dataset's original provenance, measurement units, collection protocol, and licensing documentation were not supplied.
- No external dataset was used to validate generalization.

The project is a reproducible educational machine learning experiment, not a deployed classification service.

## Source Code

The complete implementation, Jupyter Notebook, generated figures, evaluation reports, and automated tests are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/codveda-iris-classification)
