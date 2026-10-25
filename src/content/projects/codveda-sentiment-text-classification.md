
---
title: "Sentiment Analysis & Text Classification"
category: "Data Science & Machine Learning"
summary: >-
  Built a reproducible NLP classification pipeline for a highly
  imbalanced 191-class sentiment dataset, using NLTK preprocessing,
  TF-IDF features, Multinomial Naive Bayes, and Logistic Regression.
  Addressed label normalization, rare-class splitting, and data leakage.
technologies:
  - Python
  - NLTK
  - scikit-learn
  - TF-IDF
  - Pandas
  - NumPy
  - Matplotlib
  - Jupyter
  - Pytest
order: 302
featured: false
group: codveda
level: advanced
image: "/images/projects/codveda-sentiment-text-classification/cover.png"
github: "https://github.com/omar-alnadhari/codveda-sentiment-text-classification"
---

## Project Overview

**Organization:** Codveda Technologies  
**Program:** Data Science Internship  
**Level:** Advanced — Level 3, Task 2  
**Year:** 2026

Developed a reproducible Natural Language Processing (NLP) pipeline for fine-grained sentiment text classification.

The project examines a challenging, highly imbalanced dataset containing 191 normalized sentiment labels, rather than the conventional positive, negative, and neutral categories.

The implementation includes dataset auditing, text deduplication, leakage prevention, NLTK preprocessing, TF-IDF feature extraction, supervised classification, model comparison, and error analysis.

Two traditional machine learning approaches were evaluated:

- Multinomial Naive Bayes
- Logistic Regression

The emphasis is on reproducible NLP engineering, honest evaluation, and understanding the limitations of small, noisy, multi-class datasets.

## Problem and Objective

Text classification converts unstructured language into meaningful predefined categories.

However, reliable classification becomes difficult when a dataset contains many overlapping labels, inconsistent annotations, and classes represented by very few examples.

This project addresses several challenges:

- Inconsistent whitespace in sentiment labels.
- Duplicate text appearing in the dataset.
- Extreme class imbalance.
- Classes containing only one observation.
- Potential target leakage through metadata.
- Sentiment labels embedded directly in text.
- Training/test splitting with rare categories.
- High-dimensional text representations.
- Reliable evaluation of multi-class predictions.

The objective was to implement the assigned NLP workflow while documenting its limitations instead of presenting misleading classification performance.

## Dataset

The project uses the supplied `Sentiment dataset.csv` file.

### Dataset Characteristics

| Measure | Value |
| --- | ---: |
| Raw observations | 732 |
| Original columns | 15 |
| Original target spellings | 279 |
| Whitespace-normalized classes | 191 |
| Duplicate-text rows removed | 26 |
| Modeling observations | 706 |
| Missing values | 0 |

The two primary columns used for modeling are:

- `Text` — input text.
- `Sentiment` — classification target.

Other metadata columns are excluded from model training.

### Fine-Grained Sentiment Labels

The dataset contains substantially more categories than ordinary sentiment classification datasets.

Examples include:

- Positive
- Joy
- Excitement
- Contentment
- Gratitude
- Neutral
- Curiosity
- Serenity
- Happy
- Despair

The normalized dataset retains 191 distinct sentiment classes.

Related labels are not arbitrarily merged because the supplied task does not provide a verified semantic grouping scheme.

This decision preserves the original target structure while exposing the difficulty of learning from sparse and overlapping categories.

## Data Quality and Label Normalization

### 1. Initial Data Audit

Used Pandas to inspect:

- Dataset dimensions.
- Missing values.
- Duplicate text.
- Target-label distribution.
- Column roles.
- Potential leakage sources.

The source contains 732 rows and 15 columns.

No missing values were detected.

### 2. Label Normalization

The original target column contains 279 different string representations, partly because of inconsistent whitespace.

Normalization removes surrounding and repeated whitespace.

This reduces the number of distinct target labels to 191.

The process does not merge labels that have different semantic meanings.

### 3. Text Deduplication

Duplicate text is removed before creating the training/test split.

The completed workflow removes 26 duplicate-text observations.

The remaining dataset contains:

**706 modeling observations.**

Deduplicating before splitting reduces the risk that identical text appears in both training and testing partitions.

### 4. Preserving Source Integrity

The original dataset is retained without modification.

Its SHA-256 checksum is documented to support reproducible verification of the supplied source data.

## Data Leakage Prevention

Identifying potential target leakage was a major engineering challenge in this project.

### Leakage Through Metadata

The dataset includes metadata that can directly reveal the target.

For example, the `Hashtags` field begins with the target sentiment name in 519 rows.

Using this field for prediction could allow a model to learn an artificially easy mapping rather than genuine textual patterns.

Therefore, all metadata is excluded from the modeling feature set.

Only the `Text` column is used for classification.

### Label Prefixes Inside Text

The data also contains 169 text entries that begin with a literal sentiment-class name.

This introduces an additional leakage risk.

The preprocessing workflow applies a consistent rule for removing known class-name prefixes.

The transformation does not consult the individual row's true target label to decide what to remove.

This helps avoid a label-dependent preprocessing shortcut.

However, the project acknowledges that additional label-related textual cues may remain.

## Train/Test Splitting

Ordinary stratified splitting is difficult because the dataset contains numerous labels with very few observations.

Following deduplication, 81 sentiment labels have only one observation.

A conventional stratified split cannot distribute these classes across both training and testing.

### Rare-Class-Aware Strategy

Implemented a deterministic class-aware splitting strategy that:

- Retains all sentiment labels in the training dataset.
- Keeps singleton classes in training.
- Places at least one observation in testing for classes with two or more unique texts.
- Uses a fixed random seed for reproducibility.

### Verified Split

| Measure | Value |
| --- | ---: |
| Training observations | 562 |
| Testing observations | 144 |
| Training classes | 191 |
| Classes represented in testing | 110 |
| Effective test fraction | 20.40% |
| Random state | 42 |

This strategy preserves rare labels for training while creating a holdout for evaluation.

However, 81 classes have no independent true test observation, making robust evaluation across all 191 categories impossible.

## NLP Preprocessing Pipeline

The text preprocessing workflow uses NLTK and scikit-learn.

### 1. Text Normalization

Text is converted to lowercase to reduce differences caused by capitalization.

### 2. Tokenization

NLTK's `RegexpTokenizer` separates text into tokens.

This creates a consistent representation for subsequent language-processing operations.

### 3. Stopword Removal

Common English stopwords are removed.

Important sentiment negators are preserved because removing words such as "not" could reverse the meaning of a statement.

### 4. Stemming

NLTK's `SnowballStemmer` reduces related word forms to common stems.

This reduces vocabulary variation and supports sparse text modeling.

### 5. TF-IDF Feature Extraction

Used scikit-learn's TF-IDF representation to transform text into numerical features.

The configuration includes:

- Unigrams and bigrams.
- Minimum document frequency: 2.
- Maximum document frequency: 0.95.
- Maximum features: 10,000.
- Sublinear term-frequency scaling.

The TF-IDF vectorizer is fitted using training data only.

The resulting fitted representation is then applied to testing observations.

This prevents test-set vocabulary and document-frequency information from influencing training.

## Classification Models

Two supervised classification algorithms were evaluated.

### Multinomial Naive Bayes

Multinomial Naive Bayes provides a probabilistic baseline for sparse text features.

The model uses:

`alpha = 1.0`

Its relatively simple structure makes it a useful comparison point for traditional text classification.

### Logistic Regression

Logistic Regression provides a discriminative classification approach.

The implementation uses:

- Balanced class weights.
- Regularization parameter `C = 1.0`.
- Maximum iterations: 3,000.
- `lbfgs` solver.
- TF-IDF text features.

Class weighting addresses part of the training imbalance, although it cannot compensate for the complete absence of sufficient observations for many categories.

Both classifiers use the same modeling dataset and evaluation split.

## Model Evaluation

The project evaluates held-out predictions using:

- Precision
- Recall
- F1-score
- Macro-averaged F1
- Weighted F1
- Accuracy

### Why Macro F1 Matters

Accuracy alone can be misleading when a dataset contains highly uneven class frequencies.

Macro F1 gives equal importance to each evaluated class, regardless of its support.

This makes poor performance on rare labels more visible.

The evaluation follows the standard union of true and predicted labels in the holdout.

Predicted labels without true test support are not silently removed from the macro calculation.

## Verified Model Results

| Metric | Naive Bayes | Logistic Regression |
| --- | ---: | ---: |
| Macro Precision | 0.0267 | **0.1270** |
| Macro Recall | 0.0316 | **0.1837** |
| Macro F1 | 0.0237 | **0.1440** |
| Weighted F1 | 0.0556 | **0.1470** |
| Accuracy | 11.11% | **18.75%** |

### Selected Model

**Logistic Regression achieved the highest held-out Macro F1 score.**

Its reported results were:

- Macro F1: **0.1440**
- Weighted F1: **0.1470**
- Accuracy: **18.75%**

Logistic Regression performed better than Multinomial Naive Bayes under the documented evaluation.

However, its absolute performance remains low.

The model should not be described as an accurate or deployment-ready sentiment classifier.

The results instead illustrate the difficulty of applying traditional sparse-text methods to a small dataset with 191 highly imbalanced and overlapping target labels.

## Error Analysis

The selected Logistic Regression model made 117 incorrect predictions on the 144-row holdout.

The project exports a reproducible sample of misclassified examples to:

`reports/misclassified_examples.csv`

### Main Sources of Error

The documented limitations include:

- Very small support for many sentiment classes.
- Overlapping or near-synonymous sentiment labels.
- Short text with limited contextual information.
- Vocabulary not adequately represented during training.
- Implicit emotional meaning.
- Dataset construction artifacts.
- Differences between training and testing class support.

The selected model also predicted 57 test observations as belonging to 37 classes without true held-out support.

Those predictions remain included in the evaluation methodology.

Because many classes have only one true test observation, individual confusion-matrix comparisons can be unstable.

## Visualizations and Reports

The project generates original diagnostic figures.

### Class Distribution

Displays the highly imbalanced distribution of sentiment categories.

### Text Length Distribution

Examines variation in the lengths of text observations.

### Naive Bayes Confusion Matrix

Provides a focused visualization of the baseline classifier's errors.

### Logistic Regression Confusion Matrix

Illustrates selected classification outcomes for the Logistic Regression model.

### Model Comparison

Compares evaluation results between the two classifiers.

The original visualization files include:

- `figures/class_distribution.png`
- `figures/text_length_distribution.png`
- `figures/naive_bayes_confusion_matrix.png`
- `figures/logistic_regression_confusion_matrix.png`
- `figures/model_comparison.png`

The confusion-matrix figures use focused or aggregated views for readability.

The actual training and evaluation procedures retain the original normalized target-label structure.

## Testing and Reproducibility

The project includes automated testing using Pytest.

**Verified result: 19 tests passed.**

The documented verification environment used Python 3.12.10.

The project also includes an executable Jupyter Notebook containing:

- 45 total cells.
- 23 executed code cells.
- Zero execution errors.

The environment dependency check reported no broken requirements.

The project can be executed through the standalone `main.py` workflow.

Outputs include:

- Processed datasets.
- Class-distribution reports.
- Model-comparison metrics.
- Misclassification examples.
- Confusion matrices.
- Analytical visualizations.

## Engineering Challenges and Decisions

### Challenge 1: Severe Class Imbalance

**Problem:** The dataset contains 191 normalized labels, including many classes with only one observation.

**Solution:** Implement a deterministic rare-class-aware train/test split while preserving the full label vocabulary.

**Outcome:** All labels remain available for training, and the limitations of held-out evaluation are explicitly documented.

### Challenge 2: Target Leakage

**Problem:** Metadata and some text prefixes contain information that can directly expose the sentiment label.

**Solution:** Exclude metadata, deduplicate text before splitting, and apply consistent label-prefix preprocessing without consulting each row's target.

**Outcome:** The workflow reduces several identifiable leakage risks while acknowledging remaining textual artifacts.

### Challenge 3: Training-Only Feature Extraction

**Problem:** Fitting TF-IDF on the full dataset would expose testing vocabulary and document-frequency statistics during training.

**Solution:** Fit the TF-IDF representation on training data only.

**Outcome:** Held-out observations do not influence the learned text representation.

### Challenge 4: Misleading Accuracy

**Problem:** Accuracy can hide poor minority-class performance in highly imbalanced classification tasks.

**Solution:** Use precision, recall, macro F1, weighted F1, and detailed error analysis.

**Outcome:** The evaluation communicates weak absolute performance rather than relying on a potentially misleading headline metric.

### Challenge 5: Transparent Model Comparison

**Problem:** A model may outperform a baseline while still being unsuitable for practical deployment.

**Solution:** Compare Naive Bayes and Logistic Regression using the same holdout and explicitly describe the limitations of the selected model.

**Outcome:** The project demonstrates responsible evaluation instead of overstating classification quality.

## Limitations

The dataset presents substantial challenges for traditional sentiment classification.

Key limitations include:

- Only 706 unique modeling observations.
- 191 fine-grained sentiment categories.
- Extreme class imbalance.
- 81 labels without independent true test samples.
- Inconsistent or overlapping label granularity.
- Unknown source provenance and licensing.
- Possible remaining label-related cues in text.
- Limited understanding of context, sarcasm, and implicit sentiment.
- Loss of punctuation and emoji cues during preprocessing.
- No independent external validation dataset.

TF-IDF with traditional classifiers provides a reproducible baseline but does not fully capture semantic relationships or long-range language context.

Word embeddings, transformer-based language models, and deep learning approaches were intentionally outside this task's scope.

No classification API, web application, or production deployment was implemented.

## Source Code

The complete source code, NLTK preprocessing pipeline, Jupyter Notebook, evaluation reports, visualizations, and automated tests are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/codveda-sentiment-text-classification)
