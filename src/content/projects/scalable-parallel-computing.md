---
title: Parallel & Distributed Systems — Modular Hash Join Project
category: Systems & Performance
summary: Four progressive MSc assignments exploring SIMD vectorization, C++ threads, OpenMP, and MPI through the evolution of a partitioned hash join.
technologies:
  - C++
  - AVX2
  - C++ Threads
  - OpenMP
  - MPI
  - GCC
  - Linux
order: 3
featured: true
image: /images/projects/scalable-parallel-computing/03-module4-mpi-strong-scaling.png
---

## Overview

This project brings together four progressive assignments completed as part of my MSc coursework in Parallel and Distributed Systems at the University of Pisa.

Across the four modules, the same computational problem evolved from low-level CPU optimization to shared-memory parallelism and finally to distributed-memory execution.

The progression was:

1. Scalar execution, compiler auto-vectorization, and manual AVX2 SIMD.
2. Parallel partitioned hash join using C++ threads.
3. OpenMP loop-based and task-based parallelism.
4. Distributed execution using MPI.

The project focused not only on improving execution time, but also on understanding correctness, scalability, workload balance, synchronization overhead, and communication cost.

---

## Module 1 — SIMD and Vectorization

The first assignment focused on a partition-mapping kernel used by the partitioned hash join.

I implemented and evaluated three versions:

- Scalar baseline.
- GCC auto-vectorized implementation.
- Manual AVX2 implementation using intrinsics.

For the main experiments, the input contained up to 20 million 64-bit keys.

The GCC auto-vectorized implementation achieved approximately **1.44× speedup** over the scalar baseline, while the manual AVX2 version achieved approximately **1.42×** for the 20-million-element experiment.

![Module 1 vectorization speedup comparison](/images/projects/scalable-parallel-computing/01-module1-vectorization-speedup.png)

An important finding was that the compiler-generated vectorized implementation slightly outperformed the manually written AVX2 implementation.

Correctness was verified by comparing checksums across all implementations. The baseline, auto-vectorized, and AVX2 versions produced identical results for the same inputs.

### Engineering lesson

Manual SIMD is not automatically faster than compiler vectorization. The additional implementation complexity must be justified by measurable performance improvements.

---

## Module 2 — Parallel Partitioned Hash Join with C++ Threads

The second assignment extended the work into a complete partitioned hash join with duplicate keys.

The algorithm consists of several stages:

1. Map records to partitions.
2. Build a histogram.
3. Compute partition offsets using an exclusive prefix sum.
4. Scatter records into contiguous partitions.
5. Build local hash tables.
6. Probe corresponding partitions.
7. Reduce partial join results.

After partitioning, individual partitions can be processed independently.

I parallelized the local join phase using standard C++ threads. Each worker processed a block of partitions and stored its own partial result, which was later combined by the main thread.

Correctness was verified using:

- `join_count`
- `checksum1`
- `checksum2`

For small datasets, the output was also compared with a naive reference implementation.

### Scalability limitation

The initial threaded implementation produced only modest strong-scaling improvements.

A major reason was that input generation and partitioning remained sequential while only the local join phase was parallelized.

This demonstrated an important parallel-computing principle:

> Parallelizing only one part of an algorithm does not guarantee strong overall scalability when significant serial work remains.

---

## Module 3 — OpenMP Loops vs Tasks

The third assignment explored two OpenMP approaches:

- `parallel for` loop-based execution.
- OpenMP task-based execution.

These implementations were compared with both the sequential baseline and the C++ threads implementation.

The experiments used both:

- Uniform datasets.
- Skewed datasets.

### Uniform workload

On uniformly distributed data, all three parallel approaches behaved similarly.

At 8 threads, the measured speedups were approximately:

- C++ threads: **2.07×**
- OpenMP loop: **2.04×**
- OpenMP task: **2.02×**

This was expected because the partitions had similar workloads, so static work distribution was already effective.

### Skewed workload

The behavior changed significantly when the data became skewed.

![Module 3 strong scaling on skewed data](/images/projects/scalable-parallel-computing/02-module3-skewed-speedup.png)

At 8 threads:

- C++ threads: **1.16×**
- OpenMP loop: **1.15×**
- OpenMP tasks: **1.92×**

The task-based implementation handled the workload imbalance substantially better because the OpenMP runtime could dynamically distribute tasks among available threads.

### Engineering lesson

The best parallelization strategy depends on workload characteristics.

Static scheduling is simple and effective for balanced work, while dynamic task scheduling can provide better utilization when workloads are irregular or skewed.

---

## Module 4 — Distributed Execution with MPI

The final assignment moved the hash join from shared-memory parallelism to a distributed-memory environment using MPI.

Partitions were distributed across MPI processes, with each process independently computing its local partial results.

The final values were combined using `MPI_Reduce`.

The implementation was tested using:

- 1 MPI process.
- 2 MPI processes.
- 4 MPI processes.
- 8 MPI processes.

Correctness was verified by ensuring that all configurations produced identical:

- `join_count`
- `checksum1`
- `checksum2`

### Strong scaling

With a fixed input size of one million records in each relation, total execution time decreased as additional MPI processes were introduced.

![Module 4 MPI strong scaling](/images/projects/scalable-parallel-computing/03-module4-mpi-strong-scaling.png)

Measured speedup:

- 1 process: **1.00×**
- 2 processes: **1.54×**
- 4 processes: **2.06×**
- 8 processes: **2.22×**

The total execution time decreased from approximately **0.0578 seconds** with one process to approximately **0.0260 seconds** with eight processes.

However, communication time increased as the number of processes grew.

This demonstrated the central trade-off of distributed computing:

> More processes reduce local computation, but communication and synchronization overhead increasingly limit scalability.

---

## Correctness Strategy

Performance optimization was never evaluated independently of correctness.

Across the modules, correctness was verified using combinations of:

- Output checksums.
- Join counts.
- Sequential baselines.
- Small-input naive verification.
- Comparisons across thread counts.
- Comparisons across MPI process counts.

Optimized implementations were accepted only when their results matched the corresponding reference implementation.

---

## Performance Engineering Approach

The experiments followed a reproducible benchmarking methodology:

- Deterministic input generation.
- Fixed random seed.
- Controlled input sizes.
- Multiple thread/process configurations.
- Repeated executions.
- Median execution times.
- Explicit speedup calculations.
- Correctness validation kept separate from measured execution time.

The experiments were executed on the University of Pisa SPM cluster.

---

## Key Takeaways

This sequence of assignments demonstrated several important lessons in performance engineering:

- Compiler auto-vectorization can compete with carefully written SIMD code.
- Parallel speedup is constrained by serial phases of the algorithm.
- Balanced and skewed workloads can require different scheduling strategies.
- OpenMP tasks are effective for dynamically balancing irregular workloads.
- Shared-memory and distributed-memory parallelism introduce different types of overhead.
- Increasing worker count does not guarantee linear speedup.
- Communication cost becomes increasingly important in distributed execution.
- Correctness validation is essential when optimizing or parallelizing algorithms.

---

## Technologies

- C++17 / C++20
- GCC
- AVX2 SIMD intrinsics
- C++ standard threads
- OpenMP
- MPI
- Linux
- Makefiles
- SLURM
- Performance benchmarking
- Strong and weak scalability analysis

## Source Code

The complete source code, implementations, benchmarking setup, and project documentation are available on GitHub.

[GitHub](https://github.com/omar-alnadhari/SPM-Parallel-Programming-Modules)