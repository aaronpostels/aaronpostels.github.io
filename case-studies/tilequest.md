# TileQuest

> A Phygital Cooperative RPG

## Links

- [Case Study (HTML)](https://ducklin.de/case-studies/tilequest.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/tilequest.md)

## Project Overview

Tile Quest is a cooperative board game that blends physical interaction with the depth of a digital RPG. Developed as a major 4th-semester university project by a group of four, it offloads complex rules and state tracking to a mobile web app, keeping the physical gameplay fast and tactile. The system is designed to be a self-contained, offline-first experience hosted on a Raspberry Pi, allowing players to connect and play with zero installation or internet access required.

## Tech Stack

- Raspberry Pi
- Flask
- React
- ESP32
- RFID

## Key Features

- **Full-Stack Architecture:** A complete, containerized monorepo houses the Python backend and React frontend, with real-time communication established via WebSockets.
- **Physical-Digital Sync:** A full hardware-to-software pipeline is functional. The system reads NFC data from all tiles, transmits the board state via Bluetooth, and the backend validates player moves in real time.
- **Core RPG Systems:** The Python backend includes robust systems for player progression (levels and skills), character classes with unique abilities, a data-driven economy (items, crafting, shops), and a deep gear upgrade and reforge system.
- **Interactive Web App:** The frontend provides a full UI for the game loop, including a lobby, character selection, and an active game view with a HUD, inventory management, and action modals.
- **Developer Tooling:** A web-based developer panel allows for debugging, hardware simulation, and live manipulation of the game state.
