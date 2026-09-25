# Web Platformer

> A Competitive 2D Platformer & Level Editor

## Links

- [Case Study (HTML)](https://ducklin.de/case-studies/web-platformer.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/web-platformer.md)

## Project Overview

The vision for "The King's Canvas" is to create a competitive 2D platformer with a unique, community-driven gameplay loop summarized by the motto: "Beat the King, Become the King." Players compete to achieve the fastest time on a single, official level designed by the current "King." The first player to beat that time is crowned the new King, and their own pre-designed level becomes the new official challenge for the entire community, creating a dynamic and endlessly evolving game.

## Tech Stack

- Next.js
- Turborepo
- TypeScript
- Docker

## Key Features

- **Monorepo Architecture:** Fully set up as a scalable Turborepo monorepo, with separate apps for the frontend and backend, and shared packages for the game engine and types.
- **Deterministic Game Engine:** A sophisticated, tick-based 2D platforming physics engine has been implemented, featuring coyote time, jump buffering, wall sliding, dashing, and more.
- **Playable Game Client:** A functional game client built with Pixi.js that can load and render level maps, featuring a sophisticated autotiling system.
- **Interactive Physics Tuning Menu:** A complete UI allowing for real-time adjustment of over 40 physics and camera parameters.
- **API & Database Foundation:** A foundational API server using Fastify is in place, with a database schema defined using Drizzle ORM for users, maps, and records.
