# System Guidelines — AI Profile Matching & Semantic Search

Use this file to provide the AI with rules and constraints for generating UI designs
for the AI-powered profile matching and semantic search product.

The product is a professional B2B decision-support tool used to streamline applicant
selection. The UI must prioritize clarity, trust, and efficiency over novelty.

---

## General Guidelines

- Design for serious business users (recruiters, hiring managers, analysts)
- Prioritize clarity, scanability, and predictable behavior
- Prefer structured, content-driven layouts over decorative layouts
- AI should support decisions, not replace user judgment
- Avoid novelty, experimentation, or consumer-style UI patterns

---

## Product Intent

- This is not a chat-based AI product
- This is not a marketing or demo experience
- This is a search and evaluation system powered by AI
- All AI-driven outputs must be reviewable, editable, and reversible
- The UI must communicate trust, control, and explainability

---

## Visual Style Guidelines

### Overall Look & Feel
- Modern B2B SaaS aesthetic
- Light, neutral surfaces with subtle depth
- Clean geometry and restrained color usage
- Confident, minimal, and professional
- UI should feel designed, not generated

### What This UI Is NOT
- Not a ChatGPT-style interface
- Not illustration-heavy
- Not card-only or hero-based
- Not playful or experimental
- Not legacy enterprise (SAP / Salesforce-style density)

---

## Layout & Structure

### Page Structure
- Use clearly defined page sections
- Pages should feel anchored and structured
- Avoid floating, free-form canvases
- Separate areas for:
  - Search definition
  - Filters and facets
  - Result lists
  - Detail inspection

### Navigation
- Slim, visually light left sidebar
- Sidebar should be collapsible
- Contextual top bar for actions and filters
- Avoid heavy borders between major regions

---

## Grid & Alignment

- Use a 12 or 16 column grid
- Consistent alignment across screens
- Left-aligned content
- Avoid center-aligned application layouts

---

## Spacing & Density

- Base spacing scale: 4 / 8 / 12 / 16 / 24 / 32
- Default density: comfortable
- Increased density allowed in:
  - Tables
  - Search results
  - Comparison views
- Do not over-compress layouts to fit more data

---

## Typography

### Font
- Inter or IBM Plex Sans

### Usage
- Base font size: 14px
- Calm, functional page titles
- Use weight and spacing for hierarchy
- Sentence case for labels and actions
- Avoid marketing-style typography

---

## Color Usage

- Neutral-first color palette
- Primary brand color used sparingly
- Accent colors only for:
  - Status
  - Active states
  - Focus states
- Avoid gradients and high-saturation colors
- Backgrounds should be slightly off-white

---

## Borders, Radius & Depth

- Border radius: 2–6px
- Prefer subtle strokes over heavy shadows
- Shadows only for layered or temporary surfaces
- Avoid card-heavy layouts

---

## Motion & Animation

Motion is a functional element and must explain change.

### Principles
- Motion must clarify cause and effect
- Fast, smooth, and subtle
- Never decorative or playful
- Respect reduced-motion preferences

### Required Use Cases
- Search execution feedback
- Result updates and filtering
- Row expansion and collapse
- Panel and drawer transitions
- Inline AI suggestion appearance

### Rules
- Duration: 120–240ms
- Use ease-out or ease-in-out
- No bounce or elastic motion
- Animations must not block interaction

---

## Core Components

### Search & Query Inputs
- Prefer structured inputs over free text
- Labels must always be visible
- Inline guidance preferred over tooltips
- Avoid dropdowns if there are 2 or fewer options

### Filters & Facets
- Always visible and easily scannable
- Multi-select by default
- Changes should update results immediately
- Clear active and inactive states

---

## Tables & Results

- Tables are a primary component
- Use subtle row hover states
- Support sorting and scanning
- Inline actions preferred over modals
- Sticky headers for long result sets

---

## Profile Detail & Comparison

- Prefer side panels or split views
- Highlight matched and missing attributes
- AI-generated insights must be clearly labeled
- All AI output must be editable and reversible

---

## AI Interaction Guidelines

- AI should function as a background assistant
- Avoid conversational or chat-based layouts
- Use:
  - Inline suggestions
  - Highlighted matches
  - Explanation panels
- Never apply AI changes without user review

---

## Explainability & Trust

- Always provide a clear reason for matches
- Avoid opaque or absolute scoring
- Never imply certainty where confidence is limited
- Do not use persuasive or emotional language

---

## Modals, Panels & Drawers

- Prefer side panels and inline expansion
- Modals only for confirmation or destructive actions
- Never stack modals
- One primary action per modal

---

## Performance & Feedback

- Long-running operations must show progress
- Loading states should feel intentional
- Do not assume instant AI responses
- Reflect system constraints transparently

---

## Maintainability Guidelines

- Reuse established patterns consistently
- Avoid one-off UI treatments
- Favor composable, reusable components
- UI should remain stable across:
  - Model changes
  - Prompt updates
  - Indexing strategy evolution

---

## Anti-Patterns (Strictly Avoid)

- Chat-style AI interfaces
- Floating action buttons
- Oversized CTAs
- Illustration-heavy screens
- Hidden AI logic
- Marketing-driven layouts

---

## Instruction to the AI

- Follow these guidelines strictly
- Prefer clarity over creativity
- Do not invent new visual styles arbitrarily
- Reuse established patterns consistently
- When unsure, choose predictability and trust
