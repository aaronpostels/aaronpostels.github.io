# Lockpicking Minigame

> Responsive Timing Challenge with Dynamic Difficulty

## Links

- [Live Demo](https://ducklin.de/projects/lockpick/)
- [Case Study (HTML)](https://ducklin.de/case-studies/lockpick.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/lockpick.md)

## Project Overview

This project is a mobile-first, timing-based lockpicking minigame designed to simulate a classic RPG mechanic using pure front-end technologies. Prototyped as a potential minigame for the TileQuest project, its core mechanic involves a rapidly rotating needle that must be stopped precisely within a dynamically sized target zone across multiple concentric rings. The game features configurable difficulty, dramatic CSS-based success/failure animations, and full responsiveness, ensuring an engaging experience that requires timing and precision on both desktop and mobile devices.

## Tech Stack

- Vanilla JavaScript
- CSS3
- requestAnimationFrame

## Key Features

- Responsive, pure CSS rendering of the lock mechanism using pseudo-elements and conic gradients for the target zones.
- Real-time animation loop managed by JavaScript's requestAnimationFrame for smooth, precision-based needle rotation.
- Dynamic difficulty scaling controlled by a slider, influencing both the needle rotation speed and the size of the target success zone.
- Multi-stage challenge system requiring the player to successfully "pick" concentric rings sequentially to unlock the final goal.
- Advanced CSS animations for visual feedback, including success pulses, screen shakes on failure, and a dramatic 'unlocked' explosion effect.

## Platform & Device Support

Supported devices: desktop, mobile
