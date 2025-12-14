# Script to update test files to use custom fixtures

$files = @(
    "src\tests\cart\cart.spec.ts",
    "src\tests\checkout\checkout.spec.ts",
    "src\tests\products\products.spec.ts",
    "src\tests\edge-cases\edge-cases.spec.ts"
)

foreach ($file in $files) {
    Write-Host "Updating $file..." -ForegroundColor Cyan
    
    # Read file content
    $content = Get-Content $file -Raw
    
    # Replace import statement
    $content = $content -replace "import \{ test, expect \} from '@playwright/test';", "import { test, expect } from '../../fixtures/custom-test';"
    
    # Remove page object imports
    $content = $content -replace "import \{ .+ \} from '\./pages/.+';[\r\n]+", ""
    
    # Remove manual instantiation declarations
    $content = $content -replace "[\r\n]+\s+let \w+Page: \w+Page;", ""
    
    # Remove beforeEach manual instantiation
    $content = $content -replace "test\.beforeEach\(async \(\{ page \}\) => \{[\r\n]+(\s+)\w+Page = new \w+Page\(page\);[\r\n]+(\s+)\w+Page = new \w+Page\(page\);[\r\n]+(\s+)\w+Page = new \w+Page\(page\);[\r\n]+(\s+)await", "test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {`r`n`$1await"
    
    # Write back
    Set-Content $file -Value $content
}

Write-Host "`nFiles updated! Manual review recommended." -ForegroundColor Green
