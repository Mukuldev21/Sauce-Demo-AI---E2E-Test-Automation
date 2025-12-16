# Test Plan - Sauce Demo E2E Automation

| Document Control | Details |
| :--- | :--- |
| **Project** | Sauce Demo E2E Component Object Model Framework |
| **Document ID** | QA-TP-2025-001 |
| **Version** | 2.0 (Enterprise Release) |
| **Last Updated** | 2025-12-15 |
| **Owner** | QA Automation Team |
| **Status** | ✅ APPROVED |
| **Confidentiality** | Internal Use Only |

---

## 🎯 Test Strategy & Scope

### Architecture Principles
- **Component Object Model (COM):** Modular page objects in `/pages`
- **Web-First Assertions:** Auto-waiting, no hard waits
- **Strict TypeScript:** No `any` types
- **Resilient Locators:** `getByRole` over CSS selectors

### Test Levels
| Level | Tag | Check | Count |
|-------|-----|-------|-------|
| Smoke | `@smoke` | Critical paths | 7 |
| Regression | `@regression` | Full features | 34+ |
| E2E | `@e2e` | End-to-end flows | 3 |
| Edge | `@edge` | Boundary cases | 7 |

---

## 🧪 Detailed Test Cases

**Detailed test steps, expected results, and execution actions are documented in the separate [TESTCASES.md](TESTCASES.md) file.**

### Summary of Suites
1. **[Authentication Tests](TESTCASES.md#1-authentication-tests-7)** (7 tests)
   - Login, Logout, Validation, Locked user
2. **[Shopping Cart Tests](TESTCASES.md#2-shopping-cart-tests-8)** (8 tests)
   - Add/Remove items, Persistence, Badge count
3. **[Checkout Tests](TESTCASES.md#3-checkout-tests-10)** (10 tests)
   - Complete flows, Validation, Cancel, Edge cases
4. **[Product Tests](TESTCASES.md#4-product-tests-11)** (11 tests)
   - Sorting, Details, Images, Navigation
5. **[Edge Case Tests](TESTCASES.md#5-edge-case-tests-5)** (5 tests)
   - Problem user, Performance glitch, Error user

---

## 🌐 Test Data

### Users
- `standard_user` (Pass)
- `locked_out_user` (Fail)
- `problem_user` (Visual bugs)
- `performance_glitch_user` (Slow)
- `error_user` (Checkout fail)

### Products
- Backpack ($29.99)
- Bike Light ($9.99)
- Bolt T-Shirt ($15.99)
- Fleece Jacket ($49.99)
- Onesie ($7.99)
- Red T-Shirt ($15.99)

---

## 📊 Execution

```bash
# Run all tests
npm test

# Run by suite
npm run test:smoke
npm run test:cart

# Run by tag
npx playwright test --grep @checkout
```
