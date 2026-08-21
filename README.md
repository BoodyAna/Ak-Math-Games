# AK Math Games

A modern, data-driven library of interactive math games — created by a Mathematics teacher, built so that **adding a new game never requires touching the website's UI or logic.**

Live user flow: **Home → Grade → Topic → Game → Play → Back to Games**

---

## 1. Tech stack

- React 19 + TypeScript (strict mode)
- Vite
- React Router
- Tailwind CSS
- lucide-react icons

No backend, no database — Version 1 is a fully static site. Games themselves are plain HTML/CSS/JS mini-apps loaded in a sandboxed `<iframe>`.

---

## 2. Install & run

```bash
npm install
npm run dev       # starts the dev server at http://localhost:5173
```

Build for production:

```bash
npm run build      # type-checks and outputs to /dist
npm run preview    # serve the production build locally
```

---

## 3. How the architecture works

The whole platform is driven by **one file**: `src/data/games.ts`. Every page — the home page, `/games`, `/grade/:grade`, `/topic/:slug`, and the game launch page — reads through the `useGames()` hook and derives everything else (grade counts, topic lists, filtered results) at runtime using the helpers in `src/utils/gameUtils.ts`.

```
src/
├── components/     Reusable UI: GameCard, GameGrid, FilterBar, SearchBar, GradeCard,
│                    TopicCard, DifficultyBadge, EmptyState, ErrorState, Navbar, Footer…
├── pages/          One file per route (Home, GamesLibrary, GradePage, TopicPage,
│                    GameLaunch, About, NotFound)
├── layouts/         MainLayout.tsx — Navbar + Footer shell shared by every page
├── data/
│   └── games.ts     ⭐ THE GAME REGISTRY — the only file you edit to publish a game
├── types/
│   └── game.ts       Game, GradeSummary, TopicSummary types
├── hooks/
│   └── useGames.ts    Reads the registry; the one seam to swap in an API later
├── utils/
│   └── gameUtils.ts   Derives grades/topics/filters/search/sort from the registry
└── App.tsx            Routes

public/
└── games/
    ├── addition-race/
    │   ├── index.html
    │   ├── game.js
    │   ├── styles.css
    │   └── thumbnail.svg
    ├── multiplication-battle/
    └── fractions-challenge/
```

Because every page reads from the registry instead of hardcoding a list of `<GameCard />`s, a new game entry automatically appears in:

- the home page's "Featured games"
- `/games` (library, search, filters)
- `/grade/:grade` for every grade it's tagged with
- `/topic/:slug` for its topic
- its own route at `/games/<id>`

**Nothing else in the codebase needs to change.**

---

## 4. Adding a new game (under 2 minutes)

### Step 1 — Create the game's folder

```
public/games/my-new-game/
├── index.html
├── game.js
├── styles.css
└── thumbnail.svg   (or .png)
```

Your game is a normal, self-contained web page. It can use HTML, CSS, JavaScript, Canvas, SVG, or any browser API — it never imports anything from the React app, and the React app never imports anything from it. Use the three sample games in `public/games/` as a template for structure and style.

### Step 2 — Register its metadata

Open `src/data/games.ts` and add one object to the `games` array:

```ts
{
  id: "my-new-game",                       // must match the folder name
  title: "My New Game",
  description: "Practice multiplication in a fun challenge.",
  grade: [3, 4],                            // any grades 1–9
  topic: "Multiplication",                  // free text — becomes /topic/multiplication
  difficulty: "Medium",                     // "Easy" | "Medium" | "Hard"
  thumbnail: "/games/my-new-game/thumbnail.svg",
  gameUrl: "/games/my-new-game/index.html",
  tags: ["Multiplication", "Speed"],        // optional, used by search
  emoji: "🎯",                              // optional, shown on the card
}
```

### Step 3 — Save

That's it. Run `npm run dev` (or refresh, if it's already running) — the game now shows up everywhere it should, with a working `/games/my-new-game` launch page, grade page entry, and topic page entry.

**Do NOT edit** the home page, grade page, topic page, `GameCard`, the navbar, or any routing file to add a game — if you find yourself doing that, something's wrong.

---

## 5. Creating a thumbnail

Thumbnails render at a 4:3 aspect ratio on cards. Two easy options:

- **SVG** (recommended, no image tooling needed) — copy one of the existing `thumbnail.svg` files in `public/games/*/` as a starting point and adjust the colors/emoji.
- **PNG/JPG** — export at roughly 800×600px, keep it under ~200KB, and reference it the same way (`thumbnail: "/games/my-new-game/thumbnail.png"`).

---

## 6. Game isolation & the launch page

`src/pages/GameLaunch.tsx` shows the game's metadata, then loads `gameUrl` inside a sandboxed `<iframe>` (`sandbox="allow-scripts allow-same-origin allow-pointer-lock"`) only once the student presses **Play**. This means:

- Games never load until the user chooses to play (fast home/library pages).
- A broken or missing game shows the "Oops! This game couldn't be loaded." error state with a **Back to Games** button instead of a blank page.
- Games can be fullscreened and restarted from a small control bar under the frame.

---

## 7. Deployment

The build output (`npm run build`) is a fully static `dist/` folder — deploy it anywhere that serves static files:

- **Vercel / Netlify** — set the build command to `npm run build` and the output directory to `dist`. Add a SPA rewrite rule (`/* → /index.html`) so client-side routes like `/grade/3` work on refresh.
- **GitHub Pages / any static host** — same idea: build, upload `dist/`, and configure a catch-all fallback to `index.html`.

---

## 8. Roadmap (not implemented in V1, architecture allows for it later)

- **V2** — student accounts, XP, achievements, progress tracking
- **V3** — teacher dashboard, classes, assignments, analytics
- **V4** — AI-generated adaptive challenges, personalized learning, parent dashboard

---

## 9. Code quality notes

- TypeScript strict mode is enabled (`tsconfig.app.json`).
- No page hardcodes a list of games — everything is derived from `src/data/games.ts` via `src/utils/gameUtils.ts`.
- Shared UI (`GameCard`, `GameGrid`, badges, empty/error states) lives in `src/components/` and is reused everywhere, so there's no duplicated card markup.

---

Built by **Mr. Abdullah Khaled** — Mathematics Teacher & Educational Technology Enthusiast.
