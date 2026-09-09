# GAME_PLAN.md

Working document for the browser game project.
Research date: **2026-09-09**. Phases follow `Start_Plan.md`.

Status:
- [x] Phase 1 — Market research
- [x] Phase 2 — 5-year prediction
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

---

## PHASE 2 — 5-YEAR PREDICTION (2026 → 2031)

> ⚠️ **EVERYTHING IN THIS SECTION IS INFORMED SPECULATION, NOT FACT.**
> The *signals* below are measured and sourced. The *predictions* are my
> reasoning on top of them. Nobody can verify a 2031 claim in 2026. Treat
> confidence levels as "how much weight to put on this when scoping", not as
> probability guarantees.

### 2.1 The five signals I am reasoning from

| # | Signal | Measured fact (2026) |
|---|---|---|
| **S1** | **WebGPU went Baseline** | January 2026: Chrome/Edge 113+, Firefox 141+ (Win) / 145+ (macOS), **Safari 26 on iOS + macOS** all ship it on by default. ~**82% of global users** covered. Developer uptake: **65% of new web apps shipping 3D** use it, up from ~8% two years earlier. **[data]** |
| **S2** | **AI content backlash is real and measurable** | **~1/3 of Steam releases in 2026 carry AI disclosure** (7,300+ titles by March 2026, up from 22% in 2025). **85% of gamers report negative attitudes toward AI in games.** Among developers, **52% say generative AI has a negative impact — up from 30% a year earlier**; strongest opposition in visual/technical art (64%) and design/narrative (63%). **[data]** |
| **S3** | **Audience is younger, more social, more creative** | **77% of Gen Alpha play games.** Roblox reaches **51% of 12–15-year-olds, up from 26% in 2021**. **38% of gamers prefer games that let them build or create.** Gen Z is **33% more likely** than older cohorts to play for social reasons. TikTok/YouTube function as their search engines. **[data]** |
| **S4** | **The ad-only economy broke; hybrid replaced it** | Hypercasual still shipped **22.05B installs (2025)** but pure ad payback failed as CPIs rose. Hybridcasual IAP **+20% to $4.2B**, top-10 titles **+67–100% YoY**. Mid-core **−7%**. **[data]** |
| **S5** | **Platform rules are churning, and the web is the stable ground** | Apple EU: alternative browser engines now permitted; **standalone PWA support removed in the EU** (opens in a Safari tab, no push — push works on iOS 16.4+ *outside* the EU); PWAs still rejected from the App Store as "repackaged websites"; unified EU business terms from **Jan 1 2026**, CTF→CTC, further changes effective **Oct 1 2026**. **[data]** |

---

### 2.2 Predicted GROWTH (2026 → 2031)

| Prediction | Confidence | Reasoning from signals |
|---|---|---|
| **Short-session, daily-habit games win the web.** 2–6 minute loops with a shareable result and a reason to return tomorrow. | **HIGH** | The daily-puzzle wave (Phase 1) is not a fad, it is a scheduling fit. Web games compete with short-form video (S3) for the same 5-minute gap. A game that fits that gap and gives you a thing to post wins the gap. |
| **Hybrid monetization becomes the default, not an upgrade.** Rewarded ads + light IAP + cosmetics, designed in from day one. | **HIGH** | S4 is unambiguous and the trend has 2+ years of momentum. Assume by 2028 a web game launching ad-only is launching with one leg. |
| **Meta-progression / run-based structure spreads into every genre.** Roguelite scaffolding on top of narrative, survival, puzzle, sim. | **HIGH** | Already visible in 2026 indie (Phase 1). It solves the content-cost problem that a solo dev cannot solve any other way: replayability per authored asset. |
| **Social-by-default beats solo-by-default.** Even single-player games ship async social hooks — shared seeds, leaderboards, ghost runs, "here's my ending". | **HIGH** | S3, directly. Also the only free user acquisition a $0 dev has. |
| **Real 3D in the browser becomes ordinary.** By ~2028 a WebGPU 3D game on a mid-tier phone browser stops being a novelty. | **MEDIUM-HIGH** | S1 is the strongest technical signal on this list — Safari shipping it is what actually unlocked mobile. Caveat: *capability* arriving does not mean *audience* follows. Portals still monetize 2D puzzle better. |
| **Human authorship becomes a marketing asset.** "Hand-written", "hand-drawn", "made by one person" moves from humblebrag to differentiator. | **MEDIUM-HIGH** | S2. When a third of the market is disclosed-AI and 85% of players are hostile, scarcity flips to the human side. Expect storefront curation to keep tightening. |
| **AI stays in the pipeline but goes quiet and heavily edited.** Used for iteration, base layers, variants — then painted over. Disclosure normalizes. | **HIGH** | S2 again. The backlash targets *visible, unedited, generic* output — "slop" — not tool use. The winning posture is AI-assisted, human-finished, honestly labeled. |
| **The web becomes the safest distribution ground for solo devs.** Portals + your own PWA, not app stores. | **MEDIUM-HIGH** | S5: store rules changed three times in two years and are still moving. A URL doesn't get delisted, doesn't pay 30%, and doesn't need review. |
| **Creation/UGC layers keep growing** (level editors, shareable seeds, custom decks). | **MEDIUM** | S3 (38% prefer building; Roblox 26%→51%). Strong signal, but a full UGC pipeline is out of scope for a solo dev — the *shareable seed* is the cheap version of this. |
| **Co-op PvE grows faster than small-dev PvP.** | **MEDIUM** | Phase 1 showed cheating is the top complaint in browser PvP, and anti-cheat is a permanent server-cost tax. PvE removes the incentive to cheat. Social demand (S3) is satisfied either way. |

---

### 2.3 Predicted DECLINE (2026 → 2031)

| Prediction | Confidence | Reasoning from signals |
|---|---|---|
| **Pure ad-only monetization.** Not "fewer ads" — the *model* as a standalone business. | **HIGH** | S4. Already broken in 2026; five years of CPI pressure will not un-break it. |
| **Undifferentiated AI-generated content.** Generic-looking games get review-bombed, curated down, and buried. | **HIGH** | S2. Storefront pressure plus 85% negative sentiment is a compounding penalty, not a one-off news cycle. |
| **Mid-core mobile as a solo-dev target.** | **HIGH** | S4: −7% and falling, and it is the most expensive segment to build for. It was never a $0 target; by 2031 it will be even less so. |
| **Copycat battle royale in mature Western markets.** | **MEDIUM** | Phase 1 saturation/fatigue. Still growing in SEA/LatAm, so this is a regional decline, not a global one. |
| **Games with no reason to return tomorrow.** One-and-done single sessions, no meta, no daily hook. | **MEDIUM-HIGH** | Portals pay on retention and session count. Attention competition (S3) punishes anything you finish once and close. |
| **Heavy-install experiences aimed at casual players.** Anything asking for a big download before first play. | **MEDIUM** | Instant-play is the browser's structural advantage and it is widening, not narrowing. |
| **iOS PWA as a primary distribution plan — in the EU specifically.** | **MEDIUM** | S5: Apple removed standalone PWA support in the EU; no push there. Plan the PWA as a *bonus surface*, never as the main channel. |
| **WebGL-1-era 2D-only tech stacks (as a competitive edge).** They'll still work fine; they just stop being a differentiator. | **LOW-MEDIUM** | S1. "Still works" ≠ "still impressive". Low confidence because portal audiences have never rewarded fidelity much. |

---

### 2.4 What this means for your three ideas

| Idea | 5-year tailwinds | 5-year headwinds | Net |
|---|---|---|---|
| **1. Text adventure RPG** | Short sessions ✔ · run-based meta ✔ · human-written voice becomes a *selling point* (S2) ✔ · trivially cheap on any device ✔ · shareable run results ✔ | Text is the format most obviously fakeable by AI — you'd be swimming against S2 unless the writing is visibly yours. Needs a daily hook bolted on to survive the retention economy. | **Strongest tailwind-to-cost ratio of the three.** |
| **2. Open-world zombie survival** | Survival/strategy is the #1 revenue loop and still growing ✔ · WebGPU makes richer 3D plausible by ~2028 (S1) ✔ · story-survival is genuinely under-served on web ✔ | "Open world" fights mobile thermal/memory budgets for five more years — capability grows, but so does everyone's expectation. Highest scope risk on the list. | **Great genre, wrong size.** Zone-based, run-based version rides every tailwind at a fraction of the cost. |
| **3. Co-op zombie FPS** | Co-op PvE dodges the cheating tax ✔ · social-first demand (S3) ✔ · WebGPU 3D normalizes (S1) ✔ | Free-tier hosting does not scale with success — the *better it does, the more it costs you*, with no IAP available on day one (Phase 1). Real-time netcode is the hardest thing a solo dev can attempt. | **Best 5-year concept, worst $0 fit.** This is a year-two project funded by year-one revenue. |

---

### 2.5 The three bets I'd make if forced

1. **Retention beats spectacle, for the entire five years.** Every platform in Phase 1 pays on return visits. Design the reason-to-come-back before the graphics.
2. **Be visibly human.** By 2029 that is a marketing position, not a virtue signal. Use AI to build; make sure the result doesn't look like AI built it.
3. **Own a URL.** Portals for discovery and ad revenue, your own PWA on GitHub Pages as the home an engaged player can bookmark. Store rules will keep moving (S5); your domain won't.

---

### Phase 2 sources

- [VR.org — WebGPU Hit Baseline in Every Major Browser](https://vr.org/articles/webgpu-baseline-2026-three-js-webxr-default)
- [webgpu.com — WebGPU Hits Critical Mass: All Major Browsers Now Ship It](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/)
- [byteiota — WebGPU 2026: 70% Browser Support](https://byteiota.com/webgpu-2026-70-browser-support-15x-performance-gains/)
- [Utsubo — Frontier Web APIs 2026: What's Production-Ready](https://www.utsubo.com/blog/frontier-web-apis-2026-production-ready)
- [TechBuzz — AI in Game Development: Why the 2026 Backlash Is Real](https://www.techbuzz.ai/articles/ai-in-game-development-why-the-2026-backlash-is-real)
- [StraySpark — Steam's 2026 AI Disclosure Rules for Indie Developers](https://www.strayspark.studio/blog/steam-ai-disclosure-rules-2026-indie-developer-guide)
- [SoonLab — Can AI Games Survive on Steam? 2026 Guide to Avoid Slop](https://www.soonlab.ai/blog/steam-ai-games/)
- [Nasty Rodent — AI in Game Development: What the 2026 Data Actually Shows](https://nastyrodent.com/ai-in-game-development/)
- [SQ Magazine — Gen Alpha Social Media Statistics 2026](https://sqmagazine.co.uk/gen-alpha-social-media-statistics/)
- [SQ Magazine — Where Gen Z Actually Plays Video Games](https://sqmagazine.co.uk/gen-z-gaming-platform-preferences-statistics/)
- [Udonis — Gaming Trends 2026](https://www.blog.udonis.co/mobile-marketing/mobile-games/gaming-trends)
- [Apple Developer — Changes for apps in the European Union (DMA)](https://developer.apple.com/support/dma-and-apps-in-the-eu/)
- [Apple — DMA Compliance Report, March 2026 (PDF)](https://www.apple.com/legal/dma/NCS-March-2026.pdf)
- [MagicBell — PWA iOS Limitations and Safari Support 2026](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide)
- [MobiLoud — Publishing a PWA to the App Store, 2026](https://www.mobiloud.com/blog/publishing-pwa-app-store/)
- [RevenueCat — Apple's EU update: CTF's 2026 sunset](https://www.revenuecat.com/blog/growth/apple-eu-dma-update-june-2025)
