# Particles Portfolio

> Immersive Three.js Experience

## Links

- [Live Demo](https://ducklin.de/projects/particles/)
- [Case Study (HTML)](https://ducklin.de/case-studies/particles.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/particles.md)

## Project Overview

This project is a visually stunning interactive portfolio concept created for a second-semester HfK course. It uses Three.js to render a series of complex 3D models composed entirely of point clouds. The experience is driven by smooth vertical scrolling, utilizing GSAP's ScrollTrigger plugin to link the scroll position directly to dynamic transformations and particle displacement. As the user scrolls past sections, the 3D models dissolve into chaotic particle fields, creating a memorable and high-performance immersive browsing experience that showcases advanced web graphics capabilities.

## Tech Stack

- Three.js
- GSAP (ScrollTrigger)
- GLTFLoader

## Key Features

- Real-time rendering of multiple complex 3D point cloud models simultaneously using custom Buffer Geometries for high performance.
- Scroll-based particle dissolution effect: GSAP ScrollTrigger directly manipulates particle positions via Buffer Attribute offsets.
- Custom vertex coloring applied to particles based on their initial Y-position, adding depth and visual variation to the models.
- Continuous 'idle' animation, applying subtle sinusoidal movement and rotation to the particles and models when not being dissolved by scroll.
- Implementation of post-processing effects (RenderPass, BokehPass) and additive blending for cinematic depth-of-field and glowing neon aesthetics.

## Platform & Device Support

Supported devices: desktop
