# Portal

> A demonstration of transparent video encoding and synchronization

## Links

- [Live Demo](https://ducklin.de/projects/portal/)
- [Case Study (HTML)](https://ducklin.de/case-studies/portal.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/portal.md)

## Project Overview

This project demonstrates a seamless, interactive UI transition built entirely with HTML5 Video elements, designed to mimic a character scanning process that initiates a portal effect. Conceptualized as an animation for the TileQuest project, it utilizes two video streams: an "idle" looping background and a crucial "scanned" transition video encoded with an alpha channel for transparent playback. The application manages the transition logic via JavaScript, ensuring the transition video (representing the portal glow and fly-through) plays once over the idle loop before smoothly fading back to the seamless idle state. This showcases advanced video synchronization and transparent video techniques for high-end web interfaces.

## Tech Stack

- HTML5 Video API
- JavaScript
- HEVC (H.265)
- WebM

## Key Features

- Seamless crossfade between a looping "idle" video and a one-shot "scanned" transition video.
- Utilization of HEVC (H.265) video encoding with alpha channel for transparent video playback where supported, enabling the fly-through effect to sit cleanly over the background.
- Robust JavaScript logic to manage video synchronization, ensuring the idle loop pauses/resumes correctly during the transition play cycle.
- Event-driven UI: A user action (simulating an NFC scan) triggers the visually compelling portal glow and fly-through sequence.
- Mobile-optimized design that positions the video as a fixed, full-screen background element, providing an immersive experience.

## Platform & Device Support

Supported devices: desktop, mobile
