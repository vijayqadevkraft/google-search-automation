# Google Search Automation

![Playwright](https://img.shields.io/badge/Playwright-1.40-green)
![Node.js](https://img.shields.io/badge/Node.js-18+-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-orange)

A comprehensive Playwright test automation framework for Google Search functionality, demonstrating professional-grade testing practices with Page Object Model (POM) pattern, multi-browser support, and continuous integration.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [CI/CD Pipeline](#cicd-pipeline)
- [Reports](#reports)
- [Best Practices](#best-practices)

## ✨ Features

- **Page Object Model (POM)**: Clean separation of test logic and page interactions
- **Multi-Browser Testing**: Runs on Chromium, Firefox, and WebKit
- **Comprehensive Test Suite**: 10+ test scenarios covering various search functionalities
- **CI/CD Integration**: Automated testing with GitHub Actions
- **Detailed Reporting**: HTML, JSON, and JUnit reports
- **Professional Code Structure**: Modular, maintainable, and scalable
- **Best Practices**: Follows industry standards for test automation

## 📁 Project Structure

```
google-search-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD workflow configuration
├── pages/
│   ├── BasePage.js                 # Base class with common methods
│   ├── GoogleSearchPage.js         # Google homepage page object
│   └── SearchResultsPage.js        # Search results page object
├── tests/
│   └── google-search.spec.js       # Test specifications
├── playwright.config.js            # Playwright configuration
├── package.json                    # Project dependencies
├── .gitignore                      # Git ignore rules
└── README.md                       # Project documentation
```

## 🔧 Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/vijayqadevkraft/google-search-automation.git
cd google-search-automation
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run playwright:install
```

## 🚀 Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode:
```bash
npm run test:headed
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests for specific browser:
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### View test report:
```bash
npm run test:report
```

## 🧪 Test Coverage

The test suite includes the following scenarios:

1. **Homepage Verification**: Validates Google homepage loads correctly
2. **Basic Search**: Tests standard search functionality
3. **Search Results Display**: Verifies results are displayed properly
4. **Search Statistics**: Checks search stats visibility
5. **Search from Results Page**: Tests search functionality from results
6. **Search Suggestions**: Validates autocomplete functionality
7. **Empty Search Handling**: Tests graceful handling of empty searches
8. **Special Characters**: Tests search with special characters
9. **Pagination**: Verifies pagination controls
10. **Long Query Search**: Tests search with extended queries

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions workflow that:

- Runs on every push and pull request to main/master branches
- Tests across three browsers (Chromium, Firefox, WebKit) in parallel
- Generates and uploads test reports as artifacts
- Maintains test results for 30 days
- Can be triggered manually via workflow_dispatch

## 📊 Reports

After running tests, reports are generated in the following formats:

- **HTML Report**: `playwright-report/index.html` - Interactive visual report
- **JSON Report**: `test-results/results.json` - Programmatic access to results
- **JUnit Report**: `test-results/junit.xml` - For CI/CD integration

## 💡 Best Practices Implemented

1. **Page Object Model**: Separates page structure from test logic
2. **DRY Principle**: Reusable methods in BasePage class
3. **Clear Naming**: Descriptive names for tests and methods
4. **Comprehensive Comments**: Well-documented code
5. **Error Handling**: Graceful handling of edge cases
6. **Assertions**: Meaningful test assertions
7. **Configuration**: Centralized test configuration
8. **CI/CD**: Automated testing pipeline

## 🛠️ Configuration

The `playwright.config.js` file includes:

- Test directory configuration
- Timeout settings
- Parallel execution
- Multi-browser projects
- Reporter configuration
- Screenshot and video capture settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Vijay Chuhan**
- GitHub: [@vijayqadevkraft](https://github.com/vijayqadevkraft)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is a portfolio project demonstrating professional test automation practices with Playwright.
