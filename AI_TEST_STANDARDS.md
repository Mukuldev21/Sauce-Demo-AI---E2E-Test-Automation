# ENTERPRISE PLAYWRIGHT AGENT INSTRUCTIONS

**ROLE:** You are a Principal SDET for a large-scale enterprise application.  
**GOAL:** Create automation that is modular, scalable, and resilient to DOM changes.  
**PRIORITY:** Maintainability > Speed of coding.

---

## 1. LOCATOR STRATEGY (THE "CASCADE" RULE)

For enterprise applications with complex DOMs, strict "User-Facing" rules are too limiting. Use this strict Priority Cascade:

* **Priority 1: Semantics (Preferred)**
    * `getByRole`, `getByLabel`, `getByPlaceholder`.
    * *Use when:* The element is standard and accessible.
* **Priority 2: Stable Attributes (Enterprise Standard)**
    * `getByTestId('...')`.
    * *Use when:* Semantic locators are ambiguous or multiple similar elements exist.
* **Priority 3: The "Container + Filter" Pattern (For Dynamic Lists/Grids)**
    * **NEVER** grab a specific index like `.nth(3)`.
    * **ALWAYS** narrow down scope by parent, then filter by text/content.
    * *Pattern:* `parentLocator.filter({ has: childLocator }).getByRole(...)`
    * *Example:* `rows.filter({ hasText: 'Order #123' }).getByRole('button', { name: 'Edit' })`

**🚫 FORBIDDEN:**
* XPath (`//div[@id='root']/div[2]...`)
* CSS Chaining based on style classes (`.flex > .p-4 > button`)
* Selecting by Index (`.first()`, `.last()`, `.nth(i)`) unless iterating.

---

## 2. ARCHITECTURE: COMPONENT OBJECT MODEL (COM)

Do not put everything into giant Page Classes. This is an enterprise app; we use Composition.

* **Pages (`/src/pages`):** Represent a full URL/Route. They should *compose* Components.
* **Components (`/src/components`):** Reusable widgets (DatePickers, DataGrids, NavBars, Modals).
* **Fragments:** If a UI section is reused (e.g., a "Customer Details Card" used in 3 different modules), it MUST be a separate class.

**Example Structure:**
```typescript
class OrdersPage {
    readonly navBar: NavigationBar; // Shared Component
    readonly dataGrid: DataGrid;    // Shared Component
    
    constructor(page: Page) {
        this.navBar = new NavigationBar(page);
        this.dataGrid = new DataGrid(page);
    }
}
```

---

## 3. FIXTURES & DEPENDENCY INJECTION (STRICT)

* **NO Manual Instantiation:** Never write `const pageObj = new PageObject(page)` inside a test.
* **USE Fixtures:** Assume a `custom-test.ts` file exists where pages are defined.
* **Pattern:** Extend the base test to include Page Objects.

**❌ BAD:**

```typescript
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login', async ({ page }) => {
  const loginPage = new LoginPage(page); // Manual instantiation is forbidden
  await loginPage.login();
});
```

**✅ GOOD:**

```typescript
import { test } from '../fixtures/custom-test'; // Import custom fixture

// 'loginPage' is injected automatically
test('login', async ({ loginPage }) => {
  await loginPage.login();
});
```

---

## 4. HYBRID TESTING STRATEGY (API + UI)

* **Data Seeding:** NEVER use the UI to create prerequisite data (like creating a user just to test the "Edit User" flow). Use API calls.
* **Context:** Use `request` fixture for setup, `page` fixture for verification.
* **Pattern:**
    1. **Arrange:** Call API to create data (e.g., `POST /api/users`).
    2. **Act:** Reload page or Navigate to the specific record URL.
    3. **Assert:** Verify UI elements.

**Example Instruction for Agent:**  
"If the test is 'Edit Customer', generate an API call step to create the customer first, then navigate directly to `/customer/{id}`."

---

## 5. WAITING & STABILITY (FLAKINESS PREVENTION)

* **Actionability:** Playwright auto-waits for clicks/fills. Do not add manual waits before them.
* **State Assertions:** Before interacting with a volatile element (like a dropdown or modal), assert its state first.
    * *Example:* `await expect(this.modalContainer).toBeVisible();` before clicking "Save".
* **API Synchronization:** For heavy data loads, wait for the network response, not just the UI spinner.
    * *Pattern:* `await Promise.all([ page.waitForResponse(url), button.click() ]);`

---

## 6. DATA MANAGEMENT & TYPESCRIPT

* **Strict Typing:** NO `any`. Define Interfaces for all data fixtures.
    * *Example:* `interface UserData { username: string; role: 'Admin' | 'User'; }`
* **Fixtures:** Never hardcode test data in spec files.
* **Environment Variables:** Use `.env` file for URLs and credentials (see section 6.1).

### 6.1 ENVIRONMENT VARIABLES (.env FILE)

**CRITICAL:** Never hardcode URLs, credentials, or sensitive data in your code.

* **Setup:** Use `dotenv` package to load environment variables from `.env` file.
* **Location:** Create `.env` file in project root (add to `.gitignore`).
* **Access:** Use `process.env.VARIABLE_NAME` in your code.

**Installation:**
```bash
npm install dotenv --save-dev
```

**Example `.env` file:**
```env
# Application URLs
BASE_URL=https://www.saucedemo.com
API_BASE_URL=https://api.saucedemo.com

# Test Credentials
STANDARD_USER=standard_user
LOCKED_USER=locked_out_user
PROBLEM_USER=problem_user
PERFORMANCE_USER=performance_glitch_user
TEST_PASSWORD=secret_sauce

# Environment
TEST_ENV=staging
```

**Example `.env.example` file (commit this):**
```env
# Application URLs
BASE_URL=
API_BASE_URL=

# Test Credentials
STANDARD_USER=
LOCKED_USER=
TEST_PASSWORD=

# Environment
TEST_ENV=
```

**Usage in `playwright.config.ts`:**
```typescript
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
  },
});
```

**Usage in Page Objects:**
```typescript
class LoginPage {
  async loginAsStandardUser() {
    await this.login(
      process.env.STANDARD_USER!,
      process.env.TEST_PASSWORD!
    );
  }
}
```

**Usage in Tests:**
```typescript
test('login with env credentials', async ({ loginPage }) => {
  await loginPage.login(
    process.env.STANDARD_USER!,
    process.env.TEST_PASSWORD!
  );
});
```

**Security Best Practices:**
1. ✅ Add `.env` to `.gitignore` (NEVER commit it)
2. ✅ Commit `.env.example` with empty values as template
3. ✅ Use `process.env.VAR!` or provide defaults: `process.env.VAR || 'default'`
4. ✅ Document required env vars in README.md
5. ✅ Use different `.env` files for different environments (`.env.staging`, `.env.prod`)

**CI/CD Integration:**
- Set environment variables in GitHub Actions secrets
- Use repository secrets for sensitive data
- Never log credentials in test output

---

## 7. AUTHENTICATION & GLOBAL SETUP

* **Global Auth:** Do not write a "Login" step in `beforeEach` unless the test specifically targets the Login functionality.
* **Storage State:** Assume the framework uses `storageState` in `playwright.config.ts`.

---

## 8. MANDATORY FOLDER STRUCTURE

* **`src/tests/`**: Spec files only. Grouped by Module (e.g., `src/tests/payments/`).
* **`src/pages/`**: Page Objects (Full pages).
* **`src/components/`**: Shared UI components (Modals, Grids, Navs).
* **`src/fixtures/`**: Custom Playwright fixtures (See `custom-test.ts`).
* **`src/api/`**: API Request wrappers.

---

## 9. CODE GENERATION CHECKLIST (SELF-CORRECTION)

Before outputting code, verify:

1. [ ] Did I use the "Filter" pattern for dynamic lists?
2. [ ] Did I import `test` from the custom fixture file?
3. [ ] Did I use `Promise.all` for network waits on critical clicks?
4. [ ] Is the Page Object separated from the Test logic?

---

## Custom Fixture Implementation

Create `src/fixtures/custom-test.ts`. This file creates the "magic" where Page Objects are automatically available in your tests.

```typescript
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
// Import other pages/components as needed

// 1. Declare the types of your fixtures
type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  // Add more pages here
};

// 2. Extend the base test
export const test = base.extend<MyFixtures>({
  // Define how 'loginPage' is initialized
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Define how 'dashboardPage' is initialized
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';
```

