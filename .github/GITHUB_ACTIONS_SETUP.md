# GitHub Actions Setup Guide

## 🔐 Setting Up Environment Variables in GitHub

Since the `.env` file is gitignored (for security), you need to set up **GitHub Secrets** for CI/CD.

---

## 📝 Step-by-Step Guide

### 1. Navigate to Repository Settings

1. Go to your GitHub repository: https://github.com/Mukuldev21/Sauce-Demo-AI---E2E-Test-Automation
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**

### 2. Add Repository Secrets

Click **New repository secret** and add each of the following:

| Secret Name | Secret Value | Description |
|-------------|--------------|-------------|
| `BASE_URL` | `https://www.saucedemo.com` | Application base URL |
| `API_BASE_URL` | `https://api.saucedemo.com` | API base URL |
| `STANDARD_USER` | `standard_user` | Standard test user |
| `LOCKED_USER` | `locked_out_user` | Locked out test user |
| `PROBLEM_USER` | `problem_user` | Problem test user |
| `PERFORMANCE_USER` | `performance_glitch_user` | Performance test user |
| `ERROR_USER` | `error_user` | Error test user |
| `VISUAL_USER` | `visual_user` | Visual test user |
| `TEST_PASSWORD` | `secret_sauce` | Test password |

### 3. How It Works

The GitHub Actions workflow (`.github/workflows/playwright.yml`) automatically:

1. **Creates .env file** from GitHub Secrets before running tests
2. **Runs tests** with the environment variables
3. **Deletes .env file** after workflow completes (automatic cleanup)

**Workflow Step:**
```yaml
- name: Create .env file from secrets
  run: |
    echo "BASE_URL=${{ secrets.BASE_URL }}" >> .env
    echo "STANDARD_USER=${{ secrets.STANDARD_USER }}" >> .env
    echo "TEST_PASSWORD=${{ secrets.TEST_PASSWORD }}" >> .env
    # ... other secrets
```

---

## 🔒 Security Benefits

### Local Development
- ✅ Developers use their own `.env` file
- ✅ `.env` is gitignored (never committed)
- ✅ Each developer can have different credentials

### CI/CD (GitHub Actions)
- ✅ Secrets stored securely in GitHub
- ✅ Secrets are encrypted
- ✅ Secrets are not visible in logs
- ✅ Only authorized users can view/edit secrets

---

## 🚀 Testing the Workflow

### Trigger Workflow Manually

1. Go to **Actions** tab in your repository
2. Select **Playwright Tests** workflow
3. Click **Run workflow** dropdown
4. Click **Run workflow** button

### Automatic Triggers

The workflow runs automatically on:
- ✅ Push to `main` or `develop` branches
- ✅ Pull requests to `main` or `develop`
- ✅ Manual trigger via GitHub UI

---

## 📊 Workflow Jobs

### Job 1: Full Test Suite
- Runs all 26 tests
- Uploads test reports
- Timeout: 60 minutes

### Job 2: Smoke Tests
- Runs only smoke tests (6 tests)
- Faster feedback
- Timeout: 30 minutes

---

## 🔍 Viewing Test Results

After workflow completes:

1. Go to **Actions** tab
2. Click on the workflow run
3. Scroll down to **Artifacts** section
4. Download:
   - `playwright-report` - HTML test report
   - `test-results` - Test results JSON

---

## 🛠️ Advanced Configuration

### Using Different Environments

Create environment-specific secrets:

**Staging:**
- `STAGING_BASE_URL`
- `STAGING_USER`
- `STAGING_PASSWORD`

**Production:**
- `PROD_BASE_URL`
- `PROD_USER`
- `PROD_PASSWORD`

**Update workflow:**
```yaml
- name: Create .env file
  run: |
    echo "BASE_URL=${{ secrets.STAGING_BASE_URL }}" >> .env
```

### Protected Branches

For production deployments:
1. Settings → Branches → Add rule
2. Require status checks to pass
3. Require Playwright Tests workflow to pass

---

## ✅ Verification Checklist

- [ ] All secrets added to GitHub repository
- [ ] Workflow file committed (`.github/workflows/playwright.yml`)
- [ ] Workflow runs successfully
- [ ] Tests pass in CI/CD
- [ ] Test reports are uploaded
- [ ] No credentials visible in logs

---

## 🆘 Troubleshooting

### Issue: Tests fail with "undefined" credentials

**Solution:** Check that all required secrets are added in GitHub Settings

### Issue: Workflow doesn't trigger

**Solution:** 
1. Check workflow file is in `.github/workflows/` directory
2. Verify YAML syntax is correct
3. Check branch names match trigger configuration

### Issue: Can't see secrets

**Solution:** Only repository admins can view/edit secrets. Contact repository owner.

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Playwright CI Documentation](https://playwright.dev/docs/ci)

---

**Last Updated:** 2025-12-14  
**Workflow Version:** 1.0.0
