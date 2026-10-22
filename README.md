# Atreia — releases

nFormerly **Aion2 Craft**: installed copies update to Atreia by themselves and keep all their data.
Windows app for Aion 2: ranks crafting recipes by profit, tracks your pet souls, field boss timers and a map, all in an in-game overlay.

## Install

1. Download `Atreia_<version>_x64-setup.exe` from the [latest release](https://github.com/Xoudusz/atreia/releases/latest).
2. Run it. The installer is unsigned, so Windows SmartScreen may warn: click **More info**, then **Run anyway**.
3. Optional, for the pet features: install [Npcap](https://npcap.com/#download) (free, default options).

Installs for your Windows user only (no admin needed). The app updates itself: it checks for new versions at start and every 6 hours; an "Update" button in the overlay's footer installs them (one click, then it restarts).

Run the game in **borderless windowed** mode; exclusive fullscreen hides overlays.

## Features

### Crafting

- **Profit ranking:** every recipe (394) ranked by expected profit per attempt at live market prices, with margin %, listing counts and flags for thin markets (1–3 listings) or missing prices.
- **Buy or craft:** each material is costed at the cheaper of buying it and crafting it yourself, recursively. Open a recipe to see materials, outputs and the buy-or-craft choice per material.
- **Success, combo and tax:** success chance per recipe, combo chances per category (weapons/armor, food, potions, manastones) and market tax, all editable in Settings.
- **Your own prices:** type a price into any price box to override the market price (amber border). Inputs accept `320k`, `1.8m` or `34000000`.
- **Craft quantities:** set how many crafts you plan; material totals follow.
- **Price history:** trend lines and "▼ x% vs 7d" per item, "mats cheap" / "sell high" tags, and a chart popup (24h / 7d / 30d) when you click a trend line.
- **Deals:** materials currently well below their usual 7-day price, with the recipes that use them.
- **Favorites:** star recipes to keep them at hand in the overlay.

### Overlay

- **Ctrl+Shift+F7** shows or hides it, **Ctrl+Shift+F8** locks it (clicks go through to the game). Both hotkeys can be changed in Settings.
- Tabs for Crafting (Favorites · Top · All · Deals) and Pets (Collection · Farm · Session · HUD · Map). Each group reopens the tab you used last.
- Adjustable card opacity and a faint backdrop box.
- **Only over AION 2** (on by default): while the game runs, the overlay and map hide when another program is in front and come back when you return to the game.
- The overlay is the whole app (since 0.7.0 there's no separate window). The tray icon shows or hides it; closing it keeps the app running in the tray.
- The overlay never takes keyboard focus from the game, except while you type into it.
- Quick help (? button): how to sync (relog for pets), hotkeys, notifications.

### Pets

- **Collection:** all 207 pets with level (5 / 25 / 75 souls for Lv 1 / 2 / 3), progress bars, collection titles, search, genus filters, sorting, "Missing only" and "Hide maxed". Star pets to keep them in view.
- **Where to farm:** each pet's soul mobs with level, drop chance and zones. The **Farm** planner ranks zones by how many of your missing pets drop souls there.
- **Automatic soul counting** (optional, needs Npcap): every soul drop is counted as it happens, shown as "+N" on the pet.
- **Login sync:** when you log in, your whole pet collection is read from the game's login data, so levels and souls match the game.
- **Farming now:** the pets you're farming this session, with souls per hour and an ETA to the next level.
- **Session:** kills, Kinah, loot value (at market prices) and souls per hour, tracked per character.
- **HUD:** a small, transparent farming view that shrinks to its content. Lock the overlay and play with it on screen.
- **Nearest spawn and nearby soul mobs:** distance and direction to the nearest spawn of the pets you farm, plus a list of other missing pets whose soul mobs spawn within about 250 m of you.

### Field bosses

- Live respawn countdowns for every field boss on the map you're on (Altgard so far), in your local time, straight from the game's own boss list.
- Star a boss to get a Windows notification before it spawns (5–30 min ahead, or at spawn).

### Map window

- Its own overlay-style window: where a pet's soul mobs spawn, every soul mob of a farming zone, or the full map.
- **Your position** on the map, with a follow mode (Altgard for now; other maps once they're mapped).
- A dashed line to the nearest spawn, with distance and direction.
- **Layers:** hidden cubes, gathering nodes, teleport statues, seals and monolith materials (feathers). Icons grow as you zoom in; their size can be changed in Settings.
- Maps that aren't on the Global client yet (Morheim, Eltnen, Middle and Upper Reshanta) are hidden.

## How it works

- **Prices:** [aion2.market](https://aion2.market) collects the lowest listing per item from the in-game market about once an hour. A small shared cache fetches it once for all users, and the app reads from there (falling back to aion2.market directly). Prices are lowest listings, not completed sales. The in-game market itself can't be read: it runs over encrypted HTTPS.
- **Price history:** this repository keeps an hourly archive (below). The app imports the last days from here and keeps 30 days locally for trends, medians and charts.
- **Profit:** expected profit per attempt = chance of each outcome (success, combo, failure) × the result's price after tax − the cost of the materials. Failed crafts lose the materials; a combo is a second roll after a success.
- **Pets and position (optional):** with Npcap installed and "Count pet souls automatically" on, the app passively copies the game's own incoming network traffic on your PC and reads a few kinds of messages: your inventory changes (soul drops, loot), your kill credits, your pet collection at login, your character, the map you load into, and your own position from your skill casts.
- **Fair play:** the app never touches the game: no injection, no memory reading, no input automation, and it never sends anything to the game server. It only shows your own position and static map data, never other players or monsters. Packet reading is passive and read-only, but use it at your own discretion.
- **Data:** recipes from aion2hub; pets, monsters, spawn points, hidden cubes, gathering nodes and map tiles from [metabot.gg](https://metabot.gg); teleport statues, seals and feathers from [aion2-interactive-map](https://github.com/aion2-interactive-map/aion2-interactive-map) (CC BY-NC 4.0, converted to the app's map coordinates).
- **Your data** (settings, favorites, prices you typed, pet progress, price history) stays on your PC in `%APPDATA%\at.w23.aion2craft`.

This repository only hosts the installers, update files and the price archive.

## Price history

`history/<server>/<YYYY-MM-DD>.csv` holds hourly lowest-listing prices from [aion2.market](https://aion2.market) (`item,t,price,listings`, `t` in ms UTC). The `Price archive` workflow adds new rows every hour; the app reads the last days from here for its trend lines and "cheap now" badges.
