# GAME_PLAN.md

Working document for the browser game project.
Research date: **2026-09-09**. Phases follow `Start_Plan.md`.

Status:
- [x] Phase 1 — Market research
- [ ] Phase 2 — 5-year prediction
- [ ] Phase 3 — Director interview
- [ ] Phase 4 — Popularity analysis of chosen game
- [ ] Phase 5 — Tools comparison
- [ ] Phase 6 — Visual & animation direction

> **Source quality note.** Hard numbers below come from Sensor Tower, AzurGames,
> PocketGamer.biz, Deconstructor of Fun and platform developer docs. Some
> "best browser games 2026" listicles used for the competitor scan are SEO/affiliate
> content — treated as directional signal about *what people search for*, not as data.
> Every claim is tagged **[data]** (measured) or **[soft]** (editorial/anecdotal).

---

## PHASE 1 — MARKET RESEARCH

### 1.1 What is popular right now

#### Browser / web games

| Rank | Platform | Note |
|---|---|---|
| 1 | Poki | Largest deduplicated web-gaming audience, May 2026 **[data]** |
| 2 | CrazyGames | Closest competitor; only major portal with a documented IAP path |
| 3 | Friv | Legacy traffic, mostly school/casual |
| 4 | Coolmath Games | US school audience, huge but narrow |
| 5 | Playhop | Growing, ex-Yandex ecosystem |
| — | itch.io | Not a traffic leader; it is the **discovery** layer for indie web games |

Dominant browser genres in 2026:

| Genre | Why it works in a browser |
|---|---|
| **Daily puzzle** (Wordle, Connections, NYT Mini, Strands) | 2–5 min session, zero onboarding, habit loop, shareable score **[soft, but traffic-verified]** |
| **Match-3 / puzzle / arcade / mahjong / word** | The bulk of Poki-style portal inventory |
| **.io multiplayer** (Slither.io, Krunker, 1v1.lol) | Instant join, no account, tiny download |
| **Browser FPS** (Krunker, Venge) | Proof that real-time 3D shooters *do* work in a tab |
| Party / strategy / RPG / creative experiments | Long tail; smaller but loyal audiences |

Tech baseline: **WebGL 2.0 is the production norm in 2026**, with WebGPU typically shipped behind a feature flag. 2D Canvas `.io` games are still viable and still profitable. **[data]**

#### Mobile games

| Metric | Leaders |
|---|---|
| Downloads (2024 base year) | Simulation 20%, Puzzle 20%, Arcade 19% **[data]** |
| Consumer spend | Strategy **$9.3B**, Puzzle **$8.1B** (+~20% YoY), RPG **$6.1B**, Casino **$5.0B** **[data]** |
| Best all-round genre | **Strategy** — the only genre gaining in revenue *and* downloads *and* time spent (led by Last War: Survival, Whiteout Survival) **[data]** |
| Segment growth H1 2026 | Hybridcasual **+23% to $2.4B**; mid-core **−7% to ~$20.6B**; casual flat ~$16.5B **[data]** |

Scale marker: ~95,000 mobile game downloads per minute in 2025. **[data]**

#### Indie / Steam (translatable to browser)

Thriving in 2026: **roguelites** (Hades II, Megabonk), **survival co-op** (PEAK), **cozy sims**, **narrative-driven retro adventures**, and **extraction survival** (e.g. Pale Tide, a zombie extraction indie). Roguelite mechanics are being bolted onto farming sims, deckbuilders and horror games. **[soft]**

Why roguelite keeps winning: high replayability per unit of content, cheap to produce, and streamer-friendly — which buys organic visibility a $0 budget cannot buy. **[soft]**

---

### 1.2 Rising vs declining (last ~2 years)

| Direction | Genre / mechanic | Evidence |
|---|---|---|
| ▲▲ Strong rise | **Hybridcasual** | Only casual segment growing IAP revenue: **+20% to $4.2B**; top 10 titles +67–100% YoY IAP **[data]** |
| ▲▲ Strong rise | **Strategy / survival-strategy** | Largest revenue genre and still growing on all three axes **[data]** |
| ▲ Rise | **Puzzle (revenue)** | +~20% to $8.1B in spend, even while download share dipped −3% **[data]** |
| ▲ Rise | **Daily-habit web puzzles** | Now an "enormous slice" of casual browser play **[soft]** |
| ▲ Rise | **Roguelite, cozy sim, co-op survival, extraction** | Indie/Steam momentum **[soft]** |
| ▬ Flat | **Casual mobile** | ~$16.5B, sideways **[data]** |
| ▼ Decline | **Hypercasual *economics*** | Still 22.05B installs in 2025, but pure ad-only payback broke as CPIs rose. The games survive; the business model died. **[data]** |
| ▼ Decline | **Mid-core mobile** | −7% to ~$20.6B **[data]** |
| ▼ Decline | **Battle royale** (Western/mature markets) | Copycat saturation 2019–22 → content fatigue; still growing in SEA/LatAm **[soft]** |
| ▼ Decline | **Arcade downloads** | −12.5% YoY **[data]** |

**Reading for you:** the money moved from "get installs cheap, show ads" to "keep a smaller audience for months, sell them something." That matters more than genre choice.

---

### 1.3 Competitor & gap analysis — your three ideas

#### Idea 1 — Text adventure RPG w/ pixel illustrations (à la *Life in Adventure*)

| | |
|---|---|
| **Direct competitors** | Life in Adventure, Life is a Game (same dev), choice/CYOA catalogue on mobile |
| **What they do well** | Strong atmosphere; tight writing; a small animated combat sequence; clean HUD; occasional illustrations between paragraphs — proof that *light* art carries a text game **[soft]** |
| **Player complaints (the gap)** | 1. **Repetitive** — re-running adventures surfaces the same random encounters fast. 2. **Vague choices** — options are worded so players pick things they didn't intend. 3. **Ad abuse** — ads every few minutes, close buttons that don't work. 4. **Weak main quest** — unclear spine. 5. **UI regressions** (distracting spin animation on choice icons) **[soft — user reviews]** |
| **Exploitable gap** | A run-based text RPG with **authored spine + readable choices + honest ads**. Every top complaint is fixable with writing and restraint, not with engineering budget. |
| **Browser fit** | Excellent. Text + sprites = tiny payload, runs on any phone, no WebGL needed. |

#### Idea 2 — Open-world zombie survival RPG

| | |
|---|---|
| **Competitors** | Browser survival-crafting is a real, active category in 2026: crafting sims, multiplayer base-builders, hunger-meter zombie shooters, roguelike survival runs — all install-free **[soft]** |
| **What works** | The loop is proven and unkillable: gather → build → survive the night. Survival-strategy is the #1 revenue genre on mobile **[data]** |
| **Gap** | Most browser entries are shallow; almost none carry real *story*. Narrative survival is genuinely under-served on the web. |
| **Hard constraint** | "Open world" is the enemy. Mobile web production in 2026 requires pre-agreed budgets for memory, GPU thermals and asset size across a low/mid/high device matrix, with LOD as standard practice **[data]**. Streaming a large world on a mid-tier phone browser is the single most expensive thing on your list. |

#### Idea 3 — Online co-op zombie campaign FPS

| | |
|---|---|
| **Competitors** | Krunker (the browser FPS king, Quake-style arena, classes + killstreaks), Venge ("browser Valorant"), 1v1.lol **[soft]** |
| **Proof point** | Real-time 3D FPS in a browser is solved. Krunker holds a massive audience. |
| **Player complaints (the gap)** | 1. **Cheaters** — ranked "infested"; repeated across reviews. 2. **Server quality** — low tick rate. 3. **Balance** — some modes (Gun Game) called badly imbalanced. 4. **Trust erosion** — NFT push and the FRVR acquisition soured longtime players **[soft — Trustpilot]** |
| **Exploitable gap** | Cheating is the #1 complaint, and it is *your* biggest cost: a fair FPS needs server-authoritative simulation, which is not a free-tier workload. **Co-op PvE sidesteps it** — nobody grinds cheats to ruin a co-op session. That is a genuine, defensible angle. |
| **Hard constraint** | Free-tier hosting (Render/Fly.io) means cold starts, tight RAM, and no dedicated regional servers. Real-time 3D netcode for 4 players is achievable; scale and latency are not free. |

---

### 1.4 Monetization models that actually work (browser, 2026)

Market size: **HTML5 gaming passed $6B in 2026** **[soft]**.

| Model | Reality in 2026 | Fit for a $0 solo dev |
|---|---|---|
| **Rewarded video ads** | Top-paying format: **~$15–28 eCPM (US)**, **$8–15 (EU)**, **$1–3 (tier-3)** — *before* your split **[data]** | ★★★★★ Best first revenue. Player opts in, so no rage-quit. |
| **Interstitial / banner** | Standard portal inventory | ★★★☆☆ Works, but this is exactly what tanked *Life in Adventure*'s reviews. Use sparingly. |
| **Portal rev-share — CrazyGames** | **60% of ad revenue**, **70% of IAP** to the developer. Typical path: launch ads-first, unlock purchases after the game proves out **[data]** | ★★★★★ Clear, documented terms. |
| **Portal rev-share — Poki** | Ad rev-share; **no publisher-facing IAP product**. Payout % not public **[data]** | ★★★★☆ Biggest audience, ads only. |
| **In-app purchase (CrazyGames)** | Via **Xsolla** under CrazyGames' account, tied to CrazyGames ID; **invite-only feature**, signed-in users only **[data]** | ★★★☆☆ Not available on day one. Earn it. |
| **Licensing / sponsorship** | Non-exclusive **$300–800 per platform**; exclusive buyout **$5,000 → $25,000+** for quality titles **[data]** | ★★★★☆ Real cash for a finished, polished small game. |
| **Premium (pay upfront)** | Effectively dead on web portals | ★☆☆☆☆ |
| **Patreon / donations** | Works only after an audience exists | ★★☆☆☆ Later, not now. |
| **Hybrid: portal → PWA** | Increasingly common 2026 pattern — use portals for discovery + ad money, route engaged players to your own PWA where IAP is possible **[soft]** | ★★★★☆ Good 12-month target. GitHub Pages can host the PWA. |

**Bottom line for Phase 4/5:** the viable $0 path is *rewarded ads on a portal first, licensing deal second, IAP third* — and portals reward **retention**, not spectacle. That favors a small game people return to daily over a big game they finish once.

---

### Phase 1 sources

- [Sensor Tower — State of Gaming 2026](https://sensortower.com/report/state-of-gaming-2026)
- [Sensor Tower — State of Mobile Gaming 2025 (PDF)](https://investgame.net/wp-content/uploads/2025/11/sensor_tower__state_of_mobile_gaming_2025__en.pdf)
- [AzurGames — Hypercasual and hybrid casual in 2026, full report](https://azurgames.com/blog/hypercasual-and-hybrid-casual-in-2026-full-report/)
- [PocketGamer.biz — What happened to hypercasual?](https://www.pocketgamer.biz/what-happened-to-hypercasual-the-markets-evolution-over-the-past-year/)
- [Deconstructor of Fun — The State of Mobile Gaming 2025](https://www.deconstructoroffun.com/blog/2025/6/5/the-state-of-mobile-gaming-2025)
- [Udonis — 200+ Mobile Gaming Market Statistics 2026](https://www.blog.udonis.co/mobile-marketing/mobile-games/mobile-gaming-statistics)
- [Udonis — Casual Games Market in 2026](https://www.blog.udonis.co/mobile-marketing/mobile-games/casual-games)
- [Cinevva — Web Game Monetization: What the Data Actually Says (2026)](https://app.cinevva.com/guides/web-game-monetization)
- [Cinevva — CrazyGames Developer Guide: Publish and Earn (2026)](https://app.cinevva.com/guides/publish-game-crazygames)
- [Cinevva — Casual Games Trends in 2026](https://app.cinevva.com/guides/casual-games-trends-2026)
- [Impulse Media Hub — Web-Native Game Distribution in 2026](https://www.impulsemediahub.com/blog/web-native-games-rising/)
- [Playgama — 10 Ways to Monetize HTML5 Games That Actually Work in 2026](https://playgama.com/blog/main/10-ways-to-monetize-html5-games-that-actually-work-in-2026/)
- [FGL — Ultimate Guide to Browser Games in 2026](https://fgl.com/blog/ultimate-guide-to-browser-games-2026/)
- [Juego Studio — Future of HTML5 Game Development, 2026 trends](https://www.juegostudio.com/blog/emerging-trends-for-modern-html5-game-development-in-2025)
- [No Small Games — 10 Indie Game Trends from 2025](https://nosmallgames.com/2026/01/10-indie-game-trends-from-2025/)
- [Dinogame GG — Best Browser Survival Crafting Games](https://dinogame.gg/blog/best-browser-survival-crafting-games/)
- [rottenwifi — 15 Best Browser Based FPS Games in 2026](https://rottenwifi.com/15-best-browser-based-fps-games-in-2026/)
- [Trustpilot — Krunker.io reviews](https://www.trustpilot.com/review/krunker.io)
- [TapTap — Life in Adventure ratings & reviews](https://www.taptap.io/app/204242/review?page=3)
- [App Store — Life in Adventure reviews](https://apps.apple.com/us/app/1551617649?see-all=reviews&platform=iphone)
- [GameGrin — Life in Adventure review](https://www.gamegrin.com/reviews/life-in-adventure-review/)
