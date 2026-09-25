# NPC Engine

> Local Large Language Model Persona Framework

## Links

- [Case Study (HTML)](https://ducklin.de/case-studies/npc-engine.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/npc-engine.md)

## Project Overview

The NPC Engine is a sophisticated local AI platform designed to create, manage, and interact with highly stable AI personas. Unlike generic chatbots, this system focuses on **role-playing fidelity**, ensuring characters stay strictly in character even under "interrogation" or complex dialogue scenarios.


            

It features a custom-built Web UI that provides full control over the LLM pipeline, from loading different quantized models (Gemma, Llama, Mistral) to fine-tuning specific character behaviors using **Low-Rank Adaptation (LoRA)** directly within the interface.

## Tech Stack

- Python
- PyTorch
- FastAPI
- Transformers
- LoRA

## Key Features

- **Stable Personalities:** Utilizes advanced system prompts and context injection to maintain character consistency, preventing the AI from breaking character or reverting to "AI Assistant" mode.
- **Integrated LoRA Training:** A "One-Click" training pipeline that generates synthetic datasets based on character definitions and fine-tunes the model locally to adopt specific speech patterns and knowledge.
- **Model Agnostic:** Supports hot-swapping between various open-source models (e.g., Gemma 2, Llama 3) with support for 4-bit and 8-bit quantization for efficiency on consumer hardware.
- **Full Control:** A bespoke dark-mode UI giving access to all generation parameters (Temperature, Top-P, Repetition Penalty) and system settings in real-time.
