# Transliteration Tests with Playwright

This project contains automated tests for the SwiftTranslator transliteration functionality using Playwright.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Quick Test Run
```bash
npm test
```

This will run the transliteration tests and save results to `tstcase.csv`.

### Using Playwright Test Runner
```bash
npx playwright test
```

### Headless Mode
To run tests without opening a browser window, edit `transliteration-tests.js` and change:
```javascript
const browser = await chromium.launch({ 
  headless: false,  // Change to true for headless mode
  slowMo: 100
});
```

## Test Cases

The test suite includes 7 test cases covering various transliteration scenarios:

- **Pos_Fun_0001**: Simple greeting conversion
- **Pos_Fun_0002**: Polite request conversion  
- **Pos_Fun_0003**: Simple statement conversion
- **Pos_Fun_0004**: Question with "who"
- **Pos_Fun_0005**: Future tense statement
- **Pos_Fun_0006**: Negative statement
- **Pos_Fun_0007**: Imperative command

## Results

Test results are saved to `tstcase.csv` with the following columns:
- TC ID
- Test case name
- Input length type
- Input
- Expected output
- Actual output
- Status (Pass/Fail)
- What is covered by the test

## Configuration

- **playwright.config.js**: Playwright configuration for different browsers and test settings
- **package.json**: Node.js project configuration and dependencies
- **transliteration-tests.js**: Main test file with test cases and execution logic

## Troubleshooting

1. **Module not found errors**: Run `npm install` to install dependencies
2. **Browser not installed**: Run `npx playwright install` to install browser binaries
3. **Tests fail to find elements**: The website structure may have changed - update selectors in the test file

## Notes

- Tests run against https://www.swifttranslator.com/
- Each test opens a new browser page to ensure isolation
- Tests include delays to allow for transliteration processing
- Results are appended to CSV file for easy analysis
