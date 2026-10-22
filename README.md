# Atreia — releases

An in-game overlay for Aion 2 on Windows: a party DPS meter with dungeon run splits, pet soul tracking with a farming map, field boss timers, and crafting profits at live market prices.

## Features

### Overlay

- One transparent, always-on-top window over the game. Run the game in **borderless windowed** mode, because exclusive fullscreen hides overlays.
- Header icons switch between Meter, Pets, Bosses, Merchant and Crafting (hover for the names); each has its tabs below.
- **Ctrl+Shift+F7** minimizes it to the taskbar and brings it back, **Ctrl+Shift+F8** locks it so clicks go through to the game. A small unlock button stays clickable while locked. Both hotkeys can be changed in Settings.
- The minimize button folds the overlay to its essentials: party DPS, the pets you farm, or your boss timers. ✕ closes the app.
- Size, opacity, backdrop and theme (purple or blue) in Settings. The overlay and the map reopen where you left them, at the same size.
- The header shows your ping to the game server, timers for the Spacetime Rift and the Shugo Festival, What's new, and an update button when a new version is ready.

### DPS meter

- Live bars for you and your party: damage, DPS, share of the party's damage, combat power and class. Bosses get an HP bar, time to kill and a stagger gauge with breaks.
- A healing view with effective healing and overheal.
- **Skills:** every skill's damage, hits and crits with names and icons, plus your buff uptimes.
- **History:** your last 100 fights, compared with your best on the same monster, for all patches or only the current one.
- **Runs:** dungeon runs as LiveSplit-style splits against your best run, picked by content (party dungeon, raid, nightmare, sealed dungeon …) and dungeon. Nightmare stages are timed like the game's Clear Time.
- **Deaths:** a recap of the last 10 seconds before you or a party member died: every hit and heal with the HP after it.
- Training dummy runs of 1, 2, 3 or 5 minutes.
- Everything stays on your PC: no uploads, no rankings, no share links.

### Pets

- **Collection:** all 207 pets with their levels, synced when you log in. Souls are counted as they drop.
- **Farm:** zones ranked by how many of your missing pets drop their soul there.
- **Session:** kills, Kinah, loot value and souls per hour, per character; it survives an app restart.
- **HUD:** the pets you're farming right now, with souls to the next level and an ETA at your pace.
- **Map window:** every soul mob's spawns, one color per pet you still need, your own position, the nearest soul mobs around you, and layers for hidden cubes, gathering nodes, teleport statues, seals and monolith feathers. Hunting mode shows just the map.
- **Black Cloud Merchant:** open its tabs in game and its stock shows up, pets you don't own first.

### Bosses

- Field boss timers per map, one tab each: up since, due, or the countdown to the respawn in your local time.
- Star a boss to get a Windows notification before it spawns.

### Crafting

- All 394 recipes ranked by expected profit per attempt, with margin, listing counts and flags for thin markets or missing prices.
- Success chance, combos and Splendent results are part of the math. Every material is costed at the cheaper of buying and crafting it yourself.
- Type your own prices (`320k`, `1.8m`) and the number of crafts; material totals and expected results scale with it.
- **Favorites**, **Top**, **All**, **Deals** (materials well under their 7-day median) and **Market**: every item on the market, including buy-only ones like wings and sealed wings, with a price history chart.
- Prices are the lowest listings from aion2.market (items it lacks come from aion2.exchange), refreshed about hourly through one shared price hub for all users.

## Install

Download the latest `Atreia_<version>_x64-setup.exe` from the [latest release](https://github.com/Xoudusz/atreia/releases/latest) and run it. The installer is unsigned, so Windows SmartScreen may warn you: click **More info**, then **Run anyway**. It installs for your Windows user only.

The meter, pets, bosses and merchant read the game's own network traffic. For them, install [Npcap](https://npcap.com/#download) (free, default options) and turn on Settings → Pets → "Count pet souls automatically". Crafting works without it.

The app updates itself: the update button in the header installs a new version with one click.

If the overlay stays blank or closes by itself, RivaTuner (the MSI Afterburner FPS overlay) may be crashing it: in RivaTuner add `msedgewebview2.exe` and set Application detection level to None.

## Safety

The app never touches the game process: it reads no game memory, injects nothing, sends nothing to the game server and automates no input. The meter and pet features only listen to the game's own incoming traffic, read-only. The overlay only draws its own window.
