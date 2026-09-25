# Panzer

> A Real-Time Multiplayer Arena

## Links

- [Case Study (HTML)](https://ducklin.de/case-studies/panzer.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/panzer.md)

## Project Overview

The vision is to create a fast-paced, 2D top-down tank arena game that is seamlessly integrated into Discord. Players can easily invite friends and jump into public or private lobbies directly within the social platform. The project goes beyond just the game itself, aiming to provide a complete ecosystem including a robust lobby system, game browser, and a powerful, web-based map editor for creating and sharing custom levels.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Socket.io

## Key Features

- **Full Discord Integration:** The game fully supports being run as a Discord Activity, handling authentication and invites through the official SDK.
- **Complete Lobby System:** Players can create public/private lobbies, browse open games, and join via codes. The host has full control over game settings.
- **Authoritative Gameplay Core:** A cheat-resistant server dictates all game logic, synchronizing state to clients in real-time. The client uses state interpolation for smooth rendering.
- **In-Browser Map Editor:** A comprehensive, standalone map editor allows users to place objects, use a snapping grid, manage history with undo/redo, and export maps as JSON.
- **Admin & Debug Tools:** An admin dashboard provides a real-time overview of active lobbies, and an in-game debug menu allows for live tweaking of physics variables.
