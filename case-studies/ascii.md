# ASCII Video Renderer

> A High-Performance Video-to-ASCII Art Converter

## Links

- [Live Demo](https://ducklin.de/projects/ASCII/)
- [Case Study (HTML)](https://ducklin.de/case-studies/ascii.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/ascii.md)

## Project Overview

This project is a high-performance ASCII art generator that converts video playback into a stylized, real-time text animation directly in the browser. It leverages the HTML5 Canvas and Video APIs to capture frames, which are then passed to a dedicated Web Worker for intensive processing. This multi-threaded approach ensures the main UI thread remains unblocked, resulting in a smooth and responsive user experience. The renderer includes features like color quantization, brightness/saturation controls, and dynamic resizing to create a visually compelling, retro-tech aesthetic.

## Tech Stack

- JavaScript
- Web Workers API
- HTML5 Canvas API
- HTML5 Video

## Key Features

- Real-time conversion of video playback to animated ASCII art.
- Offloads heavy pixel processing to a separate Web Worker to maintain a responsive UI and prevent animation stutter.
- Supports both monochromatic and quantized color palette rendering for a customizable retro aesthetic.
- Features an optimized rendering pipeline with configurable frame skipping and efficient data batching to ensure smooth playback on various devices.

## Platform & Device Support

Supported devices: desktop
