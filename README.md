# Sauce Demo AI - E2E Test Automation

Comprehensive end-to-end test automation framework for [Sauce Demo](https://www.saucedemo.com/) using Playwright and TypeScript.

## 🎯 Project Overview

This project implements a robust test automation framework following the **Page Object Model (POM)** pattern with strict adherence to best practices defined in `AI_TEST_STANDARDS.md`.

### Key Features
- ✅ **26 Test Scenarios** covering critical user journeys
- ✅ **7 Page Objects** with user-facing locators
- ✅ **Strict TypeScript** - No `any` types
- ✅ **Tag-based Execution** - Run smoke, regression, or specific test suites
- ✅ **Web-first Assertions** - Auto-waiting, no hard waits
- ✅ **CI/CD Ready** - Configured for automated pipelines

## 📁 Project Structure

```
SauceDemoAI/
├── tests/
│   ├── pages/                    # Page Object Models
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── ProductDetailPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutInfoPage.ts
│   │   ├── CheckoutOverviewPage.ts
│   │   └── CheckoutCompletePage.ts
│   ├── auth.spec.ts              # Authentication tests (6 scenarios)
│   ├── cart.spec.ts              # Shopping cart tests (5 scenarios)
│   ├── checkout.spec.ts          # Checkout flow tests (4 scenarios)
│   ├── products.spec.ts          # Product browsing tests (6 scenarios)
│   └── edge-cases.spec.ts        # Edge cases & special users (5 scenarios)
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Dependencies & scripts
├── AI_TEST_STANDARDS.md          # Coding standards & guidelines
└── TEST_PLAN.md                  # Comprehensive test plan
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

### Run Smoke Tests (Critical scenarios - ~6 tests)
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
| `@smoke` | Critical happy path tests | 6 |
| `@regression` | Full regression suite | 15+ |
| `@auth` | Authentication tests | 6 |
| `@cart` | Shopping cart tests | 5 |
| `@checkout` | Checkout flow tests | 4 |
| `@products` | Product browsing tests | 6 |
| `@e2e` | End-to-end flows | 3 |
| `@negative` | Negative test scenarios | 5+ |
| `@edge` | Edge cases | 5 |

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

## 🛠️ Development Guidelines

### AI Test Standards
All code follows strict guidelines defined in `AI_TEST_STANDARDS.md`:

1. **Locators**: Use `getByRole`, `getByLabel`, `getByPlaceholder` (user-facing)
2. **Architecture**: Page Object Model - no selectors in spec files
3. **Waiting**: Web-first assertions only - no `waitForTimeout()`
4. **TypeScript**: Strict typing - no `any` types
5. **Error Handling**: Assume selector issues before logic issues

### Adding New Tests

1. **Create/Update Page Object** in `/tests/pages/`
2. **Add Test Scenario** in appropriate spec file
3. **Use Tags** for categorization
4. **Follow Naming Convention**: `TC-XXX: Description @tags`
5. **Run Locally** before committing

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

- **[TEST_PLAN.md](./TEST_PLAN.md)** - Comprehensive test plan with 20 detailed scenarios
- **[AI_TEST_STANDARDS.md](./AI_TEST_STANDARDS.md)** - Coding standards and best practices
- **[Playwright Docs](https://playwright.dev/)** - Official Playwright documentation

## 🎯 Success Metrics

- ✅ **100% Critical Path Coverage** - All smoke tests automated
- ✅ **90%+ Regression Coverage** - Comprehensive test scenarios
- ✅ **0% Flaky Tests** - Deterministic, reliable tests
- ✅ **< 10 min Smoke Suite** - Fast feedback loop
- ✅ **< 30 min Full Suite** - Complete regression testing

## 🤝 Contributing

1. Follow `AI_TEST_STANDARDS.md` guidelines
2. Add tests for new features
3. Ensure all tests pass before committing
4. Update documentation as needed

## 📄 License

ISC

## 👤 Author

Mukul Dev Mahato

---

**Last Updated**: 2025-12-13  
**Framework Version**: 1.0.0  
**Playwright Version**: ^1.57.0
