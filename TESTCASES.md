# Test Cases - Sauce Demo E2E Automation

| Document Control | Details |
| :--- | :--- |
| **Project** | Sauce Demo E2E Component Object Model Framework |
| **Document ID** | QA-TC-2025-001 |
| **Version** | 2.0 (Enterprise Release) |
| **Last Updated** | 2025-12-15 |
| **Owner** | QA Automation Team |
| **Status** | ✅ APPROVED |
| **Confidentiality** | Internal Use Only |

---

## 📋 Table of Contents

1. [Authentication Suite](#1-authentication-tests-7)
2. [Shopping Cart Suite](#2-shopping-cart-tests-8)
3. [Checkout Suite](#3-checkout-tests-10)
4. [Product Suite](#4-product-tests-11)
5. [Edge Cases Suite](#5-edge-case-tests-5)

---

## 1. Authentication Tests (7)

**Pre-requisites:** User is on the Login Page (`/`).
**Test Data:** Use generic test users unless specified otherwise.

| ID | Title | Priority | Type | Detailed Steps & Expected Results | Status |
|:---|:---|:---:|:---:|:---|:---:|
| **TC-001** | **Successful Login** | `[P0]` | Positive | **Steps:**<br>1. Open Login Page<br>2. Enter User: `standard_user`<br>3. Enter Pass: `secret_sauce`<br>4. Click Login<br><br>**Expected:** Redirect to Inventory; Products visible. | ✅ Auto |
| **TC-002** | **Invalid Credentials** | `[P0]` | Negative | **Steps:**<br>1. Open Login Page<br>2. Enter User: `invalid_user`<br>3. Enter Pass: `wrong_pass`<br>4. Click Login<br><br>**Expected:** Error: "Username and password do not match". | ✅ Auto |
| **TC-003** | **Locked Out User** | `[P1]` | Negative | **Steps:**<br>1. Enter User: `locked_out_user`<br>2. Enter Pass: `secret_sauce`<br>3. Click Login<br><br>**Expected:** Error: "Sorry, this user has been locked out". | ✅ Auto |
| **TC-004** | **Successful Logout** | `[P0]` | Positive | **Steps:**<br>1. Login valid user<br>2. Open Menu > Click "Logout"<br><br>**Expected:** Redirect to Login page; Login form visible. | ✅ Auto |
| **TC-018** | **Unauth Access** | `[P1]` | Negative | **Steps:**<br>1. Ensure logged out<br>2. Navigate to `/inventory.html`<br><br>**Expected:** Auto-redirect to Login; Error displayed. | ✅ Auto |
| **TC-021** | **Empty Fields** | `[P1]` | Negative | **Steps:**<br>1. Leave User/Pass empty<br>2. Click Login<br><br>**Expected:** Error: "Username is required". | ✅ Auto |

---

## 2. Shopping Cart Tests (8)

**Pre-requisites:** User is logged in as `standard_user`.

| ID | Title | Priority | Type | Detailed Steps & Expected Results | Status |
|:---|:---|:---:|:---:|:---|:---:|
| **TC-005** | **Add Item** | `[P0]` | Positive | **Steps:**<br>1. Click "Add to cart" on Backpack<br>2. Check Badge<br><br>**Expected:** Badge="1"; Item in cart. | ✅ Auto |
| **TC-006** | **Remove Item** | `[P0]` | Positive | **Steps:**<br>1. Add item<br>2. Go to Cart > Click "Remove"<br><br>**Expected:** Item removed; Badge clears. | ✅ Auto |
| **TC-007** | **Persistence** | `[P1]` | Positive | **Steps:**<br>1. Add item<br>2. Nav to PDP > Return<br><br>**Expected:** Badge count persists. | ✅ Auto |
| **TC-013** | **Continue Shop** | `[P2]` | Positive | **Steps:**<br>1. Cart > "Continue Shopping"<br><br>**Expected:** Return to Inventory. | ✅ Auto |
| **TC-017** | **Badge Count** | `[P1]` | Positive | **Steps:**<br>1. Add 3 items sequentially<br><br>**Expected:** Badge updates 1 -> 2 -> 3. | ✅ Auto |
| **TC-022** | **Add All** | `[P2]` | Stress | **Steps:**<br>1. Add all 6 items<br><br>**Expected:** Badge="6"; All items in cart. | ✅ Auto |
| **TC-028** | **Remove All** | `[P2]` | Stress | **Steps:**<br>1. Fill cart<br>2. Remove all manually<br><br>**Expected:** Cart empty; Badge gone. | ✅ Auto |
| **TC-030** | **Repeat Ops** | `[P2]` | Edge | **Steps:**<br>1. Add item > Remove > Add again<br><br>**Expected:** State toggles correctly. | ✅ Auto |

---

## 3. Checkout Tests (10)

**Pre-requisites:** User logged in; Items in cart.

| ID | Title | Priority | Type | Detailed Steps & Expected Results | Status |
|:---|:---|:---:|:---:|:---|:---:|
| **TC-008** | **Checkout (1 Item)** | `[P0]` | Positive | **Steps:**<br>1. Cart > Checkout > Info > Finish<br><br>**Expected:** "Thank you for your order!". | ✅ Auto |
| **TC-009** | **Validation** | `[P1]` | Negative | **Steps:**<br>1. Checkout with empty fields<br><br>**Expected:** Error: "First Name is required". | ✅ Auto |
| **TC-020** | **Price Calc** | `[P0]` | Positive | **Steps:**<br>1. Checkout 2 items<br><br>**Expected:** Item Total + Tax = Total. | ✅ Auto |
| **TC-023** | **Cancel (Info)** | `[P2]` | Positive | **Steps:**<br>1. Checkout Info > "Cancel"<br><br>**Expected:** Return to Cart. | ✅ Auto |
| **TC-024** | **Cancel (Overview)** | `[P2]` | Positive | **Steps:**<br>1. Checkout Overview > "Cancel"<br><br>**Expected:** Return to Inventory. | ✅ Auto |
| **TC-027** | **Special Chars** | `[P2]` | Edge | **Steps:**<br>1. Input Name: "O'Reilly"<br><br>**Expected:** Form accepts input. | ✅ Auto |
| **TC-031** | **Long Inputs** | `[P2]` | Edge | **Steps:**<br>1. Input 100+ chars<br><br>**Expected:** No crash; Handled gracefully. | ✅ Auto |
| **TC-033** | **Refresh Page** | `[P2]` | Edge | **Steps:**<br>1. Refresh Checkout page<br><br>**Expected:** Form resets; User stays on page. | ✅ Auto |
| **TC-034** | **Multi-Item** | `[P1]` | Positive | **Steps:**<br>1. Checkout multiple distinct items<br><br>**Expected:** Summary accurate. | ✅ Auto |

---

## 4. Product Tests (11)

| ID | Title | Priority | Type | Detailed Steps & Expected Results | Status |
|:---|:---|:---:|:---:|:---|:---:|
| **TC-010** | **Sort (A-Z)** | `[P1]` | Positive | **Steps:**<br>1. Sort A-Z<br>**Exp:** 1st: "Sauce Labs Backpack". | ✅ Auto |
| **TC-011** | **Sort (Lo-Hi)** | `[P1]` | Positive | **Steps:**<br>1. Sort Price Lo-Hi<br>**Exp:** 1st: "Sauce Labs Onesie". | ✅ Auto |
| **TC-012** | **Detail View** | `[P1]` | Positive | **Steps:**<br>1. Click Product<br>**Exp:** PDP loads details. | ✅ Auto |
| **TC-025** | **Images** | `[P2]` | Positive | **Steps:**<br>1. Check all `src`<br>**Exp:** All images valid. | ✅ Auto |
| **TC-026** | **Burger Menu** | `[P2]` | Positive | **Steps:**<br>1. Check Menu Links<br>**Exp:** All 4 links working. | ✅ Auto |
| **TC-029** | **Sort Reset** | `[P2]` | Edge | **Steps:**<br>1. Sort > Nav away > Return<br>**Exp:** Resets to Default. | ✅ Auto |
| **TC-032** | **Price Format** | `[P2]` | Positive | **Steps:**<br>1. Verify `$XX.XX`<br>**Exp:** Valid format. | ✅ Auto |
| **TC-035** | **About Link** | `[P2]` | Positive | **Steps:**<br>1. Click "About"<br>**Exp:** Ext URL opens. | ✅ Auto |
| **TC-Misc** | **Other Sorts** | `[P2]` | Positive | **Steps:**<br>1. Test Z-A, Hi-Lo<br>**Exp:** Sorting correct. | ✅ Auto |

---

## 5. Edge Case Tests (5)

| ID | Title | Priority | Type | Detailed Steps & Expected Results | Status |
|:---|:---|:---:|:---:|:---|:---:|
| **TC-014** | **Problem User** | `[P2]` | Edge | **Steps:**<br>1. Login `problem_user`<br>**Exp:** Visual bugs visible. | ✅ Auto |
| **TC-015** | **Performance** | `[P2]` | Edge | **Steps:**<br>1. Login `performance_glitch_user`<br>**Exp:** Login >2s success. | ✅ Auto |
| **TC-016** | **Error User** | `[P2]` | Negative | **Steps:**<br>1. Login `error_user` > Checkout<br>**Exp:** Finish fails. | ✅ Auto |
| **TC-019** | **Back Button** | `[P2]` | Edge | **Steps:**<br>1. Overview > Browser Back<br>**Exp:** Returns to Info. | ✅ Auto |

---
**End of Document**
