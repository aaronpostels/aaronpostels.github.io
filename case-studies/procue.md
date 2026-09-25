# ProCue Motion Platform

> A real-time 3D digital twin of a six-axis motion platform

## Links

- [Live Demo](https://ducklin.de/projects/motion-platform/)
- [Case Study (HTML)](https://ducklin.de/case-studies/procue.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/procue.md)
- [Visit procue.xyz](https://procue.xyz)

## Project Overview

ProCue is software for managing and tuning motion cueing on driving simulators. For them I built an interactive digital twin of a six-degree-of-freedom Stewart platform that shows in real time how cueing moves the platform, and I also built their website, [procue.xyz](https://procue.xyz), where the simulator is embedded.

The demo here is the standalone 3D scene of the platform. The six leg lengths are always solved from the platform pose with Stewart-platform inverse kinematics.

## Tech Stack

- React
- TypeScript
- React Three Fiber (R3F)
- Three.js
- Vite

## Key Features

- Six-axis Stewart platform with inverse kinematics: every visible actuator length is calculated from the commanded platform position and rotation.
- Classical washout filter that turns vehicle acceleration into platform motion cues on a fixed 60 Hz update loop.
- Three control paths: vehicle acceleration, direct platform pose (surge, sway, heave, roll, pitch, yaw) and individual actuator strokes.
- Idle showcase camera that blends back smoothly after the visitor stops orbiting or zooming.
- Runs on desktop and phones, and loads behind a short fade so no unfinished frame is ever shown.

## Platform & Device Support

Supported devices: desktop, mobile
