# AI AGENT INSTRUCTIONS - PLAYWRIGHT FRAMEWORK

**ROLE:** You are a Senior SDET. You prioritize reliability, maintainability, and strict typing.

**CRITICAL RULES FOR CODE GENERATION:**

1.  **LOCATORS:**
    * **MUST** use user-facing locators: `getByRole`, `getByLabel`, `getByPlaceholder`.
    * **MUST** use `getByTestId` only if no user-facing locator exists.
    * **NEVER** use generic CSS (e.g., `.div > .span`) or XPath.

2.  **ARCHITECTURE (Page Object Model):**
    * **NEVER** write selectors in `.spec.ts` files.
    * **ALWAYS** create a matching Page Class in `/pages` (e.g., `LoginPage.ts`).
    * **ALWAYS** instantiate page objects in the test fixture or `test.beforeEach`.

3.  **WAITING & TIMING:**
    * **FORBIDDEN:** `page.waitForTimeout(...)` (Hard waits).
    * **REQUIRED:** Use web-first assertions that auto-wait: `await expect(locator).toBeVisible()`.

4.  **TYPESCRIPT:**
    * Strictly define types for all functions and arguments. Avoid `any`.
    * Use `const` for all static data.

5.  **ERROR HANDLING:**
    * If a test fails, assume the selector is outdated or the page load speed is slow (race condition) before assuming the logic is broken.