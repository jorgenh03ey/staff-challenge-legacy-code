# 🤖 Agentic AI Legacy Code Migration Demo

A comprehensive front-end demo showcasing an AI-powered pipeline for migrating legacy monolithic codebases to modern microservices architecture.

## 📋 Overview

This demo simulates a complete legacy code migration workflow with 6 specialized AI agents working together:

1. **Analyzer** - Scans codebase for patterns and anti-patterns
2. **Dependency Resolver** - Builds module dependency graphs
3. **Planner** - Generates phased migration strategies
4. **Code Generator** - Translates legacy code to modern stack
5. **Validator** - Runs quality assurance and parity testing
6. **Doc Generator** - Creates automated documentation

All data is **locally mocked** - no backend required.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation & Running

```bash
# Navigate to the project directory
cd c:\Users\TZ995LP\Development\legacy-agent-demo

# Install dependencies (already done, but for reference:)
npm install

# Start development server
npm run dev
```

The app will open at: **http://localhost:5173/**

### npm Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run lint` | Run ESLint (may have some Fluent UI type warnings) |
| `npm run preview` | Preview production build locally |

## 📄 Project Structure

```
src/
├── App.tsx                 # Main app with routing
├── types.ts               # TypeScript type definitions
├── components/
│   ├── Layout.tsx         # Main layout with navigation
│   ├── Layout.module.css  # Layout styles
│   └── StyledText.tsx     # Helper text component
├── pages/
│   ├── Landing.tsx        # / - Welcome & product pitch
│   ├── Import.tsx         # /import - Repo upload & summary
│   ├── Run.tsx            # /run - Agent orchestration & streaming logs
│   ├── Architecture.tsx    # /architecture - Module dependencies
│   ├── Docs.tsx           # /docs - Business rules table
│   ├── Translate.tsx      # /translate - Code diff viewer
│   ├── Validate.tsx       # /validate - Test results dashboard
│   ├── Export.tsx         # /export - PR summary & downloads
│   └── Pages.module.css   # All page styles
└── demoData/
    ├── runEvents.json           # Timeline events for streaming logs (~27 events)
    ├── repoSummary.json         # Repository metadata
    ├── businessRules.json       # 5 key migration rules
    ├── moduleGraph.json         # Service layer & dependency info
    ├── fileMapping.json         # Legacy ↔ migrated file mappings
    ├── diffs.json               # Code change examples
    ├── testResults.json         # Mock test suite results
    └── prSummary.json           # PR summary & benefits

```

## 🎯 Demo Flow (60 Seconds)

### Step 1: Landing Page (10 secs)
- Start at `/`
- Review the product pitch and feature cards
- Click **"Start Migration ✈️"** button

### Step 2: Import Repository (10 secs)
- Land on `/import`
- See mock repo data pre-loaded (LegacyOrderSystem - Java/Spring monolith)
- Review file count, lines of code, detected patterns
- Select modules to migrate (all pre-selected)
- Click **"Proceed to Run Pipeline"**

### Step 3: Agent Orchestration - CORE DEMO (30 secs)
- Land on `/run`
- Click **"Start Pipeline"** button
- Watch 6 agent cards cycle through:
  - ⏳ Pending → ▶️ Running → ✅ Complete
  - Progress bar fills from 0 → 100%
- Live streaming log output shows:
  - Agent start/completion events
  - Extracted patterns, dependencies, metrics
  - Test results, documentation stats
- Timeline: ~90 seconds total replay
  - First agent starts at 5s
  - Each agent runs 15-20s
  - All complete by 80s
- Use buttons to:
  - **Fast Forward ⏩** - Jump to end
  - **Pause/Resume** - Control playback
  - **Reset** - Start over

### Step 4: Results Exploration (10 secs)
- Once pipeline completes, navigate to other pages:
  - **Architecture** (`/architecture`) - See module dependencies & circular dep warnings
  - **Translation** (`/translate`) - View before/after code diffs
  - **Validation** (`/ validate`) - Check test metrics & parity stats
  - **Export** (`/export`) - Download migrated code, docs, test reports

### Step 5: Downloads (Optional)
- On `/export` page:
  - **Download ZIP** - Generated migrated codebase structure
  - **Download MD** - Migration guide  
  - **Download HTML** - Test report

## 🎨 UI Highlights

- **Fluent UI Components** - Professional Microsoft Fluent design system
- **React Router** - Seamless navigation between pages
- **Left Sidebar Nav** - Quick access to all pages
- **Top Header** - "Demo Mode" badge + "Reset Demo" button
- **Responsive Layout** - Adapts to different screen sizes
- **Live Streaming Logs** - Green terminal-style output on /run page
- **Progress Tracking** - Visual status for each agent

## 📊 Mock Data

All data is in `src/demoData/` JSON files:

- **runEvents.json**: 27 timed events that fire over 90 seconds, triggering agent updates
- **repoSummary.json**: Java/Spring monolith (284 files, 45K LOC)
- **businessRules.json**: 5 critical migration rules (authentication, security, performance, etc.)
- **moduleGraph.json**: 8 modules with dependencies and 1 circular dependency detected
- **fileMapping.json**: 7 legacy ↔ migrated file mappings
- **diffs.json**: 2 before/after code transformation examples
- **testResults.json**: 234 tests passing, 86% coverage, 96.2% parity
- **prSummary.json**: PR details with highlights and deployment strategy

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Routing**: React Router v6
- **UI Framework**: Fluent UI (Microsoft)
- **Build Tool**: Vite
- **Code Quality**: ESLint
- **State Management**: React Hooks (useState, useEffect)
- **File Handling**: JSZip (for client-side zip generation)
- **Styling**: CSS Modules + inline styles

## 🔄 How It Works

### Agent Pipeline Simulation (/run page)

1. **Initialization**: Pipeline starts at 0%
2. **Event Loop**: 
   - Every 1 second, next event from `runEvents.json` is processed
   - Event triggers agent status update (pending → running → complete)
   - Log message appended to streaming log terminal
   - Progress bar increments
3. **State Updates**:
   - Agent cards show real-time status
   - Progress indicators animate per agent
   - Log accumulates in read-only terminal
4. **Controls**:
   - Stop/resume playback
   - Jump to end (fast-forward)
   - Reset all states

### Export Functionality (/export page)

- **Download ZIP**: Uses JSZip library to generate a mock migrated codebase:
  - package.json with modern dependencies
  - Services folder with NestJS-style structure
  - PR_SUMMARY.md
  - TEST_RESULTS.json
  - Generated files trigger browser download
- **Download Docs**: Generates markdown file with architecture guide
- **Download HTML**: Generates HTML test report with formatted table

## 💡 Key Features

✅ **No Backend Required** - All data is client-side mocked
✅ **Live Streaming Demo** - Watch agents work in real time
✅ **Code Comparisons** - Before/after transformation examples
✅ **Test Dashboard** - Mock test results with coverage metrics
✅ **File Downloads** - Generate artifacts on client-side
✅ **Business Rules Engine** - Display key rules & priorities
✅ **Architecture Visualization** - Module dependencies & layers
✅ **Responsive Design** - Works on desktop and tablets
✅ **Clean Navigation** - Sidebar + breadcrumb routing

## 🐛 Known Issues

- TypeScript strict mode has some Fluent UI type warnings (doesn't affect runtime)
- For production build, some Text component styling may need refactoring
- Dev mode works perfectly - use `npm run dev` for testing

## 📝 Customization

To modify the demo:

1. **Edit mock data**: Update files in `src/demoData/*.json`
2. **Change timing**: Modify `timestamp` values in `runEvents.json`
3. **Adjust styling**: Edit `Pages.module.css` or `Layout.module.css`
4. **Update page content**: Modify individual page components in `src/pages/`

## 🎬 Live Demo Commands

```bash
# Terminal 1: Start the dev server
npm run dev

# Then open browser to http://localhost:5173/

# Click through the demo:
# 1. Landing → Import → Run → Export
# OR
# Navigate directly to:
# http://localhost:5173/run  (to jump straight to agent orchestration)
```

## 📞 Support

This is a self-contained front-end demo. All data is mocked and local. For questions about the implementation:
- Check `src/types.ts` for data structure definitions
- Review `src/demoData/` for mock data format
- Inspect individual page components for UI implementation

---

**Built with ❤️ using React, TypeScript, and Vite**
