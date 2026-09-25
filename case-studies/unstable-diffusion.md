# Unstable Diffusion

> An AI-Driven Animation Experiment

## Links

- [Case Study (HTML)](https://ducklin.de/case-studies/unstable-diffusion.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/unstable-diffusion.md)

## Project Overview

The vision for "Unstable Diffusion" was to explore the creative potential of generative AI as an interpretive tool. As a group project for a university class, it tests the AI's ability to perceive and construct recognizable forms—specifically human faces and figures—from purely abstract and ambiguous motion data provided by a depth map. The goal was to generate a unique, fluid animation where human-like forms appear to emerge and dissolve from a chaotic source.

## Tech Stack

- Blender
- Python
- Stable Diffusion
- Flux

## Key Features

- **Abstract Animation:** An abstract, continuously deforming 3D sculpture was created and animated in Blender to serve as the motion source.
- **Depth Map Generation:** The animation was rendered as a sequence of depth map images, creating a video that encodes spatial information without recognizable features.
- **AI Interpretation with ControlNet:** The depth map video was fed into a Stable Diffusion model using ControlNet, which forced the AI to adhere to the structure and motion of the depth map.
- **Final Animation:** By prompting the AI to generate human faces and figures, the process resulted in a surreal animation where abstract shapes fluidly resolve into recognizable, yet constantly shifting, human-like forms.
