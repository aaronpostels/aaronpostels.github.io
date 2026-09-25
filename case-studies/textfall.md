# Text Fall Animation

> A kinetic typography experiment

## Links

- [Live Demo](https://ducklin.de/projects/textfall/)
- [Case Study (HTML)](https://ducklin.de/case-studies/textfall.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/textfall.md)

## Project Overview

This project is a bespoke animation module built using the HTML5 Canvas API and vanilla JavaScript. It simulates a wall of text dynamically segmenting and falling into place, piece by piece. Unlike simple gravity, the animation employs precise, staggered timing, physics-like sine-wave motion for horizontal drift, and a final smoothing interpolation phase to achieve a chaotic yet controlled landing effect. The entire text block is pre-wrapped and the spawn/settlement timings for every chunk are calculated ahead of the animation loop, ensuring high performance and a complex, synchronized visual sequence.

## Tech Stack

- HTML5 Canvas API
- Vanilla JavaScript
- requestAnimationFrame

## Key Features

- Advanced timing control: Chunks are scheduled to land sequentially with fixed frame intervals, creating a rain-like, staggered waterfall effect.
- Physics Simulation: Uses sine-wave motion with dynamic damping (falloff as the chunk approaches its target Y-position) to create organic, floating horizontal drift.
- Two-Phase Animation: Features a "Falling" phase driven by speed and sine-wave physics, followed by a "Landing" phase using linear interpolation (LERP) to smoothly snap the chunk to its precise final X/Y coordinates.
- Pre-calculation Pipeline: Text wrapping, chunk segmentation (2-5 words per chunk), and all animation timing parameters (speed, amplitude, spawn frame) are calculated once during setup.
- Performance: Achieves high frame rates necessary for smooth animation by offloading rendering to the GPU-accelerated Canvas context and minimizing DOM manipulation.

## Platform & Device Support

Supported devices: desktop
