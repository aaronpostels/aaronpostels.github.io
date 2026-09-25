# RPG Combat Minigame

> A Skill-Based Battle System

## Links

- [Live Demo](https://ducklin.de/projects/combat/)
- [Case Study (HTML)](https://ducklin.de/case-studies/combat.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/combat.md)

## Project Overview

This project is a turn-based RPG combat simulator built from the ground up using only vanilla JavaScript, HTML, and CSS. Originally prototyped as a potential mechanic for the larger TileQuest project, its core is an engaging, two-part attack sequence that requires player skill. First, a timing-based "Charge" minigame, utilizing `requestAnimationFrame` for a smooth, accelerating meter, determines the base damage. This is immediately followed by a fast-paced, reaction-based "Fury" minigame where players tap dynamically spawning targets to build a damage multiplier. This system creates a rewarding and interactive alternative to traditional static menu-based combat.

## Tech Stack

- Vanilla JavaScript
- CSS Animations
- DOM API

## Key Features

- A unique two-phase attack system combining a timing minigame for base damage and a reaction minigame for a damage multiplier.
- Sophisticated visual feedback, including a procedural damage number animation that merges, combines, and flies towards the target.
- Clean game flow managed by a finite state machine logic, ensuring predictable and bug-free transitions between game states (e.g., player turn, enemy turn, minigames).
- Performance-conscious animation loops using `requestAnimationFrame` for the charge minigame, guaranteeing a smooth experience regardless of device refresh rate.

## Platform & Device Support

Supported devices: mobile
