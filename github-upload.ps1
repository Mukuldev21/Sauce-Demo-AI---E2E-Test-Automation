# Sauce Demo Automation - GitHub Upload Script
# This script helps you commit and push the project component by component

Write-Host "=== Sauce Demo Automation - GitHub Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

Write-Host "Current Git Status:" -ForegroundColor Green
git status --short
Write-Host ""

# Component 1: Project Foundation
Write-Host "=== Component 1: Project Foundation ===" -ForegroundColor Cyan
Write-Host "Files: package.json, package-lock.json, playwright.config.ts, .gitignore" -ForegroundColor Yellow
$response = Read-Host "Proceed with this commit? (y/n)"
if ($response -eq 'y') {
    git add package.json package-lock.json playwright.config.ts .gitignore
    git commit -m "chore: initial project setup with Playwright configuration"
    Write-Host "Committed!" -ForegroundColor Green
}

# Component 2: Documentation
Write-Host "`n=== Component 2: Documentation ===" -ForegroundColor Cyan
Write-Host "Files: README.md, TEST_PLAN.md, AI_TEST_STANDARDS.md" -ForegroundColor Yellow
$response = Read-Host "Proceed with this commit? (y/n)"
if ($response -eq 'y') {
    git add README.md TEST_PLAN.md AI_TEST_STANDARDS.md
    git commit -m "docs: add comprehensive project documentation"
    Write-Host "Committed!" -ForegroundColor Green
}

# Component 3: LoginPage
Write-Host "`n=== Component 3: LoginPage ===" -ForegroundColor Cyan
Write-Host "Files: tests/pages/LoginPage.ts" -ForegroundColor Yellow
$response = Read-Host "Proceed with this commit? (y/n)"
if ($response -eq 'y') {
    git add tests/pages/LoginPage.ts
    git commit -m "feat: add LoginPage page object"
    Write-Host "Committed!" -ForegroundColor Green
}

# Component 4: Product Pages
Write-Host "`n=== Component 4: Product Pages ===" -ForegroundColor Cyan
Write-Host "Files: tests/pages/InventoryPage.ts, tests/pages/ProductDetailPage.ts" -ForegroundColor Yellow
$response = Read-Host "Proceed with this commit? (y/n)"
if ($response -eq 'y') {
    git add tests/pages/InventoryPage.ts tests/pages/ProductDetailPage.ts
    git commit -m "feat: add product browsing page objects"
    Write-Host "Committed!" -ForegroundColor Green
}

# Component 5: CartPage
Write-Host "`n=== Component 5: CartPage ===" -ForegroundColor Cyan
Write-Host "Files: tests/pages/CartPage.ts" -ForegroundColor Yellow
$response = Read-Host "Proceed with this commit? (y/n)"
if ($response -eq 'y') {
    git add tests/pages/CartPage.ts
    git commit -m "feat: add CartPage page object"
    Write-Host "Committed!" -ForegroundColor Green
}

# Component 6: Checkout Pages
Write-Host "`n=== Component 6: Checkout Pages ===" -ForegroundColor Cyan
Write-Host "Files: tests/pages/CheckoutInfoPage.ts, CheckoutOverviewPage.ts, CheckoutCompletePage.ts" -ForegroundColor Yellow
$response = Read-Host "Proceed with this commit? (y/n)"
if ($response -eq 'y') {
    git add tests/pages/CheckoutInfoPage.ts tests/pages/CheckoutOverviewPage.ts tests/pages/CheckoutCompletePage.ts
    git commit -m "feat: add checkout flow page objects"
    Write-Host "Committed!" -ForegroundColor Green
}

# Component 7: Auth Tests
Write-Host "`n=== Component 7: Auth Tests ===" -ForegroundColor Cyan
Write-Host "Files: tests/auth.spec.ts" -ForegroundColor Yellow
$response = Read-Host "Proceed with this commit? (y/n)"
if ($response -eq 'y') {
    git add tests/auth.spec.ts
    git commit -m "test: add authentication test scenarios"
    Write-Host "Committed!" -ForegroundColor Green
}

# Component 8: Cart Tests
Write-Host "`n=== Component 8: Cart Tests ===" -ForegroundColor Cyan
Write-Host "Files: tests/cart.spec.ts" -ForegroundColor Yellow
$response = Read-Host "Proceed with this commit? (y/n)"
if ($response -eq 'y') {
    git add tests/cart.spec.ts
    git commit -m "test: add shopping cart test scenarios"
    Write-Host "Committed!" -ForegroundColor Green
}

# Component 9: Checkout Tests
Write-Host "`n=== Component 9: Checkout Tests ===" -ForegroundColor Cyan
Write-Host "Files: tests/checkout.spec.ts" -ForegroundColor Yellow
$response = Read-Host "Proceed with this commit? (y/n)"
if ($response -eq 'y') {
    git add tests/checkout.spec.ts
    git commit -m "test: add checkout flow test scenarios"
    Write-Host "Committed!" -ForegroundColor Green
}

# Component 10: Product Tests
Write-Host "`n=== Component 10: Product Tests ===" -ForegroundColor Cyan
Write-Host "Files: tests/products.spec.ts" -ForegroundColor Yellow
$response = Read-Host "Proceed with this commit? (y/n)"
if ($response -eq 'y') {
    git add tests/products.spec.ts
    git commit -m "test: add product browsing test scenarios"
    Write-Host "Committed!" -ForegroundColor Green
}

# Component 11: Edge Case Tests
Write-Host "`n=== Component 11: Edge Case Tests ===" -ForegroundColor Cyan
Write-Host "Files: tests/edge-cases.spec.ts" -ForegroundColor Yellow
$response = Read-Host "Proceed with this commit? (y/n)"
if ($response -eq 'y') {
    git add tests/edge-cases.spec.ts
    git commit -m "test: add edge case and special user test scenarios"
    Write-Host "Committed!" -ForegroundColor Green
}

# Check remaining files
Write-Host "`n=== Checking for remaining files ===" -ForegroundColor Cyan
git status --short

Write-Host "`n=== All components committed! ===" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Create a repository on GitHub: https://github.com/new"
Write-Host "2. Run: git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
Write-Host "3. Run: git push -u origin main"
Write-Host ""
