# VeinMining

> Advanced ore vein & excavation pattern mining mod for Hytale (Updated for v0.6)

## Links

- [Case Study (HTML)](https://ducklin.de/case-studies/veinmining.html)
- [Case Study (Markdown)](https://ducklin.de/case-studies/veinmining.md)
- [View on CurseForge](https://www.curseforge.com/hytale/mods/veinmining)
- [Source on GitHub](https://github.com/aaronpostels/VeinMining)

## Project Overview

VeinMining is a versatile utility mod for Hytale that streamlines gathering by letting players mine entire connected ore veins or excavate geometric shapes in one coordinated break action. Players activate veinmining simply by holding an activation key (defaulting to Left Alt / Walk) while mining with an appropriate tool.

            

The mod has been fully migrated and updated to remain compatible with **Hytale v0.6** (with special thanks to contributor *ItsRiprod* for migration support). It features a custom in-game UI configuration window, deep chat command flag parsing, tool durability balance, and smart drop consolidation.

## Tech Stack

- Java
- Hytale Plugin API
- Gradle

## Key Features

- **Activation on Demand:** Hold the Walk key (Left Alt) while mining to activate veinmining without interrupting standard single-block mining.
- **Interactive In-Game GUI:** Open a visual settings dashboard at any time with /vm to adjust targeting mode, patterns, orientation, and activation triggers.
- **Durability Balance:** Equipped tools lose durability based on the total count of broken blocks, keeping server economies and survival progression balanced.
- **Loot Consolidation:** Collect all block drops and ores from the broken vein into a single consolidated stack placed at the player's feet or at the source block.
