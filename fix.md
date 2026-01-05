Here is a prioritized checklist of prompts designed to fix these ESLint issues. I have grouped them logically so you can tackle them one by one (or feed them to an AI coding assistant) without overwhelming the context window.

### Phase 1: Critical React Hook & State Issues
*These cause performance degradation or runtime bugs and should be fixed first.*

- [ ] **Fix Cascading Renders in App & Router**
    > "I am getting `setState-in-effect` errors in `src/client/App.tsx` (line 31) and `src/client/components/Router.tsx` (line 22). The linter says calling setState synchronously within an effect causes cascading renders. Please refactor these components to initialize state correctly or use a proper effect dependency strategy to resolve these errors."

- [ ] **Fix Impure Functions in Render**
    > "I have `react-hooks/purity` errors in `src/client/components/LoadingScreen.tsx` and `src/client/components/ui/sidebar.tsx`. I am using `Math.random()` directly during the render phase, which is not allowed. Please refactor these components to generate random values inside `useMemo` or `useEffect` so the render remains pure."

- [ ] **Fix Side Effects in ImageGallery**
    > "In `src/client/components/ImageGallery.tsx`, I have an error: 'This value cannot be modified' regarding `document.body.style.overflow`. I am modifying the DOM directly in the render body. Please refactor this to handle the body overflow style inside a `useEffect` hook."

- [ ] **Fix Memoization in CardSwap**
    > "In `src/client/components/CardSwap.tsx`, I have complex memoization errors (`react-hooks/preserve-manual-memoization` and `exhaustive-deps`). The React Compiler cannot optimize the existing `useRef` and `useMemo` logic. Please analyze the component and refactor the `refs` and `childArr` memoization to satisfy the linter and ensure stable dependencies."

### Phase 2: TypeScript & Type Safety
*Fixing `any` types to ensure the code is actually type-safe.*

- [ ] **Fix Explicit Any in Contexts & Hooks**
    > "I have multiple `@typescript-eslint/no-explicit-any` errors in `src/client/contexts/ContentContext.tsx`, `src/client/hooks/useContent.ts`, and `src/client/hooks/useCMSContent.ts`. Please analyze the data structures being used and replace these `any` types with proper TypeScript interfaces or `unknown` where appropriate."

- [ ] **Fix Missing Prop Validation**
    > "I am getting `react/prop-types` errors in `src/client/components/figma/ImageWithFallback.tsx` and `src/client/components/ui/calendar.tsx`. Since I am using TypeScript, please ensure the props are strictly typed via Interfaces/Types and that the components are destructured correctly to satisfy the linter."

### Phase 3: JSX & HTML Syntax
*Fixing text rendering issues.*

- [ ] **Escape HTML Entities (Pages)**
    > "I have many `react/no-unescaped-entities` errors where I used single or double quotes directly in JSX text (e.g., `'` or `"`). Please fix these files by replacing them with `&apos;`, `&quot;`, or wrapping the text in strings:
    > 1. `src/client/pages/AboutPage.tsx`
    > 2. `src/client/pages/ContactPage.tsx`
    > 3. `src/client/pages/PrivacyPolicyPage.tsx`
    > 4. `src/client/pages/TermsOfServicePage.tsx`"

- [ ] **Escape HTML Entities (Components)**
    > "Please fix `react/no-unescaped-entities` errors in `src/client/components/TrustedBy.tsx`, `Header.tsx` and `Testimonials.tsx`."

### Phase 4: Cleanup (Unused Variables)
*There are roughly 100+ unused variables. Grouping them by folder helps.*

- [ ] **Cleanup Client Components**
    > "Please review the files in `src/client/components/` (specifically `FeaturedProjects.tsx`, `Footer.tsx`, `HeroSection.tsx`, `InlineEditableHero.tsx`). Remove all unused imports (like `Button`, `ArrowRight`) and unused variables defined in the code to resolve `@typescript-eslint/no-unused-vars`."

- [ ] **Cleanup Client Pages**
    > "Please review `src/client/pages/`. Remove unused imports (especially icons like `Globe`, `Heart`, `Shield` in `AboutPage.tsx`) and unused state setters or variables in `ContactPage.tsx` and `SolutionsPage.tsx`."

- [ ] **Cleanup Server File**
    > "Refactor `src/server/server.ts`. It has many unused variables (like `bcrypt`, `loginLimiter`, `phone`, `organization`). Please remove them. Also, address the console warnings..." (See Phase 5).

### Phase 5: Server & Console Warnings
*Handling logging and `console.log` statements.*

- [ ] **Handle Console Logs in Server**
    > "In `src/server/server.ts`, there are dozens of `no-console` warnings. Please decide on a strategy: either replace `console.log` with a proper logging library (like Winston or Morgan), or if these are strict dev-logs, wrap them in a conditional check for `process.env.NODE_ENV !== 'production'`, or as a last resort, disable the eslint rule for this specific file."

- [ ] **Handle Console Logs in Client Hooks**
    > "Remove or replace the `console.log` statements in `src/client/hooks/useCMSContent.ts` and `ContentContext.tsx`. If they are needed for error handling, ensure they use `console.error` and we suppress the warning, or use a toast notification system instead."

### Phase 6: Dependency Arrays (useEffect)
*Subtle bugs waiting to happen.*

- [ ] **Fix Exhaustive Deps**
    > "Fix `react-hooks/exhaustive-deps` warnings in:
    > 1. `src/client/components/ui/pointer-highlight.tsx` (Handle the ref cleanup).
    > 2. `src/client/pages/SolutionsPage.tsx` (Missing `solutions.length`).
    > 3. `src/client/hooks/useCMSContent.ts` (Unnecessary dependency)."