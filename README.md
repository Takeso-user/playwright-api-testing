# Playwright API Testing Demo

A comprehensive API testing project using Playwright to test the ReqRes.in REST API endpoints.

## Overview

This project demonstrates how to use Playwright for API testing with the sample REST API at [ReqRes.in](https://reqres.in). It includes tests for all common API operations including GET, POST, PUT, PATCH, and DELETE requests, as well as authentication flows and special cases.

## Features

- Testing GET, POST, PUT, PATCH, and DELETE methods
- User management tests (list, get, create, update, delete)
- Resource tests
- Authentication (register and login)
- Testing error cases and delayed responses
- Clean test organization with descriptive test groups
- Centralized baseURL configuration

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd pw_api
npm install
```

## Running Tests

Run all API tests:

```bash
npx playwright test
```

Run with headed browser:

```bash
npx playwright test --headed
```

Run specific test file:

```bash
npx playwright test tests/api_tests.spec.ts
```

## Test Report

After running tests, you can view the HTML report:

```bash
npx playwright show-report
```

## Project Structure

```
pw_api/
├── tests/
│   └── api_tests.spec.ts    # API test cases
├── playwright.config.ts     # Playwright configuration with baseURL
├── playwright-report/       # Test results and reports
│   └── index.html           # HTML report
└── package.json             # Project dependencies
```

## Configuration

The project uses a centralized configuration in `playwright.config.ts`. The API base URL is defined there:

```typescript
use: {
  baseURL: 'https://reqres.in/api',
  // ...other settings
}
```

## API Endpoints Tested

- List users
- Get single user
- Get user not found
- List resources
- Get single resource
- Get resource not found
- Create user
- Update user (PUT)
- Update user (PATCH)
- Delete user
- Register (successful)
- Register (unsuccessful)
- Login (successful)
- Login (unsuccessful)
- Delayed response

## Created

April 22, 2025

## Last Updated

April 22, 2025
