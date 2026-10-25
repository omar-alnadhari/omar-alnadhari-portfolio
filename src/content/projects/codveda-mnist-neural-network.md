
---
title: "MNIST Handwritten Digit Classification with Neural Networks"
category: "Data Science & Machine Learning"
summary: >-
  Developed and evaluated a TensorFlow/Keras feed-forward neural
  network for handwritten digit recognition, using 70,000 MNIST
  images, validation-based hyperparameter tuning, and error analysis.
  Achieved 97.41% accuracy on the official test set.
technologies:
  - Python
  - TensorFlow
  - Keras
  - NumPy
  - scikit-learn
  - Matplotlib
  - Jupyter
  - Pytest

order: 303
featured: false
group: codveda
level: advanced
image: "/images/projects/codveda-mnist-neural-network/cover.png"
github: "https://github.com/omar-alnadhari/codveda-mnist-neural-network"
---

## Project Overview

**Organization:** Codveda Technologies  
**Program:** Data Science Internship  
**Level:** Advanced — Level 3, Task 3  
**Year:** 2026

Developed a reproducible deep learning workflow for handwritten digit recognition using the MNIST dataset and TensorFlow/Keras.

The project implements a compact feed-forward artificial neural network to classify grayscale handwritten digit images into ten categories, representing digits from 0 through 9.

Rather than relying on a single training run, the implementation includes dataset validation, preprocessing, stratified training/validation splitting, learning-rate and batch-size tuning, final model training, official test-set evaluation, visualization, and error analysis.

The workflow emphasizes reproducible experimentation and the separation of model development from final evaluation.

## Problem and Objective

Handwritten digit recognition is a supervised image-classification problem.

Even when images represent simple numerical characters, variations in handwriting, stroke thickness, positioning, and shape can introduce classification uncertainty.

The objective was to build and evaluate a neural network capable of assigning an input image to one of ten digit classes.

The project addresses several practical deep learning tasks:

- Loading and validating an image dataset.
- Normalizing image pixel values.
- Building a neural network with TensorFlow/Keras.
- Training through backpropagation.
- Monitoring accuracy and loss.
- Comparing learning rates.
- Comparing training batch sizes.
- Preventing final test-set leakage during tuning.
- Evaluating classification performance.
- Investigating incorrect predictions.
- Saving the trained model and experiment artifacts.

## Dataset

The project uses MNIST through:

`tensorflow.keras.datasets.mnist.load_data()`

MNIST contains grayscale images of handwritten digits.

### Verified Dataset Characteristics

| Measure | Value |
| --- | ---: |
| Total images | 70,000 |
| Original training images | 60,000 |
| Official test images | 10,000 |
| Image dimensions | 28 × 28 pixels |
| Image channels | 1 (grayscale) |
| Digit classes | 10 |
| Raw pixel range | 0–255 |
| Normalized pixel range | 0.0–1.0 |

The ten classification labels correspond to digits:

`0, 1, 2, 3, 4, 5, 6, 7, 8, 9`

### Dataset Integrity

The project validates image shapes, pixel ranges, target labels, and dataset dimensions.

A canonical copy of the MNIST archive is preserved under:

`data/raw/mnist.npz`

The dataset archive's SHA-256 checksum is documented to support integrity verification.

## Data Preparation

### Pixel Normalization

Each image contains 784 grayscale pixel values arranged in a 28 × 28 matrix.

Raw pixel values are normalized by dividing them by 255:

`Normalized Pixel = Original Pixel / 255`

This transforms the input values into the interval from 0 to 1.

Normalization provides a more suitable numerical input scale for neural network optimization.

### Training and Validation Split

The original 60,000 training images are divided into separate training and validation subsets.

| Partition | Images |
| --- | ---: |
| Training | 54,000 |
| Validation | 6,000 |
| Official Test | 10,000 |

The training/validation split is stratified using a fixed seed of 42.

The official test set remains outside the development process.

This separation allows hyperparameters to be compared using validation performance without repeatedly consulting the final evaluation data.

## Neural Network Architecture

The project uses a fully connected feed-forward neural network implemented with TensorFlow/Keras.

### Architecture

```text
Input Image (28 × 28)
        |
        v
Flatten Layer (784)
        |
        v
Dense Layer (128, ReLU)
        |
        v
Dense Layer (64, ReLU)
        |
        v
Output Layer (10, Softmax)
        |
        v
Predicted Digit (0–9)
```

### Flatten Layer

Converts the two-dimensional 28 × 28 image into a one-dimensional vector containing 784 pixel values.

### First Hidden Layer

Contains 128 neurons with ReLU activation.

This layer learns nonlinear combinations of the input pixel values.

### Second Hidden Layer

Contains 64 neurons with ReLU activation.

It further transforms the learned representation before classification.

### Output Layer

Contains 10 neurons using Softmax activation.

Each output corresponds to one digit class.

The class with the highest output probability is selected as the predicted digit.

### Model Size

**Total trainable parameters: 109,386**

The network uses dense layers rather than convolutional layers.

This makes the architecture appropriate for demonstrating fundamental neural network training, while accepting limitations related to spatial image representation.

## Model Training

The implementation uses TensorFlow/Keras and the Adam optimizer.

### Training Configuration

| Setting | Selected Configuration |
| --- | --- |
| Framework | TensorFlow / Keras |
| Optimizer | Adam |
| Loss Function | Sparse Categorical Cross-Entropy |
| Learning Rate | 0.0005 |
| Batch Size | 64 |
| Final Training Epochs | 12 |
| Early Stopping | Validation loss |
| Patience | 4 |

### Backpropagation

Neural network parameters are optimized through backpropagation using Keras `model.fit()`.

During training, the optimizer updates the model weights to reduce classification loss.

Training and validation metrics are recorded to analyze learning behavior and potential overfitting.

### Loss Function

Sparse categorical cross-entropy is used because the target labels are integer digit identifiers rather than one-hot-encoded vectors.

### Early Stopping

The final training process uses validation-loss early stopping with patience set to four epochs.

The best model weights are restored.

This avoids selecting the final weights solely from the last completed epoch.

## Hyperparameter Tuning

Hyperparameter tuning is a central component of the project.

Instead of selecting an arbitrary learning rate and batch size, the implementation evaluates multiple candidate configurations using validation data.

### Learning Rate Comparison

Three learning rates were evaluated with a fixed batch size of 64.

| Learning Rate | Epochs | Best Validation Accuracy | Best Validation Loss |
| --- | ---: | ---: | ---: |
| 0.01 | 4 | 95.77% | 0.163953 |
| 0.001 | 8 | 97.30% | 0.103280 |
| **0.0005** | **11** | **97.43%** | **0.104497** |

Learning rate **0.0005** was selected based on the documented validation comparison.

Although another candidate produced a slightly lower validation loss, 0.0005 achieved the highest recorded validation accuracy.

### Batch Size Comparison

Three batch sizes were evaluated using learning rate 0.0005.

| Batch Size | Epochs | Best Validation Accuracy | Best Validation Loss |
| --- | ---: | ---: | ---: |
| 32 | 8 | 97.20% | 0.099886 |
| **64** | **11** | **97.43%** | **0.104497** |
| 128 | 12 | 97.37% | 0.098688 |

Batch size **64** achieved the highest validation accuracy among the evaluated candidates.

The final configuration was selected using validation information only.

The official test set was not used to choose the learning rate or batch size.

## Final Model Evaluation

After hyperparameter selection, the configuration was frozen and evaluated against the complete official MNIST test set.

### Verified Results

| Evaluation Metric | Result |
| --- | ---: |
| **Test Accuracy** | **97.41%** |
| Test Loss | 0.086050 |
| Macro Precision | 0.974196 |
| Macro Recall | 0.973932 |
| Macro F1-Score | 0.973980 |
| Test Images | 10,000 |
| Correct Predictions | 9,741 |
| Incorrect Predictions | 259 |

### Accuracy

The model correctly classified **9,741 of the 10,000** official test images.

This corresponds to:

**97.41% Test Accuracy**

### Macro F1-Score

The macro F1-score was approximately **0.9740**.

Macro averaging gives equal importance to all ten digit classes when summarizing class-level performance.

### Training and Validation Behavior

The documented training run completed 12 epochs.

Validation loss reached its lowest value at epoch 8.

The maximum reported training/validation accuracy gap was approximately 0.0222.

These observations provide evidence about learning behavior during the recorded experiment, but they do not establish performance on unconstrained real-world handwriting.

## Confusion Matrix and Error Analysis

Evaluating incorrect predictions is important even when overall classification accuracy is high.

The project generates a confusion matrix comparing actual digit labels with predicted classes.

### Confusion Matrix

The confusion matrix helps identify which digit categories are most frequently confused.

It also allows per-class classification behavior to be inspected rather than relying exclusively on overall accuracy.

### Misclassified Examples

The final model misclassified 259 images.

A reproducible sample of incorrect predictions is saved to:

`figures/misclassified_examples.png`

This visualization supports qualitative inspection of the types of handwritten images the model finds difficult.

### Per-Class Performance

The strongest documented class-level recall results belonged to digits:

- 0
- 1
- 2

Detailed per-class metrics are available in:

`reports/classification_report.csv`

## Visualizations and Experiment Artifacts

The repository contains original artifacts documenting the training and evaluation process.

### MNIST Sample Images

Displays representative handwritten digit images from the dataset.

### Hyperparameter Tuning Results

Documents comparisons between the evaluated learning rates and batch sizes.

### Training and Validation Accuracy

Shows how classification accuracy changes over training epochs.

### Training and Validation Loss

Tracks optimization behavior and supports inspection of overfitting or convergence patterns.

### Confusion Matrix

Provides a class-by-class summary of correct and incorrect predictions.

### Misclassified Examples

Displays selected test images that the final model predicted incorrectly.

The original files are preserved in the repository's `figures/` directory.

Relevant documented files include:

- `figures/confusion_matrix.png`
- `figures/misclassified_examples.png`

Additional original training and tuning plots will be selected when preparing the portfolio image gallery.

## Testing and Reproducibility

The project includes a structured Python implementation and automated tests.

**Verified result: 39 tests passed.**

The documented verification used:

- Python 3.12.10
- TensorFlow 2.20.0
- Keras 3.15.1
- CPU-based training

The test suite contains lightweight correctness and smoke tests.

The project also includes:

- Reusable source modules.
- A standalone `main.py` execution workflow.
- An executable Jupyter Notebook.
- Machine-readable evaluation reports.
- Saved figures.
- A final trained Keras model.
- Dependency verification.

The dependency check reported no broken requirements.

Seeded operations are used to improve reproducibility, although exact low-level numerical behavior may vary across hardware and TensorFlow versions.

## Engineering Challenges and Decisions

### Challenge 1: Preventing Test-Set Leakage

**Problem:** Using final test results to select hyperparameters would weaken the independence of the final evaluation.

**Solution:** Reserve the official 10,000-image test set and perform development using separate training and validation subsets.

**Outcome:** Hyperparameter comparisons are completed before final official test evaluation.

### Challenge 2: Selecting Learning Rate and Batch Size

**Problem:** Neural network training behavior depends strongly on optimization settings.

**Solution:** Compare actual training runs across multiple learning rates and batch sizes.

**Outcome:** Select learning rate 0.0005 and batch size 64 based on the documented validation comparison.

### Challenge 3: Monitoring Overfitting

**Problem:** Training accuracy alone may increase while generalization performance stops improving.

**Solution:** Track training and validation accuracy and loss, use early stopping, and restore the best recorded weights.

**Outcome:** The final model is evaluated using a validation-monitored training configuration.

### Challenge 4: Understanding Classification Errors

**Problem:** High overall accuracy can conceal weaknesses for particular classes or unusual examples.

**Solution:** Generate a confusion matrix, per-class classification report, and reproducible misclassification samples.

**Outcome:** Model performance can be inspected beyond a single accuracy number.

### Challenge 5: Reproducible Deep Learning Experiments

**Problem:** Training results can be difficult to reproduce without consistent configuration and artifact management.

**Solution:** Use fixed seeds where supported, reusable Python modules, documented dependencies, automated tests, and saved evaluation artifacts.

**Outcome:** The project provides an auditable experimental workflow.

## Limitations

The implemented architecture is deliberately a compact feed-forward neural network.

It does not use:

- Convolutional Neural Networks (CNNs).
- Recurrent Neural Networks (RNNs).
- LSTM architectures.
- Transformers.
- Transfer learning.
- Data augmentation.
- Production deployment infrastructure.

Flattening each image into a one-dimensional vector discards explicit spatial structure.

Convolutional models are generally better suited to learning local image patterns, but they were outside the scope of this internship task.

Additional limitations include:

- MNIST is cleaner and more standardized than unconstrained real-world handwriting.
- No external handwriting dataset was evaluated.
- Results were verified in the documented CPU environment.
- Numerical behavior may differ slightly across hardware and library versions.
- The project does not provide a deployed inference API or web application.

The model demonstrates a complete educational deep learning workflow, not a production handwriting-recognition service.

## Source Code

The complete implementation, Jupyter Notebook, trained model, automated tests, experiment reports, and visualizations are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/codveda-mnist-neural-network)
