# Artisan

> An archetype ECS game engine for the browser, in Rust, WebAssembly and WebGPU

## Links

- [Live Demo](https://ducklin.de/projects/artisan-paper/demos.html)
- [Case Study (HTML)](https://ducklin.de/case-studies/artisan.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/artisan.md)
- [Read the Paper (German)](https://ducklin.de/projects/artisan-paper/)
- [Source on GitHub](https://github.com/aaronpostels/Artisan-Publish)

## Project Overview

Artisan explores how far data-heavy games and real-time simulations can be pushed in the browser when they are designed for modern web technology from the start, instead of being exported to the web as an afterthought. It combines a data-oriented archetype Entity Component System written in Rust, compiled to WebAssembly with SIMD and multi-threaded Rayon workers, with a WebGPU renderer.

A planetary civilization simulation serves as the main use case, and targeted benchmarks measure the core data paths. The full write-up is published as a paper (in German) alongside the demos.

## Tech Stack

- Rust
- WebAssembly
- WebGPU
- Rayon
- TypeScript

## Key Features

- Archetype ECS with contiguous columnar component storage for cache-friendly, vectorized iteration and O(1) entity removal.
- Zero-copy memory bridge: typed array views into WebAssembly memory feed WebGPU buffers directly.
- Parallel scheduler that builds conflict-free stages from each system's read/write access and runs them on a Rayon worker pool.
- Instanced WebGPU rendering for 2D and 3D scenes, with optional GPU compute simulation paths.
- [Vivarium](https://ducklin.de/projects/vivarium/): settlers move across a procedurally generated planet, use local resources and grow their tribes.
- Smaller demos isolate single engine parts: [Murmuration](https://ducklin.de/projects/murmuration/) (CPU vs. GPU flow field), [Bouncing Rects](https://ducklin.de/projects/rects/) (compute shaders), [Scheduler](https://ducklin.de/projects/scheduler/) (parallel stages) and [Metamorphosis](https://ducklin.de/projects/metamorphosis/) (archetype changes).
- Benchmark suite comparing Artisan with Bevy and Flecs across 34 categories. Artisan was fastest in 20 of them.
- The demos need a browser with WebGPU, such as a current desktop Chrome, Edge or Firefox.

## Platform & Device Support

Supported devices: desktop, mobile
