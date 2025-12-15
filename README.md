# Sauce Demo AI - E2E Test Automation

Enterprise-level end-to-end test automation framework for [Sauce Demo](https://www.saucedemo.com/) using Playwright and TypeScript with **Component Object Model** architecture.

## 🎯 Project Overview

This project implements a robust test automation framework following **enterprise patterns** with Component Object Model (COM), custom fixtures, and dependency injection as defined in `AI_TEST_STANDARDS.md`.

### Key Features
- ✅ **41 Test Scenarios** covering critical user journeys
- ✅ **7 Page Objects** with Component Object Model architecture
- ✅ **3 Reusable Components** (NavigationBar, ProductCard, CartItem)
- ✅ **Custom Fixtures** with dependency injection
- ✅ **Filter Pattern** for resilient locators
- ✅ **Strict TypeScript** - No `any` types
- ✅ **Tag-based Execution** - Run smoke, regression, or specific test suites
- ✅ **Web-first Assertions** - Auto-waiting, no hard waits
- ✅ **CI/CD Ready** - Configured for automated pipelines

## 📁 Project Structure

```
SauceDemoAI/
├── src/
│   ├── tests/                      # Test specifications (organized by module)
│   │   ├── auth/
│   │   │   └── auth.spec.ts        # Authentication tests (7 scenarios)
│   │   ├── cart/
│   │   │   └── cart.spec.ts        # Shopping cart tests (8 scenarios)
│   │   ├── checkout/
│   │   │   └── checkout.spec.ts    # Checkout flow tests (10 scenarios)
│   │   ├── products/
│   │   │   └── products.spec.ts    # Product browsing tests (11 scenarios)
│   │   └── edge-cases/
│   │       └── edge-cases.spec.ts  # Edge cases & special users (5 scenarios)
│   ├── pages/                      # Page Object Models
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts        # Uses NavigationBar & ProductCard
│   │   ├── ProductDetailPage.ts
│   │   ├── CartPage.ts             # Uses CartItem component
│   │   ├── CheckoutInfoPage.ts
│   │   ├── CheckoutOverviewPage.ts
│   │   └── CheckoutCompletePage.ts
│   ├── components/                 # Reusable UI Components
│   │   ├── NavigationBar.ts        # Burger menu, cart, logout
│   │   ├── ProductCard.ts          # Individual product (filter pattern)
│   │   └── CartItem.ts             # Cart item (filter pattern)
│   ├── fixtures/                   # Custom Playwright Fixtures
│   │   └── custom-test.ts          # Dependency injection setup
│   └── api/                        # API integration (future)
│       └── README.md
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies & scripts
├── AI_TEST_STANDARDS.md            # Enterprise coding standards
├── TEST_PLAN.md                    # Comprehensive test plan
└── NEW_TEST_CASES.md               # Phase 1 new test cases (TC-021 to TC-028)
```

## 🏗️ Architecture Highlights

### Component Object Model (COM)

Instead of monolithic page objects, we use composable components:

```typescript
// InventoryPage composes NavigationBar
class InventoryPage {
  readonly navBar: NavigationBar;  // Shared component
  
  async logout() {
    await this.navBar.logout();    // Delegate to component
  }
}

// ProductCard uses filter pattern (resilient to DOM changes)
const product = new ProductCard(page, 'Sauce Labs Backpack');
await product.addToCart();
```

### Dependency Injection

Tests use custom fixtures - no manual page object instantiation:

```typescript
import { test, expect } from '../../fixtures/custom-test';

test('my test', async ({ loginPage, inventoryPage, cartPage }) => {
  // All page objects automatically injected!
  await loginPage.login('user', 'pass');
  await inventoryPage.addToCart('Product');
});
```

### Filter Pattern

Resilient locators that adapt to DOM changes:

```typescript
// Instead of brittle ID-based selectors
const container = page
  .locator('.inventory_item')
  .filter({ hasText: productName });
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (or navigate to project directory)
   ```bash
   cd SauceDemoAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install chromium
   ```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Smoke Tests (Critical scenarios - 6 tests)
```bash
npm run test:smoke
```

### Run Regression Tests
```bash
npm run test:regression
```

### Run Specific Test Suites
```bash
npm run test:auth        # Authentication tests
npm run test:cart        # Shopping cart tests
npm run test:checkout    # Checkout flow tests
npm run test:products    # Product browsing tests
npm run test:edge        # Edge cases tests
```

### Run Tests in Headed Mode (See browser)
```bash
npm run test:headed
```

### Run Tests in UI Mode (Interactive)
```bash
npm run test:ui
```

### View Test Report
```bash
npm run report
```

## 🏷️ Test Tags

Tests are organized with tags for flexible execution:

| Tag | Description | Count |
|-----|-------------|-------|
| `@smoke` | Critical happy path tests | 7 |
| `@regression` | Full regression suite | 34+ |
| `@auth` | Authentication tests | 7 |
| `@cart` | Shopping cart tests | 8 |
| `@checkout` | Checkout flow tests | 10 |
| `@products` | Product browsing tests | 11 |
| `@navigation` | Navigation tests | 2 |
| `@e2e` | End-to-end flows | 3 |
| `@negative` | Negative test scenarios | 6+ |
| `@edge` | Edge cases | 7 |

### Run Tests by Tag
```bash
npx playwright test --grep @smoke
npx playwright test --grep @e2e
npx playwright test --grep @negative
```

## 📊 Test Coverage

### Critical User Journeys

1. **Complete Purchase Flow** (TC-008, TC-020)
   - Add items to cart
   - Complete checkout
   - Verify order confirmation

2. **Authentication & Authorization** (TC-001 to TC-004, TC-018)
   - Successful login
   - Failed login scenarios
   - Logout
   - Unauthenticated access

3. **Shopping Cart Management** (TC-005 to TC-007, TC-013, TC-017)
   - Add/remove items
   - Cart persistence
   - Empty cart handling

4. **Product Browsing** (TC-010 to TC-012)
   - Product sorting (name, price)
   - Product detail view
   - Add to cart from different pages

5. **Error Handling** (TC-014 to TC-016, TC-019)
   - Form validation
   - Special user personas
   - App state reset

## 🎭 Test Users

| Username | Password | Purpose |
|----------|----------|---------|
| `standard_user` | `secret_sauce` | Normal user flow |
| `locked_out_user` | `secret_sauce` | Access denied scenario |
| `problem_user` | `secret_sauce` | Visual/functional issues |
| `performance_glitch_user` | `secret_sauce` | Performance testing |
| `error_user` | `secret_sauce` | Error scenarios |
| `visual_user` | `secret_sauce` | Visual regression |

## 📝 Test Results

After running tests, results are available in:
- **HTML Report**: `playwright-report/index.html`
- **JSON Results**: `test-results/results.json`
- **Screenshots**: `test-results/` (on failure)
- **Videos**: `test-results/` (on failure)

**Current Status:**
- ✅ Smoke Tests: 6/6 passing
- ✅ Full Suite: 26/26 passing
- ✅ Pass Rate: 100%
- ⏱️ Execution Time: ~1.2 minutes

## 🛠️ Development Guidelines

### AI Test Standards
All code follows enterprise patterns defined in `AI_TEST_STANDARDS.md`:

1. **Locator Strategy (Cascade Rule)**:
   - Priority 1: Semantic (`getByRole`, `getByLabel`, `getByPlaceholder`)
   - Priority 2: Stable attributes (`getByTestId`)
   - Priority 3: Filter pattern for dynamic lists

2. **Architecture**: Component Object Model (COM)
   - Pages compose components
   - Reusable UI components
   - No selectors in spec files

3. **Fixtures & Dependency Injection**:
   - Use custom fixtures from `src/fixtures/custom-test.ts`
   - No manual page object instantiation
   - Automatic lifecycle management

4. **Waiting**: Web-first assertions only - no `waitForTimeout()`

5. **TypeScript**: Strict typing - no `any` types

### Adding New Tests

1. **Create/Update Component** (if needed) in `/src/components/`
2. **Create/Update Page Object** in `/src/pages/`
3. **Add Test Scenario** in appropriate module under `/src/tests/`
4. **Use Custom Fixtures** - import from `../../fixtures/custom-test`
5. **Use Tags** for categorization
6. **Follow Naming Convention**: `TC-XXX: Description @tags`
7. **Run Locally** before committing

### Example Test Structure

```typescript
import { test, expect } from '../../fixtures/custom-test';

test.describe('Feature Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('TC-XXX: Test description @smoke @feature', async ({ 
    page, 
    inventoryPage, 
    cartPage 
  }) => {
    // Test implementation using injected fixtures
    await inventoryPage.addToCart('Product Name');
    await expect(inventoryPage.navBar.cartBadge).toHaveText('1');
  });
});
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run test:smoke
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📚 Documentation

- **[TEST_PLAN.md](./TEST_PLAN.md)** - Comprehensive test plan with detailed scenarios
- **[AI_TEST_STANDARDS.md](./AI_TEST_STANDARDS.md)** - Enterprise coding standards and patterns
- **[Playwright Docs](https://playwright.dev/)** - Official Playwright documentation

## 🎯 Success Metrics

- ✅ **100% Critical Path Coverage** - All smoke tests automated
- ✅ **100% Test Pass Rate** - 26/26 tests passing
- ✅ **0% Flaky Tests** - Deterministic, reliable tests
- ✅ **< 30 sec Smoke Suite** - Fast feedback loop
- ✅ **< 2 min Full Suite** - Complete regression testing
- ✅ **Enterprise Architecture** - COM with dependency injection

## 🏆 Architecture Benefits

### Maintainability
- ✅ Reusable components reduce duplication
- ✅ Filter pattern resilient to DOM changes
- ✅ Dependency injection simplifies tests
- ✅ Clear separation of concerns

### Scalability
- ✅ Easy to add new components
- ✅ Modular architecture
- ✅ Organized by feature modules
- ✅ Ready for API integration

### Developer Experience
- ✅ Less boilerplate code
- ✅ Auto-completion with fixtures
- ✅ Clear patterns to follow
- ✅ Comprehensive documentation

## 🤝 Contributing

1. Follow `AI_TEST_STANDARDS.md` enterprise patterns
2. Use custom fixtures for dependency injection
3. Create reusable components when appropriate
4. Add tests for new features
5. Ensure all tests pass before committing
6. Update documentation as needed

## 📄 License

ISC

## 👤 Author

Mukul Dev Mahato

---

**Last Updated**: 2025-12-14  
**Framework Version**: 2.0.0 (Enterprise)  
**Playwright Version**: ^1.57.0  
**Architecture**: Component Object Model with Dependency Injection
