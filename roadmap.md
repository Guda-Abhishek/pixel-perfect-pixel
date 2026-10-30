# Netflix-inspired portfolio enhancement

# Four-person portfolio update
- [ ] Replace main audience picker with Abhishek, Amulya, Anjini and Sai.
- [ ] Add typed person data and shared person-specific pages; preserve Abhishek routes and interactions.
- [ ] Test person boundaries, facts, routing, navigation and mobile states; do not publish.

# Multi-page cinematic update
- [ ] Add Home, About, Skills, Projects/detail, Experience, Certifications and Contact with shared navigation/footer.
- [ ] Preserve profile picker, legacy portfolio, portraits, optional intro and chatbot.
- [ ] Apply design-reference guidance and verify local asset/icon licenses.
- [ ] Validate routes, factual rules, interactions and mobile layout.

- [x] Add four selectable profiles, optional intro, and profile switching.
- [x] Apply cinematic red/charcoal design, billboard and accessible details.
- [x] Add horizontal project/episode rows, skill categories, and awards.
- [x] Connect supplied social URLs and honest bio/resume/contact actions.
- [x] Test factual rules, desktop/mobile interactions, accessibility and errors.

# Optional AI portfolio introduction

- [ ] Inspect video and connect authentic/AI portraits — blocked: the video, refer real.jpeg and ai refer.jpeg are absent from both upload mounts; needs re-upload.
- [x] Add shared accessible intro with transcript and optional browser voice to picker and hero.
- [x] Verify playback, fallback, mobile layout and existing portfolio interactions; portrait verification awaits missing images.

# Video-backed introduction

- [ ] Add both supplied clips with user-started background intro narration.
- [ ] Verify video selection, playback, pause, replay and cleanup.

# AI portfolio chatbot

- [x] Floating launcher + chat panel, grounded AI replies with honest offline fallback.
- [ ] GitHub sync — managed by Lovable's GitHub connector; cannot be driven from chat.

# Delivery plan and release gates (2026-10-31)

Status: the roadmap below is the execution order. A checkbox is not considered complete until there is evidence from a successful build/test run or documented manual acceptance. Do not merge to main or publish/deploy without explicit approval.

## P0 — unblock engineering and establish reliable validation

1. **EPIC-01 — Build stability and engineering foundation**
   - [ ] Resolve the package manifest/lockfile mismatch. Current blocker: package.json requests `@lovable.dev/vite-tanstack-config` 2.26.5 while package-lock.json records 2.25.3; `npm ci` fails before build, lint, or tests.
   - [ ] Regenerate package-lock.json with Node.js 24/npm in a network-enabled environment; do not hand-edit lockfile integrity/resolution metadata.
   - [ ] Run and record `npm ci`, `npm run build`, `npm run lint`, and `npm test` successfully.
   - [ ] Confirm the verification workflow only runs for pushes to `dev`, pull requests targeting `dev`/`main`, or a manual dispatch; stale runs for the same branch/PR should be cancelled.
2. **EPIC-02 — Portfolio-wide functional validation**
   - [ ] Build a route/interaction acceptance matrix for all four profiles.
   - [ ] Cover desktop, tablet and mobile, including loading, empty, offline, validation and failure states.
   - [ ] Verify navigation, chat/voice, contact, resume workflows and profile-data isolation.
   - [ ] Add or repair automated tests and browser smoke checks based on the matrix.

## P1 — complete product capabilities after P0 gates pass

3. **EPIC-07 — Resume Manager and document processing**
   - [ ] Verify authentication/session expiry, rate limiting, upload/download/delete, private original storage and error handling.
   - [ ] Define document parsing/extraction behavior and safe review/editing before approval.
   - [ ] Test file type/size limits and unauthorized access.
4. **EPIC-08 — Dynamic profile updates and publishing**
   - [ ] Connect approved resume/profile data to the correct public profile without leaking private source documents.
   - [ ] Verify preview, approval, publish, rollback and local/hosted behavior.
5. **EPIC-06 — AI assistant, chat and voice**
   - [ ] Verify API configuration, grounded profile-specific answers, streaming/cancellation and honest offline fallback.
   - [ ] Test microphone permissions, unsupported browsers, privacy disclosures and failure recovery.
6. **EPIC-05 — Four profile experiences and content architecture**
   - [ ] Verify typed profile data, shared page components, route compatibility and strict separation of facts across Abhishek, Amulya, Anjini and Sai.
7. **EPIC-04 — Cinematic design and media**
   - [ ] Verify all supplied media assets exist and are correctly licensed/attributed where required.
   - [ ] Complete video intro playback, pause/replay, cleanup, reduced-motion behavior and mobile fallback.
8. **EPIC-03 — Shared UI, navigation and responsive experience**
   - [ ] Validate shared navigation/footer, active states, keyboard operation, responsive layouts and all route links.
9. **EPIC-09 — Security, accessibility and performance**
   - [ ] Audit access control, upload validation, public/private data boundaries, keyboard/screen-reader behavior and performance.
10. **EPIC-10 — End-to-end acceptance and release**
    - [ ] Run the full acceptance matrix on the candidate branch and record results.
    - [ ] Review the complete branch diff and outstanding issues.
    - [ ] Obtain explicit user approval before any merge to `main` or deployment.

## Working rules
- Fix the earliest blocking P0 item before starting dependent feature work.
- Do not mark work complete based only on source inspection; record the command/test or manual evidence.
- Do not commit generated lockfile metadata by hand.
- Do not merge to `main`, publish, or deploy without explicit approval.
