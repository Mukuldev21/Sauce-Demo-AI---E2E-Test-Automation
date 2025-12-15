# New Test Cases - Phase 1 & 2 (TC-021 to TC-035)

## Summary
Added 15 new test cases to increase coverage from 26 to 41 tests (+58%).

---

## Phase 1 Tests (TC-021 to TC-028)

### TC-021: Login with Empty Credentials
**Tags:** `@smoke` `@negative` `@auth`  
**File:** `src/tests/auth/auth.spec.ts`

Verifies form validation when attempting login with empty username and password fields.

---

### TC-022: Add All Products to Cart
**Tags:** `@regression` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

Tests adding all available products to cart dynamically and verifies cart badge and item count.

---

### TC-023: Cancel Checkout from Info Page
**Tags:** `@regression` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

Verifies user can cancel checkout from info page and return to cart without losing items.

---

### TC-024: Cancel Checkout from Overview Page
**Tags:** `@regression` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

Verifies user can cancel checkout from overview page and return to inventory with cart intact.

---

### TC-025: All Product Images Load Correctly
**Tags:** `@regression` `@products`  
**File:** `src/tests/products/products.spec.ts`

Validates all product images are visible and have valid src attributes.

---

### TC-026: Burger Menu All Links Functional
**Tags:** `@regression` `@navigation`  
**File:** `src/tests/products/products.spec.ts`

Tests all burger menu links (All Items, About, Logout, Reset App State) are visible and functional.

---

### TC-027: Special Characters in Checkout Form
**Tags:** `@regression` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

Verifies checkout form accepts special characters (hyphens, apostrophes, spaces) in name and postal code fields.

---

### TC-028: Remove All Items from Cart
**Tags:** `@regression` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

Tests removing all items from cart and verifies empty cart state and badge visibility.

---

## Phase 2 Tests (TC-029 to TC-035)

### TC-029: Sorting Behavior After Navigation
**Tags:** `@regression` `@products`  
**File:** `src/tests/products/products.spec.ts`

Documents actual Sauce Demo behavior: sorting resets to default (A-Z) after navigating to product detail and back.

---

### TC-030: Add/Remove Same Item Multiple Times
**Tags:** `@regression` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

Tests cart state management when adding and removing the same item repeatedly.

---

### TC-031: Very Long Input Values in Checkout
**Tags:** `@regression` `@edge` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

Tests checkout form behavior with extremely long input values (100-char names, 50-char postal code).

---

### TC-032: All Product Prices Formatted Correctly
**Tags:** `@regression` `@products`  
**File:** `src/tests/products/products.spec.ts`

Validates price format consistency across all products (positive values, max 2 decimal places).

---

### TC-033: Browser Refresh During Checkout
**Tags:** `@edge` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

Tests checkout form behavior when page is refreshed (form data cleared, expected behavior).

---

### TC-034: Checkout with Multiple Items
**Tags:** `@regression` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

Tests checkout flow with multiple items in cart and verifies total calculation.

---

### TC-035: About Link Opens External Site
**Tags:** `@regression` `@navigation`  
**File:** `src/tests/products/products.spec.ts`

Tests burger menu "About" link navigation to external Sauce Labs website.

---

**Phase 1 Tests:** 8  
**Phase 2 Tests:** 7  
**Total New Tests:** 15  
**All Tests Passing:** ✅ 100%
