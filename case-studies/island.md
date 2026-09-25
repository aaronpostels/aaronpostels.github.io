# Island

> Interactive 3D Portfolio Environment

## Links

- [Live Demo](https://ducklin.de/projects/island/)
- [Case Study (HTML)](https://ducklin.de/case-studies/island.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/island.md)

## Project Overview

"Ducklin's Ocean Adventure" is an immersive 3D interactive experience serving as a portfolio showcase. The user controls a ship sailing across a dynamic ocean environment to discover floating islands, each representing a project. The application utilizes a custom-built Gerstner wave shader for realistic water displacement and movement, paired with spatial audio cues to enhance immersion. The project structure relies on React Three Fiber for declarative scene composition and state management for physics, controls, and game flow.

## Tech Stack

- React Three Fiber (R3F)
- Three.js
- GLSL (Shaders)
- Zustand
- Howler.js

## Key Features

- Realistic and performant 3D ocean simulation using a custom GLSL shader implementing Gerstner waves and FBM noise.
- Interactive third-person controls for steering the ship, incorporating physics logic for drag and water influence.
- Immersive audio experience with Howler.js, adjusting ambient and sailing sound volumes based on ship speed.
- A declarative game structure built entirely with R3F components, managing game modes (intro, ocean, island) and scene transitions.
- Interactive navigation elements, including a compass-based minimap and dockable islands to access project details.

## Platform & Device Support

Supported devices: desktop, mobile
