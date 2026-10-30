# Bachelor Thesis: Robot Goal Celebrations

> Autonomous goal celebrations for a humanoid football robot

## Links

- [Case Study (HTML)](https://ducklin.de/case-studies/bachelor-thesis.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/bachelor-thesis.md)
- [Read the thesis](https://ducklin.de/docs/bachelor-thesis-aaron-postels.pdf)

## Project Overview

With the move from the small NAO to the larger Booster K1, robot football looks more technical and less playful. This bachelor thesis at the University of Bremen (B.Sc. Digital Media, 2026, written in German) gives the robot personality: visible reactions and a goal celebration.

The result is a complete workflow from a motion reference to execution on the real robot. A video is reconstructed as 3D human motion and retargeted to the K1. A custom Blender add-on, **K1 Animator**, makes the motion visible and editable on a constrained robot rig, and also lets you create motions by hand. The Macarena dance runs through every step as the example.

Two kinds of celebrations come out of the same editor. Dynamic full-body dances are trained with reinforcement learning in Isaac Lab, so a control policy executes the motion in simulation. Simpler head and arm gestures run as keyframe animations without training. Both are integrated into the behavior and motion architecture of the B-Human robot football system and can be triggered by game events, test commands or a controller. They were tested on the physical K1.

Title: *Entwicklung eines ereignisgesteuerten Animationssystems für performative Bewegungsabläufe am Beispiel autonomer Torjubel im Roboterfußball*. Supervisors: Prof. Dr.-Ing. Udo Frese and Nuri Ovüc.

## Tech Stack

- Blender (Python add-on)
- Isaac Lab
- Reinforcement Learning (PPO)
- B-Human
- Booster K1

## Key Features

- **Video to robot motion:** a single video is reconstructed as 3D human motion and retargeted to the K1 skeleton.
- **K1 Animator:** a custom Blender add-on to inspect, edit and hand-author motions on a constrained robot rig, with export for training and for the robot.
- **Learned dances:** dynamic full-body motions are trained in Isaac Lab with reinforcement learning so a policy can reproduce them in simulation.
- **Keyframe gestures:** simple head and arm emotes need no training and run directly as keyframe animations.
- **B-Human integration:** celebrations hook into the existing behavior and motion architecture and fire on game events, test commands or a controller.
- **Real-robot test:** the visible motion on the physical K1 matched what was checked in simulation.
