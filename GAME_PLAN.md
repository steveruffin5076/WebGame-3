# GAME_PLAN.md

Working document for the browser game project.
Research date: **2026-09-09**. Phases follow `Start_Plan.md`.

Status:
- [x] Phase 1 — Market research
- [x] Phase 2 — 5-year prediction
- [x] Phase 3 — Director interview
- [x] Phase 4 — Popularity analysis of chosen game
- [x] Phase 5 — Tools comparison
- [x] Phase 6 — Visual & animation direction

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

---

## PHASE 3 — DIRECTOR INTERVIEW (answers locked)

Interviewed 2026-09-09. These are decisions, not suggestions. Phases 4–6 are built on them.

| # | Topic | Decision |
|---|---|---|
| 1 | **Game to build first** | **Idea 1 — Text adventure RPG** with pixel-art event illustrations, choices, combat, multiple endings, score ranking |
| 2a | **Target audience** | **Adults 18–34, mid-core readers.** People who actually read: tolerate long text blocks, want stat builds and real consequences, replay for different endings |
| 2b | **Region** | **US / English-first.** Highest rewarded-video eCPM (~$15–28). No localization cost at launch |
| 3 | **Session length** | **8–15 minutes per run.** One adventure = one sitting, start to death or ending. Roguelite: die → unlock → run again. 2–3 runs stack to a 30-min session |
| 4 | **Art direction** | **Moody Pixel Art.** Low-res, high-contrast, tight palette, heavy blacks, single accent colour for danger. Darkest Dungeon's mood at Dead Cells' resolution |
| 5 | **Story tone** | **Grim but warm.** Genuinely dangerous world, permanent death, but NPCs you regret losing, small kindnesses that land, dry humour under pressure |
| 6 | **First shippable** | **Vertical slice.** One biome, ~40–60 events, one enemy tier, 2 endings, 3 classes, full run loop end to end. Target ~2–4 weeks |
| 7 | **Attitude to cutting scope** | **Protect the feature list, flex the date.** Features are not sacrificed to hit a calendar |

### 3.1 One tension, resolved

Answers 6 and 7 pull against each other: a 2–4 week target *and* a refusal to cut features. Resolving it explicitly so it doesn't cause an argument later:

> **The vertical slice's feature list is FIXED. Its date is a TARGET, not a commitment.**
>
> The seven items in row 6 are the definition of done. If week 4 arrives and combat isn't right, the date moves — I do not ship a slice with combat cut out. But I also do not add anything to that list mid-build. Anything new goes on a post-slice backlog.

That keeps answer 7's guarantee (features protected) without letting scope creep eat the deadline from the other side. Since you are the tester, a slipped date costs you a week; a hollow slice costs you the ability to judge whether the game is fun at all.

### 3.2 What these answers do to the design

Each decision has a downstream consequence worth naming before Phase 4 scores the concept.

| Decision | Consequence I now have to design around |
|---|---|
| Mid-core readers, 18–34 | Text can be long (200–400 words/screen). No dumbing down. But it *must* be good — this audience notices generic prose immediately, which is exactly the Phase 2 AI-backlash risk |
| US-first, English-only | No i18n layer in v1. Copy can use idiom and voice freely. Revisit localization only after a revenue baseline exists |
| 8–15 min runs, permadeath | Needs meta-progression from day one, or death feels like pure loss. Also gives a clean, honest rewarded-ad slot **between** runs — never mid-run. This directly fixes Life in Adventure's #3 complaint (inescapable ads) |
| Roguelite structure | Content must be *combinatorial*, not linear. Events need tags, prerequisites and weights so 50 events produce hundreds of distinct run shapes. This is the answer to complaint #1 (repetition) |
| Moody Pixel Art | Low resolution is deliberate cover: AI-generated bases get downsampled and hand-fixed, which reads as intentional rather than as slop. Locks the palette work in Phase 6 |
| Grim but warm | The warmth is the moat. Phase 2 predicted "visibly human" becomes a marketing position by ~2029 — dry humour and genuine NPC attachment are the parts hardest to fake |
| Vertical slice first | Architecture must support content scaling from day one: events as data files, not hardcoded. Adding event #400 must cost the same as event #40 |

### 3.3 Explicit non-goals for v1

Stated now so they never quietly creep in:

- ❌ No multiplayer of any kind
- ❌ No server, no accounts, no cloud saves (local storage only)
- ❌ No localization
- ❌ No user-generated content or level editor
- ❌ No IAP (CrazyGames IAP is invite-only — it must be earned with ad performance first, per Phase 1)
- ❌ No 3D, no WebGPU — this game does not need either

---

## PHASE 4 — POPULARITY ANALYSIS OF THE CHOSEN GAME

**Concept under analysis:** run-based text adventure RPG, moody pixel art, grim-but-warm tone, 8–15 min permadeath runs, adults 18–34, US/English, browser (PC + mobile), $0 budget.

> **A warning about the market-size numbers.** Searches for "interactive fiction market size"
> return report-mill sites quoting **$6.4B (2025) → $14.8B (2034), 9.8% CAGR** for interactive
> fiction, while a *different* mill quotes **$329M by 2031** for text adventure games. Those two
> figures are irreconcilable — they differ by a factor of ~20. I am not scoring on either.
> **[soft — report-mill, treat as noise]** The scoring below uses only the platform, portal and
> player-behaviour data from Phases 1–2, which is verifiable.

### 4.1 Score TODAY (against Phase 1 data)

Scored 1–10, weighted. This is a scoring judgement, not a measurement.

| Axis | Weight | Score | Reasoning from Phase 1 |
|---|---:|---:|---|
| **Portal / platform fit** | 20% | **4** | The weakest link. Poki and CrazyGames inventory is match-3, arcade, puzzle, `.io`. Text games are not what those portals index on or promote. *A Dark Room* proves a text game CAN break out in a browser, but it is the exception cited, not the pattern **[soft]** |
| **Addressable audience** | 15% | **5** | Mid-core 18–34 readers are real and they pay, but on browser portals they are a minority of traffic. Coolmath/Poki skew younger and more casual |
| **Competitive gap** | 15% | **9** | Strongest axis. Your closest competitor (*Life in Adventure*) is a **mobile app, not a browser game**. The browser text-RPG slot is close to empty. Fallen London occupies the deep end (4.5M words, long-term engagement), nobody occupies the 10-minute end **[data]** |
| **Differentiation defensibility** | 10% | **6** | Hand-written grim-but-warm prose is a real moat, but in 2026 it is not yet a *selling point* — it's just quality |
| **Build cost fit at $0** | 15% | **9** | Text + small sprites = no engine licence, no server, no 3D, trivial hosting. Among the cheapest buildable genres |
| **Monetization fit** | 15% | **6** | Rewarded video between runs is the top-paying format ($15–28 eCPM US) and permadeath gives a natural, non-abusive slot. But Poki has **no publisher IAP at all**, and CrazyGames IAP is **invite-only** — you are ads-only for a while **[data]** |
| **Discoverability / shareability** | 10% | **3** | The other weak link. A text game does not screenshot, does not GIF, and does not survive a 3-second portal thumbnail or a TikTok clip — and TikTok/YouTube are now the search engines for this audience **[data]** |
| | | | |
| **WEIGHTED TODAY SCORE** | | **6.1 / 10** | *Cheap to build, wide-open gap, hard to get seen.* |

### 4.2 Score over the NEXT 5 YEARS (against Phase 2 predictions)

| Axis | Weight | Score | Reasoning from Phase 2 |
|---|---:|---:|---|
| **Portal / platform fit** | 20% | **5** | ▲ slightly. Portals keep paying on retention, and run-based games retain. But WebGPU normalizing 3D (S1) means the *visual* bar on portals rises — text stands further apart, for better and worse |
| **Addressable audience** | 15% | **6** | ▲ Short-session, daily-habit play was my HIGH-confidence growth call. An 8–15 min run fits the gap that short-form video is training people to have |
| **Competitive gap** | 15% | **7** | ▼ from 9. Gaps close. Cheap AI-assisted text games are exactly what a third of the market is now shipping (S2) — expect the slot to get crowded, though mostly with slop |
| **Differentiation defensibility** | 10% | **9** | ▲▲ Biggest mover. "Visibly human" was a MEDIUM-HIGH growth call: 85% of players hostile to AI, developer sentiment 30%→52% negative in one year. By ~2029 hand-written is a *marketing position*, not just quality **[data]** |
| **Build cost fit at $0** | 15% | **9** | ▬ Unchanged. Text stays cheap forever |
| **Monetization fit** | 15% | **7** | ▲ Hybrid (ads + light IAP) becomes the default (HIGH confidence, S4). Once ad performance earns CrazyGames IAP access, cosmetic/content purchases open up. Useful reference: **Fallen London earns only ~30–35% of revenue from action refreshes** — i.e. even a famous energy-gated text game makes most of its money elsewhere. Don't build the game around an energy meter **[data]** |
| **Discoverability / shareability** | 10% | **4** | ▲ marginally, and only if you *design for it*. Social-by-default was a HIGH-confidence call (Gen Z 33% more likely to play for social reasons) — but text does not go viral by accident |
| | | | |
| **WEIGHTED 5-YEAR SCORE** | | **6.7 / 10** | *Improves with age, mainly because the AI backlash turns your weakness into your brand.* |

**Reading the two scores:** 6.1 → 6.7 is a concept whose fundamentals get *better* over time while its distribution problem stays. Both scores are dragged down by the same two axes — **portal fit (20%)** and **discoverability (10%)**. Fix those two and the same game scores ~7.6 today. That is what the next section is for.

### 4.3 Three design changes that would raise the odds

These are targeted at the two weak axes. Ranked by impact per unit of work.

#### Change 1 — Add a **Daily Delve**: one seeded run per day, global leaderboard
Every player gets the **same seed** for 24 hours. Same events, same enemies, same loot rolls — so scores are directly comparable. Resets at midnight. Separate from the freeplay mode.

- **Fixes:** discoverability (3→6) *and* portal fit (4→6). Portals rank on retention and return visits; a daily reset is the single strongest return hook known to browser gaming.
- **Why it works:** Phase 1 showed daily puzzles (Wordle, Connections, Mini, Strands) make up an enormous slice of casual browser play. That is a *format*, not a genre — you can borrow it. Phase 2 rated short-session daily-habit games HIGH confidence for growth.
- **Cost:** low. Seeded RNG plus a score table. No server needed at first — local leaderboard v1, hosted later.
- **Bonus:** solves the ad slot cleanly. One rewarded video for a single "second chance" per daily run, and that's it.

#### Change 2 — Make the game **legible in three seconds**
Text games die in thumbnails. Fix it at the presentation layer, not the writing layer: a persistent framed illustration panel above the prose, an animated character portrait that reacts (damage flash, wound overlays, torch flicker), visible HP/stat bars, and combat that *animates* rather than printing a result line.

- **Fixes:** discoverability (3→6), portal fit (4→6).
- **Why it works:** *Life in Adventure*'s reviews specifically praised its little animated combat sequence and HUD **[soft]**. That is the proven trick — it is what makes a text game read as a *game*. Meanwhile TikTok/YouTube are the discovery engines for your audience (Phase 2, S3); you need 3 seconds of motion that says "RPG".
- **Cost:** medium. This is the main art and animation cost of the project, and it is worth it.

#### Change 3 — End every run with a shareable **epitaph card**
On death or ending, generate a single image: your character portrait, name, class, cause of death, final score, rank, and 3 run stats ("41 choices made · 2 companions lost · died to a wolf, 8 minutes in"). One-tap copy/download/share.

- **Fixes:** shareability directly; it is your only free user-acquisition channel.
- **Why it works:** Phase 2 rated social-by-default HIGH confidence. This is the cheapest possible version of a social hook — no accounts, no server, no multiplayer (all v1 non-goals stay intact). It turns your *ending* into your *advertisement*, and it pairs perfectly with the Daily Delve (comparable scores → people post them).
- **Cost:** low. Canvas render to PNG.

> Changes 1 and 3 are designed to compound: a daily seeded run makes scores comparable, and an epitaph card makes them postable. Neither works nearly as well alone.

### 4.4 Biggest risks

Ordered by expected damage.

| # | Risk | Severity | Honest assessment | Mitigation |
|---|---|---|---|---|
| 1 | **Portals may simply not feature it** | 🔴 High | This is the one that kills the project quietly. Poki and CrazyGames curate, and a text game is off-pattern for them. You could build something good and get no traffic | Do not bet on one channel. Ship to **itch.io** (the indie discovery layer) + your **own PWA on GitHub Pages** + submit to CrazyGames. Treat portal acceptance as upside, not as the plan |
| 2 | **Repetition — the exact thing that sank the competitor** | 🔴 High | *Life in Adventure*'s #1 complaint is that re-runs surface the same encounters fast. A roguelite makes this risk **worse**, not better, because replay is the whole point | Events must be data with **tags, prerequisites and weights**, never hardcoded sequences. Target: 50 events → hundreds of distinct run shapes. This is an architecture decision made in week 1, not a fix applied later |
| 3 | **Writing volume is the real bottleneck** | 🟠 Med-High | Not code. The slice needs 40–60 events; a full game needs 300–500. At mid-core length (200–400 words each) that is 60,000–200,000 words. That is a novel | Write in event *families* that share structure; build the content tooling before the content. Accept that content ships continuously post-launch |
| 4 | **AI-writing perception** | 🟠 Med-High | Text is the most fakeable medium there is, and 85% of players are hostile to AI content **[data]**. If the prose reads generic, that sentiment lands on you regardless of process | You are the director and editor — every event gets read and revised by you. Disclose honestly. The grim-but-warm tone is chosen precisely because warmth is the hardest thing to fake |
| 5 | **Revenue ceiling is low for a long time** | 🟠 Medium | Poki: no IAP. CrazyGames: IAP invite-only, must be earned with ad performance first **[data]**. Realistically you are on rewarded video alone for months | Design the rewarded slot honestly from day one (between runs, opt-in, never mid-prose) so ad performance is *good*, which is what unlocks IAP later. A $300–800 non-exclusive licence is a realistic interim outcome |
| 6 | **Market saturation** | 🟡 Low-Med | Low today — the browser text-RPG slot is close to empty. Rising, as cheap AI-assisted narrative games flood in | Your defence is quality and the daily hook, not being first |
| 7 | **Mobile performance** | 🟢 Very Low | Text plus a handful of low-res sprites. This is the least demanding thing you could possibly build. Phase 1's mobile-thermal warnings apply to 3D open worlds, not to this | None needed. Genuinely a non-issue |

**Note on the risk profile:** every high risk here is a *design or distribution* risk. There is no technical risk worth naming. That is exactly the right shape for a director-plus-AI-coder team — the risks land in your area of judgement, not in mine.

### 4.5 Final verdict

> ## ✅ BUILD — WITH MODIFICATIONS
>
> **Build the game as scoped in Phase 3, plus the three changes in 4.3 folded into the vertical slice, not deferred.**

**Why build:**
- Cheapest genre on your list to produce, with the widest open competitive gap (browser text RPG is close to unoccupied).
- The competitor's four loudest complaints — repetition, vague choices, ad abuse, weak main quest — are all fixable with **writing and restraint**, which is the one resource you have infinitely and for free.
- Score improves over five years (6.1 → 6.7) because the AI backlash converts hand-written prose from "quality" into "brand".
- Zero technical risk. Zero hosting cost. Runs on any phone.

**Why with modifications, not as-is:**
- As-is, this concept scores **6.1** and its two weakest axes are both about *being seen*, not about *being good*. A well-written game nobody finds is a failed project.
- The Daily Delve, the 3-second legibility pass, and the epitaph card address both weak axes for a modest amount of work. With them the same concept scores roughly **7.6 today**.

**What would change the verdict to "reconsider":** if you were planning to depend on Poki or CrazyGames acceptance as your primary distribution. You are not — itch.io plus your own PWA is the base case, portals are upside.

**Revised vertical slice definition** (adds to Phase 3, row 6 — this is the only addition, and per your Phase 3 answer the list is now closed):

| Slice contents | |
|---|---|
| One biome | ~40–60 tagged, weighted events |
| One enemy tier | 3 character classes |
| 2 endings | Full run loop, permadeath, meta-progression stub |
| **+ Daily Delve mode** | seeded run, local leaderboard |
| **+ Framed illustration panel** | animated portrait, HP/stat bars, animated combat |
| **+ Epitaph card** | canvas-rendered PNG, one-tap share |
| Rewarded ad slot | between runs only, opt-in |

---

### Phase 4 sources

- [FRVR — The Best Browser Games to Play in 2026](https://frvr.com/blog/guides/best-browser-games/) (Fallen London, A Dark Room as browser text-game reference points)
- [Failbetter Games — Why is Fallen London still free-to-play?](https://www.failbettergames.com/news/why-is-fallen-london-still-free-to-play) (~30–35% of revenue from action refreshes)
- [Failbetter Games — Fallen London](https://www.failbettergames.com/games/fallen-london) (4.5M words, browser-playable)
- [Impulse Media Hub — Web-Native Game Distribution in 2026](https://www.impulsemediahub.com/blog/web-native-games-rising/) (portal→PWA hybrid, daily rewards and save-state continuity as retention levers)
- [Cinevva — CrazyGames Developer Guide (2026)](https://app.cinevva.com/guides/publish-game-crazygames) (60% ad / 70% IAP split, invite-only IAP)
- Phase 1 and Phase 2 sources above (portal rankings, eCPM rates, AI-sentiment data, demographic data)
- ⚠️ Deliberately **not** used for scoring: [Growth Market Reports — Interactive Fiction Market](https://growthmarketreports.com/report/interactive-fiction-market) and [openPR — Text Adventure Games Market](https://www.openpr.com/news/4425020/text-adventure-games-market-set-for-robust-growth-targeting) — mutually contradictory report-mill figures, listed only for transparency

---

## PHASE 5 — COMPLETE TOOLS COMPARISON

**What we are building for:** a text-heavy run-based RPG. Roughly **90% of the screen is prose, choice buttons and stat readouts**; ~10% is a pixel-art illustration panel with a reacting portrait and animated combat. PC + mobile browser. Static hosting. $0.

> **How to read the "AI-reliability" column.** The brief asked me to weight learning curve by how well AI assistants handle each framework. That column is **my honest self-assessment of how reliably I can generate correct code**, and the dominant factor is *how much of the training corpus covers the current major version*. A framework that shipped a breaking major release four months ago is a real hazard: I will confidently write last-version APIs. This is judgement, not measurement — but it is the single most under-rated factor in your stack choice, because I am the one typing.

Ratings: ★★★★★ = best, ★☆☆☆☆ = worst.

---

### 5.1 Rendering / game-engine layer

| Option | Current version (2026) | Free hosting | AI-reliability for me | Learning curve for YOU | Mobile browser perf | Docs / community | AI asset pipeline | Fit for THIS game |
|---|---|---|---|---|---|---|---|---|
| **Phaser 4** | v4.1 "Salusa", 30 Apr 2026 **[data]** | ★★★★★ static | ★★☆☆☆ **v4 is ~4 months old.** My training is dominated by **Phaser 3**, so I will drift into v3 APIs. Real, recurring bug source | ★★☆☆☆ | ★★★★★ Best Safari performance of the frameworks benchmarked **[soft]** | ★★★★★ Largest 2D web-game community | ★★★★★ Sprite sheets, atlases, Tiled | ⚠️ **Overkill and wrong-shaped.** Renders text to canvas — you lose text selection, native scrolling, accessibility and crisp mobile font rendering. That is the *majority* of your game |
| **PixiJS v8** | v8.7+, WebGPU-first; ~⅓ Phaser's bundle **[data]** | ★★★★★ static | ★★★★☆ v8 well-established | ★★★☆☆ | ★★★★★ Fastest raw 2D renderer available | ★★★★☆ | ★★★★★ Excellent sprite-sheet handling | ✅ **Good as a small canvas island** for combat FX only. It is a renderer, not an engine — no state, no scenes |
| **Kaplay** | 4000.0.0-alpha.16 **[data]** | ★★★★★ static | ★☆☆☆☆ **Alpha, plus a rename from Kaboom.js.** Worst possible training-data situation | ★★★☆☆ pleasant API | ★★★☆☆ | ★★☆☆☆ | ★★★★☆ | ❌ Avoid. Alpha software for a project you need to maintain for months |
| **Excalibur.js** | stable, TypeScript-native | ★★★★★ static | ★★★☆☆ Smaller corpus | ★★★☆☆ | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ➖ Fine engine, no advantage here. Same text-on-canvas problem as Phaser |
| **Plain Canvas 2D API** | browser built-in | ★★★★★ static | ★★★★★ Universal, stable for a decade | ★★☆☆☆ | ★★★★★ Zero overhead | ★★★★★ MDN | ★★★★☆ Manual | ✅ **Yes — for the epitaph card export.** Draw once, `toDataURL()`, done |
| **Three.js** | stable, WebGPU renderer shipping | ★★★★★ static | ★★★★☆ | ★☆☆☆☆ | ★★★☆☆ | ★★★★★ | ★★★☆☆ 3D models | ❌ 3D is an explicit v1 non-goal |
| **Babylon.js** | stable | ★★★★★ static | ★★★★☆ | ★☆☆☆☆ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ | ❌ Same |
| **PlayCanvas** | stable, editor-based | ★★★★☆ (self-host export) | ★★★☆☆ | ★★☆☆☆ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ❌ Same, plus editor lock-in |

**Conclusion for this layer:** *no game engine.* A text RPG's core is a state machine and a lot of DOM text. Putting that in a canvas engine costs you accessibility, text selection, mobile font quality and native scrolling — and buys you nothing you need.

---

### 5.2 UI / application layer (where this game actually lives)

| Option | Current version (2026) | Runtime size | Free hosting | AI-reliability for me | Learning curve for YOU | Mobile perf | Docs / community | Fit |
|---|---|---|---|---|---|---|---|---|
| **Svelte 5** | 5.55.10 **[data]** | **2–5 KB gzip** **[data]** | ★★★★★ | ★★★★☆ Runes (`$state`, `$derived`) are newer syntax; I occasionally slip into Svelte 4 patterns. **Mitigable** by pinning the version and reviewing | ★★★★★ **`.svelte` files read like an HTML file with a script tag.** You can open one and understand it | ★★★★★ Compiled, no virtual DOM | ★★★★☆ | ✅ **Recommended** |
| **React 19** | 19.2.6 **[data]** | **~42 KB gzip** **[data]** | ★★★★★ | ★★★★★ **Best of any framework** — largest training corpus by far | ★★☆☆☆ JSX + hooks + effect rules are genuinely hard to read for a non-programmer | ★★★★☆ | ★★★★★ Largest ecosystem | ➖ **The safe runner-up.** Pick this if AI-reliability matters more to you than readability |
| **Vue 3** | stable | ~16 KB gzip | ★★★★★ | ★★★★☆ | ★★★★☆ SFCs are readable | ★★★★☆ | ★★★★☆ | ➖ Fine. No decisive advantage |
| **Plain TypeScript + DOM** | — | **0 KB** | ★★★★★ | ★★★★★ | ★★★☆☆ Readable, but there is more of it | ★★★★★ | ★★★★★ | ➖ Zero framework risk, but I hand-roll reactivity — more bespoke code to maintain over months |
| **Angular** | stable | large | ★★★★★ | ★★★★☆ | ★☆☆☆☆ | ★★★☆☆ | ★★★★☆ | ❌ Enterprise weight, wrong tool |

**The real tradeoff, stated plainly:** React is the version I write most reliably; Svelte is the version *you* can read. The bundle difference (~40 KB) is irrelevant — CrazyGames permits a **50 MB initial download** **[data]**, so we are three orders of magnitude under either way. **I recommend Svelte because your ability to open a file and understand it is worth more than my marginal error rate, which is correctable by review.**

---

### 5.3 Multiplayer / backend (not needed for v1 — recorded for completeness)

v1 non-goals include no server and no accounts. This matters only if the Daily Delve leaderboard goes from local to global.

| Option | What it's for | Free tier reality | Verdict |
|---|---|---|---|
| **localStorage** | v1 saves + local daily leaderboard | Free forever, no server | ✅ **v1** |
| **Cloudflare Workers + D1/KV** | Hosted daily leaderboard, score submission | Generous free tier, **no cold starts**, edge-deployed | ✅ **Best v2 upgrade path** |
| **Supabase** | Leaderboard + optional accounts | Free tier, Postgres, pauses when idle | ➖ Viable, heavier than needed |
| **Render / Fly.io free tier** | General app server | **Cold starts** on free tier — a leaderboard that takes 30s to wake is worse than no leaderboard | ➖ Named in your brief, but Workers beat it for this job |
| **Colyseus** | Authoritative real-time multiplayer rooms | Needs an always-on server | ❌ Real-time; irrelevant here |
| **Socket.io** | WebSocket transport | Needs a server | ❌ Same |
| **PartyKit** | Edge real-time collaboration | Free tier | ❌ Same |

---

### 5.4 Supporting tools

| Tool | Job | Why |
|---|---|---|
| **TypeScript** | Language | You already know basics. Catches content-schema errors at build time |
| **Vite** | Build + dev server | Standard in 2026 across React/Vue/Svelte stacks **[data]**. Instant HMR, static output |
| **Zod** | Validate event JSON at load | With 300–500 hand-written events, a typo in one file must fail loudly, not silently produce a broken run |
| **Vitest** | Test the run engine | **Critical:** Daily Delve requires a *deterministic seeded RNG*. Same seed must produce an identical run, on every device, forever. That needs tests |
| **`mulberry32` / `xoshiro128**`** | Seeded PRNG | ⚠️ **Never `Math.random()`** — it cannot be seeded, which breaks the Daily Delve entirely |
| **GitHub Actions** | Deploy to Pages on push | Free, already where your code lives |
| **CrazyGames HTML5 v2 SDK** | Rewarded + midgame ads | `CrazySDK.ad.requestAd()` with `adError` / `adStarted` / `adFinished` callbacks. **Only SDK-requested ads are permitted** **[data]** |
| **Poki SDK** | Alternative portal | Uses `commercialBreak` / `rewardedBreak` — conceptually identical to CrazyGames **[data]**, so a thin adapter lets us support both |
| **CSS + Web Animations API** | UI motion, sprite-sheet frames via `steps()` | Free, native, GPU-accelerated, zero bundle |
| **GSAP** | Optional tweening | Only if CSS proves insufficient. ⚠️ Verify current licence terms before shipping — do not assume |

**Platform constraints to build against** (CrazyGames, **[data]**):

| Constraint | Limit | Our expected size |
|---|---|---|
| Initial download | ≤ 50 MB | ~1–3 MB |
| Total build (with SDK) | ≤ 250 MB (≤50 MB without SDK) | ~2–5 MB |
| File count | ≤ 1,500 files | ~100–300 |
| Midgame ad frequency | max 1 per 3 min, auto-managed | We use **rewarded only**, between runs |

We are nowhere near any ceiling. That is a luxury this genre gives you.

---

### 5.5 ✅ THE RECOMMENDED STACK

| Layer | Choice |
|---|---|
| **Language** | TypeScript |
| **Build** | Vite |
| **UI / app framework** | **Svelte 5** (pinned) |
| **Text, choices, HUD** | **DOM + CSS** — not canvas |
| **Illustration panel & combat FX** | **CSS sprite sheets + Web Animations API first.** PixiJS v8 held in reserve, added only if combat demands real particle work |
| **Epitaph card export** | Plain **Canvas 2D** → PNG |
| **Content** | JSON event files, validated with **Zod** |
| **Save / leaderboard (v1)** | **localStorage** |
| **Leaderboard (v2, optional)** | Cloudflare Workers + D1 |
| **Testing** | **Vitest** on the run engine + seeded RNG determinism |
| **Hosting** | **GitHub Pages** via GitHub Actions |
| **Ads** | **CrazyGames HTML5 v2 SDK** behind a thin adapter so Poki can swap in |

#### Justification

1. **The game is a document, not a scene.** 90% of your screen is prose and buttons. DOM does text natively — selection, scrolling, reflow, font scaling, screen readers, browser zoom. Every canvas engine throws all of that away and asks you to rebuild it worse. This is the single most important decision in Phase 5.
2. **Svelte is the framework you can read.** The brief asked me to weight learning curve *for you*. A `.svelte` file is HTML with a script block. When you want to change how a choice button looks, you can find it. That is worth more than any benchmark here.
3. **It costs nothing and hosts anywhere.** Static output → GitHub Pages, itch.io, CrazyGames, or your own PWA, from the same build. Phase 4 said portals are upside, not the plan — this stack keeps every door open simultaneously.
4. **No engine means no engine risk.** Phaser 4 shipped four months ago; Kaplay is in alpha. Both are genuine hazards when an AI is writing the code, because I will reach for last version's API. This stack is built from parts that have been stable for years.
5. **Mobile performance is a non-issue by construction.** No WebGL context, no 3D, no physics, tiny assets. Phase 4 scored mobile risk as "very low" — this stack is why.
6. **It scales with content, not with code.** Events are JSON. Event #400 costs exactly what event #40 cost. That is the direct answer to the repetition risk that sank your competitor.

#### Honest "why not" list

| Rejected | Reason |
|---|---|
| **Phaser 4** | Wrong shape (text in canvas) *and* too new for me to write reliably. Two independent reasons |
| **React 19** | Genuinely close. I write it more reliably than Svelte. Rejected only because you must be able to read the code — reverse that priority and React wins |
| **Kaplay** | Alpha |
| **Three.js / Babylon / PlayCanvas** | 3D, explicit non-goal |
| **Unity / Godot web export** | Multi-MB WASM payloads, slow first load, poor text handling. Fights every advantage this genre has |
| **Colyseus / Socket.io / PartyKit** | Real-time multiplayer, not needed |
| **Render / Fly.io** | Free-tier cold starts make them worse than Cloudflare Workers for the only backend we might ever want |

---

### Phase 5 sources

- [Phaser — Phaser vs Kaplay vs Excalibur (Apr 2026)](https://phaser.io/news/2026/04/phaser-vs-kaplay-vs-excalibur-2d-web-game-framework)
- [phaserjs/phaser — Releases](https://github.com/phaserjs/phaser/releases) (v4.0 "Caladan" 10 Apr 2026; v4.1 "Salusa" 30 Apr 2026)
- [Generalist Programmer — Phaser vs PixiJS (2026)](https://generalistprogrammer.com/comparisons/phaser-vs-pixijs) (PixiJS v8 ~⅓ Phaser's bundle, WebGPU-first)
- [Codersera — Top JavaScript Game Engines & Libraries (2026)](https://codersera.com/blog/top-javascript-game-engines-and-libraries/)
- [Strapi — Svelte vs React in 2026](https://strapi.io/blog/svelte-vs-react-comparison) (Svelte 5.55.10, React 19.2.6; 2–5 KB vs 42 KB gzip)
- [Netguru — Front end technologies 2026](https://www.netguru.com/blog/front-end-technologies) (Vite as the 2026 build standard)
- [CrazyGames Documentation — HTML5 v2 SDK](https://docs.crazygames.com/sdk/html5-v2/intro/)
- [CrazyGames Documentation — Video ads](https://docs.crazygames.com/sdk/video-ads/)
- [CrazyGames Documentation — Advertisement requirements](https://docs.crazygames.com/requirements/ads/)
- [Cinevva — CrazyGames Developer Guide (2026)](https://app.cinevva.com/guides/publish-game-crazygames) (50 MB initial / 250 MB total / 1,500 file limits)

---

## PHASE 6 — VISUAL & ANIMATION DIRECTION

### 6.1 Three art directions, scored against the four criteria

Phase 3 locked **Moody Pixel Art**. This section re-tests that choice properly against the criteria the brief demanded, so the decision is defensible rather than just early.

| Criterion | **A. Moody Pixel Art** *(chosen)* | **B. Flat Vector Noir** | **C. Painted Gouache** |
|---|---|---|---|
| **AI-generation ease** | ★★★★★ Dedicated pixel tools exist (PixelLab is grid-aware for 16/32/64 and keeps clean palettes **[soft]**). Crucially, **low resolution hides generation artifacts** — you downsample and hand-fix, and imperfection reads as style | ★★☆☆☆ **Worst of the three.** AI generators are bad at clean flat vector; you end up tracing or hand-drawing. Cheapest to *render*, most expensive to *make* | ★★★★★ Easiest to generate — diffusion models excel at painterly output |
| **Mobile performance** | ★★★★★ A 160×120 PNG is ~4–8 KB. Integer-scaled, no filtering cost | ★★★★★ SVG scales free; smallest payload of all | ★★★☆☆ Largest files by far. Soft gradients don't compress well; needs WebP/AVIF and careful budgeting |
| **Genre fit (dark fantasy text RPG)** | ★★★★★ The default visual language of the genre. Instantly legible as "dungeon RPG" | ★★★☆☆ Reads modern/boardgame (Reigns, 80 Days). Clean, but fights "grim" | ★★★★★ Most emotionally rich. A single painting can carry a whole event |
| **5-year trend alignment (Phase 2)** | ★★★★☆ Crowded aesthetic, but stable — pixel art has survived every trend cycle. Low-res is also the **safest posture against the AI backlash**: it looks authored | ★★★★☆ Distinctive, ages well, hardest to mistake for AI output | ★★☆☆☆ ⚠️ **This is exactly the look that gets accused of being AI-generated.** With 85% of players hostile to AI content **[data]**, painterly art is the direction that fights Phase 2 head-on |
| **Verdict** | ✅ **Confirmed** | Strong but expensive in your time — the one resource you cannot buy | ❌ Rejected on trend risk, not on quality |

**The decisive argument:** Painted gouache is the *prettiest* option and the *easiest* to generate, and those two facts are the problem. It is the maximum-slop-suspicion direction. Pixel art at low resolution is the only one of the three where AI assistance and authored appearance point the same way.

---

### 6.2 Full specification — Moody Pixel Art

#### 6.2.1 Resolution and sprite sizes

**Rule above all others: integer scaling only.** Author small, display at exactly 2×, 3× or 4×, with `image-rendering: pixelated`. Non-integer scaling turns pixel art to mush and is the single most common way this style gets ruined.

| Asset | Native size | Display scale | Notes |
|---|---|---|---|
| **Event illustration** | **160 × 120** (4:3) | 2× mobile (320×240), 3× desktop (480×360) | The hero asset. One per event family, not one per event |
| **Character portrait** (reacting) | **48 × 48** | 3× (144) / 4× (192) | Needs idle, hurt, low-HP and death states |
| **Enemy sprite** | **64 × 64** | 3× (192) | Idle + attack + hurt + death |
| **Item / status icons** | **16 × 16** | 2× (32) | Inventory, buffs, wounds |
| **UI frame** | 9-slice, **8 px** corner unit | matches panel scale | Border, panels, buttons |
| **Epitaph card** (export) | **800 × 1000** rendered | 1× | Composed at 4× from source sprites; sized for social posting |

#### 6.2.2 Palette approach — 24 colours, hard-enforced

A fixed master palette is what will make 300 separately-generated images look like **one game**. This is not a style preference; it is the thing that holds the project together visually.

**Structure:** 6 ink + 6 cool + 6 warm + 3 accent + 3 UI.

| Group | Hex values |
|---|---|
| **Ink ramp** (shadow, line, void) | `#0b0a0c` `#17151a` `#241f27` `#383040` `#55495c` `#7a6b80` |
| **Cool ramp** (stone, steel, night, fog) | `#1c2430` `#2b3745` `#3d4d5c` `#566a78` `#7a8c96` `#a8b6bb` |
| **Warm ramp** (skin, wood, leather, rope) | `#2a1e18` `#3f2c21` `#5a3f2c` `#7a583c` `#9c7a55` `#c2a179` |
| **Accents** (use sparingly) | `#8f1f2e` blood/danger · `#e0913a` torch/hope · `#5f8f4a` poison/corruption |
| **UI reserved** | `#e8e2d4` primary text · `#b5ad99` muted text · `#d94f4f` critical alert |

**Three palette rules:**

1. **One accent per illustration.** Everything else stays desaturated. This is the entire "moody" formula — it's why Darkest Dungeon reads the way it does. Two accents in one image and the mood collapses.
2. **Backgrounds live in the bottom 30% of the value range.** Darkness is the default; light is an event.
3. **Every generated asset gets quantized to this palette** in Aseprite before it ships. No exceptions. This is the pipeline step that converts "AI images" into "your game".

Contrast: `#e8e2d4` on `#17151a` is a very high ratio, comfortably clearing WCAG AA for body text. The game is dark-theme-only by design, so contrast has to be verified deliberately rather than assumed.

#### 6.2.3 Animation technique

**Sprite sheets driven by CSS, not a JS render loop.** Horizontal strips, animated with `steps()` on `background-position`. This runs on the compositor, costs almost no CPU, and needs no engine — consistent with the Phase 5 stack.

| Animation | Technique | Frames / timing |
|---|---|---|
| Portrait idle (breathing) | CSS `steps()` sprite strip | 4 frames @ 8 fps, looping |
| Portrait hurt | Frame swap + 120 ms red flash overlay | 2 frames |
| Portrait death | Sprite strip, plays once | 6 frames @ 10 fps |
| Enemy attack | `transform: translateX()` lunge + shake keyframes on target | ~250 ms |
| Damage numbers | DOM elements, Web Animations API (rise + fade) | ~600 ms |
| Screen shake | `transform` on the panel container only | 200 ms, 3 px amplitude |
| Torch flicker | CSS animation on a radial-gradient overlay's opacity, irregular 3–4 s loop | Cheapest mood-per-byte in the whole project |
| Text reveal | Character-by-character typewriter, tap to skip to full | ~40 chars/sec |

**Two hard performance rules:**
- **Animate `transform` and `opacity` only.** Never animate `box-shadow`, `filter` or layout properties — they force repaints and will stutter on mid-tier phones.
- **Honour `prefers-reduced-motion`.** Screen shake and the typewriter both become instant. This is an accessibility requirement, not a nicety.

No GSAP needed. It stays optional, and its licence terms get verified before use if we ever reach for it.

#### 6.2.4 UI/UX style for touch + mouse

**The most important call in this section:** *the body text must not be a pixel font.* Pixel fonts are unreadable for 300-word passages on a phone, and your audience is mid-core readers. Pixel type is for headers, numbers and labels **only**.

| Element | Specification |
|---|---|
| **Body text** | Readable serif (e.g. Lora, Bitter) at **17–18 px** minimum, line-height 1.6, max width **65ch** on desktop |
| **Headers / stats / numerals** | Pixel font — this is where the retro identity lives |
| **Choice buttons** | Full-width rows, **min-height 56 px**, **12 px gap** between them so a mis-tap can't select the wrong fate |
| **Touch targets** | **48 × 48 px minimum**, everywhere, no exceptions |
| **Mobile layout** | Illustration panel top → prose scrolls in the middle → choices **bottom-anchored** in the thumb-reach zone |
| **Notch handling** | `env(safe-area-inset-bottom)` padding so the last choice is never under the home indicator |
| **Hover** | Adds affordance on desktop, **never carries information**. Anything hover-only is invisible on a phone |
| **Keyboard** | `1`–`4` select choices, `Space`/`Enter` advance, `Esc` menu |
| **Theme** | Dark only, by design. Contrast ratios verified rather than assumed |

---

### 6.3 AI tools for asset generation

**The workflow that actually ships** — generate, then finish by hand:

> **1.** Generate the first direction with an AI tool → **2.** keep the strongest silhouette and palette, discard the rest → **3.** hand-edit the final frames in a pixel editor → **4.** quantize to the 24-colour master palette → **5.** export clean sprite sheets → **6.** view at true game size before accepting it. **[soft — this is the consensus production stack across 2026 tool round-ups]**

| Tool | What it's for | Cost | Notes |
|---|---|---|---|
| **PixelLab** | Primary generator | Paid tiers | Grid-aware (16/32/64), generates consistent sprite sheets, maintains clean limited palettes. The most complete dedicated pixel tool in 2026 **[soft]** |
| **Sprite AI** | Sprite variants + in-browser animation | Paid tiers | Generate → edit → animate → export without leaving the browser. Has an **Aseprite plugin** so you don't window-switch **[soft]** |
| **ZSky AI** | Free workhorse | **Genuinely free, no ads on any tier** **[soft]** | Best zero-budget starting point. Clean grids, disciplined limited palettes, convincing 8/16-bit character work |
| **LlamaGen PixelBox** | Character → sprite conversion | Freemium | Good for turning a concept into a usable sprite |
| **Aseprite** | **Manual finishing — required** | ~$20 one-off | The industry standard. Palette quantization, sheet export, onion-skinning |
| **LibreSprite** | Free Aseprite fork | Free | Use if the $20 isn't available yet. Fewer features, same core job |

**Free asset libraries (backup and filler):**

| Source | Licence | Use for |
|---|---|---|
| **Kenney** | **All CC0**, 40,000+ assets, no sign-up **[data]** | UI frames, icons, filler. Packs within a style family match each other |
| **itch.io — CC0 + pixel-art tag** | CC0 (verify per pack) | Pixel Frog, Ansimuz, 0x72 release full CC0 packs **[soft]** |
| **OpenGameArt** | ⚠️ **Mixed** — CC0, CC-BY *and GPL* | Deep archive, but **check the licence on every single asset**. GPL assets carry obligations you do not want |

**Disclosure posture (from Phase 2):** with ~⅓ of Steam releases now carrying AI disclosures and 85% of players hostile **[data]**, the winning position is *AI-assisted, human-finished, honestly labelled*. Every asset passes through your hands and the palette filter. If asked, say so plainly. The backlash targets unedited generic output, not tool use.

---

### 6.4 Reference games

| Game | What to study | What **not** to copy |
|---|---|---|
| **Darkest Dungeon** | **The mood target.** Value structure, single-accent discipline, oppressive darkness, and — most relevant to you — a narrator who finds humanity inside grimness. That is your "grim but warm" in practice | Its art is hand-painted at high resolution, not pixel art. Copy the *mood and palette discipline*, not the medium |
| **Dead Cells** | **The resolution and animation target.** Crisp sprites that stay readable at small size, and exceptional animation economy — few frames, maximum readability | It's a fast action platformer. Its *pacing* is irrelevant to you |
| **Fallen London** | **The layout target.** The proven answer to "how do you present a lot of prose in a browser and still feel like a game" — 4.5M words, browser-native, still running **[data]** | Its depth model (huge word count, long-term engagement, action refreshes) is the opposite of your 8–15 minute run. Also note only ~30–35% of its revenue comes from action refreshes — don't copy the energy meter |

*Optional fourth:* **A Dark Room** — proof that a browser text game can break out on almost no art at all. Useful as a floor, not a target.

---

### Phase 6 sources

- [LlamaGen — Best AI Pixel Art Generators in 2026](https://llamagen.ai/articles/best-ai-pixel-art-generators-2026)
- [Sprite-AI — Best pixel art generators 2026, tested for game devs](https://www.sprite-ai.art/blog/best-pixel-art-generators-2026)
- [ZSky AI — Best AI Pixel Art Tools 2026: 8 Tested + Ranked](https://zsky.ai/blog/best-ai-for-pixel-art)
- [TECHSY — 7 Best AI Game Asset Generators (2026, Tested)](https://techsy.io/en/blog/best-ai-game-asset-generators)
- [Cinevva — Best Free 2D Sprites, Pixel Art and Tilesets for Games (2026)](https://app.cinevva.com/guides/free-2d-sprites-tilesets)
- [itch.io — Free game assets tagged CC0 + Pixel Art](https://itch.io/game-assets/free/tag-cc0/tag-pixel-art)
- [Kenney Assets on itch.io](https://kenney-assets.itch.io/pixel-platformer)
- [AssetHoard — 15 Best Free HD Game Asset Sites in 2026](https://assethoard.com/blog/where-to-find-free-game-assets-2026)
- [Failbetter Games — Fallen London](https://www.failbettergames.com/games/fallen-london)

---

# SUMMARY OF DECISIONS & NEXT STEPS

## Decisions made

| Area | Decision |
|---|---|
| **Game** | Run-based text adventure RPG with pixel-art event illustrations, choices, combat, multiple endings, score ranking |
| **Verdict** | **BUILD — with modifications.** Scores 6.1/10 today, 6.7/10 over 5 years; ~7.6 today with the three Phase 4 changes |
| **Audience** | Adults 18–34, mid-core readers, US / English-first |
| **Session** | 8–15 minute permadeath runs; 2–3 stack into a 30-minute sitting |
| **Tone** | Grim but warm — dangerous world, real losses, dry humour, NPCs worth mourning |
| **Art** | Moody Pixel Art: 160×120 illustrations, 24-colour master palette, integer scaling only |
| **Type** | Readable serif for prose (17–18 px); pixel font for headers and numbers only |
| **Animation** | CSS `steps()` sprite sheets + Web Animations API. `transform`/`opacity` only |
| **Stack** | TypeScript · Vite · **Svelte 5** · DOM text · CSS sprite animation · Canvas 2D for card export · JSON events + Zod · localStorage · Vitest · GitHub Pages · CrazyGames SDK behind an adapter |
| **No engine** | Phaser 4 rejected (text-in-canvas + four months old). Kaplay rejected (alpha). No 3D |
| **Three required additions** | **Daily Delve** (seeded daily run + leaderboard) · **3-second visual legibility** (framed panel, reacting portrait, animated combat) · **Epitaph card** (shareable PNG on death) |
| **Monetization** | Rewarded video **between runs only**, opt-in, never mid-prose. Ads-first; CrazyGames IAP must be earned |
| **Distribution** | itch.io + own PWA on GitHub Pages = base case. Portal acceptance = upside, not the plan |
| **First build** | Vertical slice: 1 biome, 40–60 tagged events, 1 enemy tier, 3 classes, 2 endings, full run loop, + the three additions. Feature list **fixed**, date is a **target** |
| **v1 non-goals** | No multiplayer · no server · no accounts · no localization · no UGC · no IAP · no 3D |

## Open risks to watch

1. **Portals may never feature a text game** — mitigated by not depending on them.
2. **Repetition** — the complaint that sank the competitor. Mitigated by combinatorial tagged events, decided in week 1.
3. **Writing volume is the bottleneck** — 60,000–200,000 words for a full game. Not a code problem.
4. **AI-writing perception** — you edit every event; disclose honestly.

## Next steps — awaiting your approval

Per the brief, **no game code has been written and none will be until you approve this plan.**

On approval, the build order is:

1. **Scaffold** — Vite + Svelte 5 + TypeScript, GitHub Pages deploy via Actions. Verify a blank page ships to a live URL first.
2. **Run engine** — seeded PRNG (`mulberry32`), event loader, Zod schema, run state machine. **Vitest proves determinism before any content exists.**
3. **Event schema + 5 sample events** — you read them and judge the voice. **This is your first real go/no-go gate.**
4. **UI shell** — illustration panel, prose area, bottom-anchored choices, HUD. Touch + keyboard.
5. **Combat** — the one system that must feel good, not just work.
6. **Art pipeline** — generate the first 5 illustrations, quantize to the palette, confirm the look at true size on a phone.
7. **Content pass** — scale to 40–60 events.
8. **Daily Delve + epitaph card.**
9. **Ad adapter + portal build.**

**Three things I need from you before step 1:**

- ✅ **Approve or amend this plan.**
- 🎲 **A working title** — needed for the repo, the PWA manifest and the epitaph card.
- ✍️ **A decision on step 3's gate:** how many sample events do you want to read before I scale up content? My recommendation is 5.
