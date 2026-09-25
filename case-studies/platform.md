# Platform Kinematics

> A Real-Time 3D Stewart Platform Simulation

## Links

- [Live Demo](https://ducklin.de/projects/platform/)
- [Case Study (HTML)](https://ducklin.de/case-studies/platform.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/platform.md)

## Project Overview

This project is a real-time 3D web simulation of a motorized 3-axis Stewart platform, developed to visualize and test inverse kinematics algorithms before deployment on physical hardware. As part of a collaborative project for an electronic systems course, this simulator allows users to control the platform's roll and pitch angles or manipulate individual actuator heights. It accurately calculates the required actuator positions to achieve the desired orientation, providing a crucial tool for debugging and demonstrating the complex mathematics involved. An interactive control panel powered by Tweakpane offers real-time manipulation of all system parameters.

## Tech Stack

- React
- Three.js
- React Three Fiber (R3F)
- Drei
- Tweakpane

## Key Features

- Real-time 3D visualization of a 3-axis Stewart platform and its components.
- Accurate inverse kinematics simulation converting target roll/pitch angles into individual actuator heights.
- Interactive control panel (Tweakpane) for manipulating platform radius, actuator distance, target angles, and manual actuator heights.
- Dual control modes: "Target Angle" for kinematic simulation and "Manual" for direct actuator control.
- A physics-based ball simulation on the platform's surface to visually demonstrate stability and tilt.
- Includes a separate [single actuator simulation](https://ducklin.de/projects/platform/actuator/) to demonstrate its individual motion and homing sequence.

## Platform & Device Support

Supported devices: desktop, mobile
