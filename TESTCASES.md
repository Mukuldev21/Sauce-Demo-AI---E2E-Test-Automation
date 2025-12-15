# Test Cases - Sauce Demo E2E Automation

**Total Test Cases:** 41  
**Last Updated:** 2025-12-15  
**Framework:** Playwright + TypeScript

---

## 📋 Table of Contents

1. [Authentication Tests (7)](#authentication-tests)
2. [Shopping Cart Tests (8)](#shopping-cart-tests)
3. [Checkout Tests (10)](#checkout-tests)
4. [Product Tests (11)](#product-tests)
5. [Edge Case Tests (5)](#edge-case-tests)

---

## Authentication Tests

### TC-001: Successful Login with Standard User
**Priority:** P0 | **Tags:** `@smoke` `@auth`  
**File:** `src/tests/auth/auth.spec.ts`

**Preconditions:**
- Application is accessible
- User is on login page

**Test Steps:**
1. Navigate to https://www.saucedemo.com/
2. Enter username: `standard_user`
3. Enter password: `secret_sauce`
4. Click "Login" button

**Expected Results:**
- User is redirected to inventory page (`/inventory.html`)
- Products are displayed
- Cart icon is visible

---

### TC-002: Login Failure - Invalid Credentials
**Priority:** P0 | **Tags:** `@smoke` `@negative` `@auth`  
**File:** `src/tests/auth/auth.spec.ts`

**Preconditions:**
- User is on login page

**Test Steps:**
1. Navigate to login page
2. Enter username: `invalid_user`
3. Enter password: `wrong_password`
4. Click "Login" button

**Expected Results:**
- Login fails
- Error message displayed: "Epic sadface: Username and password do not match any user in this service"
- User remains on login page

---

### TC-003: Login Failure - Locked Out User
**Priority:** P1 | **Tags:** `@regression` `@negative` `@auth`  
**File:** `src/tests/auth/auth.spec.ts`

**Preconditions:**
- User is on login page

**Test Steps:**
1. Navigate to login page
2. Enter username: `locked_out_user`
3. Enter password: `secret_sauce`
4. Click "Login" button

**Expected Results:**
- Login fails
- Error message displayed: "Epic sadface: Sorry, this user has been locked out"
- User remains on login page

---

### TC-004: Successful Logout
**Priority:** P0 | **Tags:** `@smoke` `@auth`  
**File:** `src/tests/auth/auth.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Click burger menu button
3. Click "Logout" link

**Expected Results:**
- User is redirected to login page
- Login form is displayed
- Session is cleared

---

### TC-018: Unauthenticated Access Redirect
**Priority:** P1 | **Tags:** `@regression` `@auth`  
**File:** `src/tests/auth/auth.spec.ts`

**Preconditions:**
- User is not logged in

**Test Steps:**
1. Navigate directly to `/inventory.html`

**Expected Results:**
- User is redirected to login page
- Error message displayed: "Epic sadface: You can only access '/inventory.html' when you are logged in"

---

### TC-021: Login with Empty Credentials
**Priority:** P1 | **Tags:** `@smoke` `@negative` `@auth`  
**File:** `src/tests/auth/auth.spec.ts`

**Preconditions:**
- User is on login page

**Test Steps:**
1. Navigate to login page
2. Leave username field empty
3. Leave password field empty
4. Click "Login" button

**Expected Results:**
- Login fails
- Error message displayed: "Epic sadface: Username is required"
- User remains on login page

---

## Shopping Cart Tests

### TC-005: Add Single Item to Cart
**Priority:** P0 | **Tags:** `@smoke` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

**Preconditions:**
- User is logged in
- On inventory page

**Test Steps:**
1. Login as `standard_user`
2. Click "Add to cart" button for "Sauce Labs Backpack"
3. Verify cart badge shows "1"
4. Click cart icon
5. Verify item is in cart

**Expected Results:**
- Cart badge displays "1"
- "Sauce Labs Backpack" appears in cart
- Remove button is visible

---

### TC-006: Remove Item from Cart
**Priority:** P0 | **Tags:** `@smoke` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

**Preconditions:**
- User is logged in
- Item is in cart

**Test Steps:**
1. Login and add "Sauce Labs Backpack" to cart
2. Navigate to cart page
3. Click "Remove" button

**Expected Results:**
- Item is removed from cart
- Cart is empty
- Cart badge disappears
- "Continue Shopping" button is visible

---

### TC-007: Cart Persistence Across Pages
**Priority:** P1 | **Tags:** `@regression` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" to cart
3. Navigate to product detail page
4. Navigate back to inventory
5. Check cart badge

**Expected Results:**
- Cart badge shows "1" on all pages
- Cart contents persist across navigation

---

### TC-013: Continue Shopping from Cart
**Priority:** P2 | **Tags:** `@regression` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

**Preconditions:**
- User is logged in
- On cart page

**Test Steps:**
1. Login and navigate to cart
2. Click "Continue Shopping" button

**Expected Results:**
- User is redirected to inventory page
- Products are displayed

---

### TC-017: Cart Badge Count
**Priority:** P1 | **Tags:** `@regression` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" to cart → Verify badge shows "1"
3. Add "Sauce Labs Bike Light" to cart → Verify badge shows "2"
4. Add "Sauce Labs Bolt T-Shirt" to cart → Verify badge shows "3"

**Expected Results:**
- Cart badge updates correctly after each addition
- Badge shows accurate count

---

### TC-022: Add All Products to Cart
**Priority:** P2 | **Tags:** `@regression` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Click "Add to cart" for all 6 products
3. Verify cart badge shows "6"
4. Navigate to cart
5. Verify all 6 items are present

**Expected Results:**
- Cart badge shows "6"
- All products appear in cart
- All items have remove buttons

---

### TC-028: Remove All Items from Cart
**Priority:** P2 | **Tags:** `@regression` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

**Preconditions:**
- User is logged in
- Multiple items in cart

**Test Steps:**
1. Login and add all products to cart
2. Navigate to cart
3. Click "Remove" for each item

**Expected Results:**
- All items removed successfully
- Cart is empty
- Cart badge disappears

---

### TC-030: Add/Remove Same Item Multiple Times
**Priority:** P2 | **Tags:** `@regression` `@cart`  
**File:** `src/tests/cart/cart.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" → Verify badge shows "1"
3. Remove "Sauce Labs Backpack" → Verify badge disappears
4. Add "Sauce Labs Backpack" again → Verify badge shows "1"
5. Remove "Sauce Labs Backpack" again → Verify badge disappears

**Expected Results:**
- Cart state updates correctly each time
- No errors or unexpected behavior

---

## Checkout Tests

### TC-008: Complete Checkout - Single Item
**Priority:** P0 | **Tags:** `@smoke` `@e2e` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

**Preconditions:**
- User is logged in
- Item is in cart

**Test Steps:**
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" to cart
3. Navigate to cart
4. Click "Checkout" button
5. Enter First Name: "John"
6. Enter Last Name: "Doe"
7. Enter Postal Code: "12345"
8. Click "Continue"
9. Verify order details
10. Click "Finish"

**Expected Results:**
- Checkout completes successfully
- Confirmation page displayed: "Thank you for your order!"
- Order confirmation message visible

---

### TC-009: Checkout Validation - Missing Information
**Priority:** P1 | **Tags:** `@regression` `@negative` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

**Preconditions:**
- User is logged in
- Item is in cart

**Test Steps:**
1. Login and add item to cart
2. Navigate to checkout
3. Leave First Name empty
4. Enter Last Name: "Doe"
5. Enter Postal Code: "12345"
6. Click "Continue"

**Expected Results:**
- Error message displayed: "Error: First Name is required"
- User remains on checkout info page

---

### TC-020: Multiple Items - Price Calculation
**Priority:** P0 | **Tags:** `@smoke` `@e2e` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" ($29.99)
3. Add "Sauce Labs Bike Light" ($9.99)
4. Navigate to cart
5. Proceed to checkout
6. Fill checkout information
7. Verify item total: $39.98
8. Verify tax calculation
9. Verify total price

**Expected Results:**
- Item total is correct ($39.98)
- Tax is calculated
- Total = Item Total + Tax

---

### TC-023: Cancel Checkout from Info Page
**Priority:** P2 | **Tags:** `@regression` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

**Preconditions:**
- User is logged in
- Item is in cart

**Test Steps:**
1. Login and add item to cart
2. Navigate to checkout
3. Click "Cancel" button

**Expected Results:**
- User is redirected to cart page
- Item remains in cart
- Cart badge still shows "1"

---

### TC-024: Cancel Checkout from Overview Page
**Priority:** P2 | **Tags:** `@regression` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

**Preconditions:**
- User is logged in
- On checkout overview page

**Test Steps:**
1. Login and add item to cart
2. Proceed to checkout overview
3. Click "Cancel" button

**Expected Results:**
- User is redirected to inventory page
- Cart still contains item

---

### TC-027: Special Characters in Checkout Form
**Priority:** P2 | **Tags:** `@regression` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

**Preconditions:**
- User is logged in
- Item is in cart

**Test Steps:**
1. Login and add item to cart
2. Navigate to checkout
3. Enter First Name: "John-O'Brien"
4. Enter Last Name: "Van Der Berg"
5. Enter Postal Code: "12345-6789"
6. Click "Continue"

**Expected Results:**
- Form accepts special characters
- Checkout proceeds to overview page
- Order can be completed

---

### TC-031: Very Long Input Values in Checkout
**Priority:** P2 | **Tags:** `@regression` `@edge` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

**Preconditions:**
- User is logged in
- Item is in cart

**Test Steps:**
1. Login and add item to cart
2. Navigate to checkout
3. Enter First Name: 100 'A' characters
4. Enter Last Name: 100 'A' characters
5. Enter Postal Code: 50 '1' characters
6. Click "Continue"

**Expected Results:**
- Form either accepts values or shows validation error
- No application crash
- Graceful handling

---

### TC-033: Browser Refresh During Checkout
**Priority:** P2 | **Tags:** `@edge` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

**Preconditions:**
- User is logged in
- On checkout info page

**Test Steps:**
1. Login and add item to cart
2. Navigate to checkout
3. Enter checkout information
4. Refresh browser (F5)

**Expected Results:**
- User remains on checkout page
- Form data is cleared (expected behavior)
- No errors displayed

---

### TC-034: Checkout with Multiple Items
**Priority:** P1 | **Tags:** `@regression` `@checkout`  
**File:** `src/tests/checkout/checkout.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Add "Sauce Labs Backpack"
3. Add "Sauce Labs Bolt T-Shirt"
4. Navigate to cart
5. Proceed to checkout
6. Fill checkout information
7. Verify both items in overview
8. Verify total calculation
9. Complete checkout

**Expected Results:**
- Both items appear in overview
- Total price is correct
- Checkout completes successfully

---

## Product Tests

### TC-010: Product Sorting - Name A to Z
**Priority:** P1 | **Tags:** `@regression` `@products`  
**File:** `src/tests/products/products.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Click sort dropdown
3. Select "Name (A to Z)"
4. Verify product order

**Expected Results:**
- Products sorted alphabetically A-Z
- First product: "Sauce Labs Backpack"

---

### TC-011: Product Sorting - Price Low to High
**Priority:** P1 | **Tags:** `@regression` `@products`  
**File:** `src/tests/products/products.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Click sort dropdown
3. Select "Price (low to high)"
4. Verify product order

**Expected Results:**
- Products sorted by price ascending
- First product: "Sauce Labs Onesie" ($7.99)

---

### TC-012: Product Detail View
**Priority:** P1 | **Tags:** `@regression` `@products`  
**File:** `src/tests/products/products.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Click on "Sauce Labs Backpack" name or image
3. Verify product detail page

**Expected Results:**
- Product detail page displayed
- Product name, price, description visible
- "Add to cart" button available
- "Back to products" button visible

---

### TC-025: All Product Images Load Correctly
**Priority:** P2 | **Tags:** `@regression` `@products`  
**File:** `src/tests/products/products.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Verify all product images are visible
3. Check each image has valid src attribute

**Expected Results:**
- All 6 product images are visible
- All images have valid src URLs
- No broken images

---

### TC-026: Burger Menu All Links Functional
**Priority:** P2 | **Tags:** `@regression` `@navigation`  
**File:** `src/tests/products/products.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Click burger menu button
3. Verify all links visible (All Items, About, Logout, Reset App State)
4. Click "All Items" → Verify navigation to inventory
5. Open menu again
6. Click "Reset App State" → Verify menu closes

**Expected Results:**
- All menu links are visible
- All Items link navigates correctly
- Reset App State clears cart
- Menu functions properly

---

### TC-029: Sorting Behavior After Navigation
**Priority:** P2 | **Tags:** `@regression` `@products`  
**File:** `src/tests/products/products.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Sort by "Price (low to high)"
3. Verify first product is "Sauce Labs Onesie"
4. Click on "Sauce Labs Onesie" to view details
5. Click "Back to products"
6. Check sorting

**Expected Results:**
- Sorting resets to default (A-Z)
- First product is "Sauce Labs Backpack"
- Documents actual Sauce Demo behavior

---

### TC-032: All Product Prices Formatted Correctly
**Priority:** P2 | **Tags:** `@regression` `@products`  
**File:** `src/tests/products/products.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Get all product prices
3. Verify each price:
   - Is greater than 0
   - Is less than 1000
   - Has max 2 decimal places

**Expected Results:**
- All prices are valid numbers
- All prices are positive
- All prices have proper format

---

### TC-035: About Link Opens External Site
**Priority:** P2 | **Tags:** `@regression` `@navigation`  
**File:** `src/tests/products/products.spec.ts`

**Preconditions:**
- User is logged in

**Test Steps:**
1. Login as `standard_user`
2. Click burger menu button
3. Click "About" link
4. Wait for navigation

**Expected Results:**
- Browser navigates to saucelabs.com
- External site loads successfully

---

## Edge Case Tests

### TC-014: Problem User - Visual Issues
**Priority:** P2 | **Tags:** `@edge` `@negative`  
**File:** `src/tests/edge-cases/edge-cases.spec.ts`

**Preconditions:**
- User is on login page

**Test Steps:**
1. Login as `problem_user`
2. Observe product images
3. Attempt to add items to cart

**Expected Results:**
- Visual issues may be present (dog images)
- Functionality may be impaired
- Documents problem user behavior

---

### TC-015: Performance Glitch User
**Priority:** P2 | **Tags:** `@edge`  
**File:** `src/tests/edge-cases/edge-cases.spec.ts`

**Preconditions:**
- User is on login page

**Test Steps:**
1. Login as `performance_glitch_user`
2. Measure page load time
3. Attempt normal operations

**Expected Results:**
- Page loads slower than normal
- Operations eventually complete
- No errors displayed

---

### TC-016: Error User - Checkout Failure
**Priority:** P2 | **Tags:** `@edge` `@negative`  
**File:** `src/tests/edge-cases/edge-cases.spec.ts`

**Preconditions:**
- User is on login page

**Test Steps:**
1. Login as `error_user`
2. Add item to cart
3. Proceed to checkout
4. Fill checkout information
5. Attempt to complete checkout

**Expected Results:**
- Checkout fails with error
- Error message displayed
- Documents error user behavior

---

### TC-019: Browser Back Button During Checkout
**Priority:** P2 | **Tags:** `@edge` `@checkout`  
**File:** `src/tests/edge-cases/edge-cases.spec.ts`

**Preconditions:**
- User is logged in
- On checkout overview page

**Test Steps:**
1. Login and proceed to checkout overview
2. Click browser back button
3. Verify page state

**Expected Results:**
- User returns to checkout info page
- Form data may or may not persist
- No errors displayed

---

**Total Test Cases:** 41  
**Coverage:** Comprehensive E2E testing

**For test strategy and execution plan, see [TESTPLAN.md](TESTPLAN.md)**
