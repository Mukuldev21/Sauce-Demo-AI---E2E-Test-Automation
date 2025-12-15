# New Test Cases - Phase 1 (TC-021 to TC-028)

## Summary
Added 8 new test cases to increase coverage from 26 to 34 tests (+31%).

---

## TC-021: Login with Empty Credentials
**Tags:** `@smoke` `@negative` `@auth`  
**File:** `src/tests/auth/auth.spec.ts`

Verifies form validation when attempting login with empty username and password fields.

---

## TC-022: Add All Products to Cart
**Tags:** `@regression` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

Tests adding all available products to cart dynamically and verifies cart badge and item count.

---

## TC-023: Cancel Checkout from Info Page
**Tags:** `@regression` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

Verifies user can cancel checkout from info page and return to cart without losing items.

---

## TC-024: Cancel Checkout from Overview Page
**Tags:** `@regression` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

Verifies user can cancel checkout from overview page and return to inventory with cart intact.

---

## TC-025: All Product Images Load Correctly
**Tags:** `@regression` `@products`  
**File:** `src/tests/products/products.spec.ts`

Validates all product images are visible and have valid src attributes.

---

## TC-026: Burger Menu All Links Functional
**Tags:** `@regression` `@navigation`  
**File:** `src/tests/products/products.spec.ts`

Tests all burger menu links (All Items, About, Logout, Reset App State) are visible and functional.

---

## TC-027: Special Characters in Checkout Form
**Tags:** `@regression` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

Verifies checkout form accepts special characters (hyphens, apostrophes, spaces) in name and postal code fields.

---

## TC-028: Remove All Items from Cart
**Tags:** `@regression` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

Tests removing all items from cart and verifies empty cart state and badge visibility.

---

**Total New Tests:** 8  
**All Tests Passing:** ✅ 100%
