const { test, expect } = require('@playwright/test');
const GoogleSearchPage = require('../pages/GoogleSearchPage');
const SearchResultsPage = require('../pages/SearchResultsPage');

test.describe('Google Search Functionality', () => {
  let searchPage;
  let resultsPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new GoogleSearchPage(page);
    resultsPage = new SearchResultsPage(page);
    await searchPage.navigate();
  });

  test('should display Google homepage with search input', async () => {
    // Verify Google logo is visible
    const isLogoVisible = await searchPage.isGoogleLogoVisible();
    expect(isLogoVisible).toBeTruthy();

    // Verify search input is visible
    const isSearchInputVisible = await searchPage.isSearchInputVisible();
    expect(isSearchInputVisible).toBeTruthy();
  });

  test('should perform a basic search and display results', async () => {
    // Perform search
    await searchPage.search('Playwright automation');

    // Verify results are displayed
    const areResultsDisplayed = await resultsPage.areResultsDisplayed();
    expect(areResultsDisplayed).toBeTruthy();

    // Verify result count is greater than 0
    const resultsCount = await resultsPage.getResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  });

  test('should display search results with titles', async () => {
    // Perform search
    await searchPage.search('Node.js');

    // Get result titles
    const titles = await resultsPage.getResultTitles();

    // Verify titles are present
    expect(titles.length).toBeGreaterThan(0);

    // Verify titles contain search term
    const hasRelevantResults = titles.some(title => 
      title.toLowerCase().includes('node'));
    expect(hasRelevantResults).toBeTruthy();
  });

  test('should display search statistics', async () => {
    // Perform search
    await searchPage.search('JavaScript');

    // Get search stats
    const searchStats = await resultsPage.getSearchStats();

    // Verify stats are displayed
    expect(searchStats.length).toBeGreaterThan(0);
  });

  test('should allow search from results page', async () => {
    // Perform initial search
    await searchPage.search('TypeScript');

    // Perform new search from results page
    await resultsPage.searchAgain('React');

    // Verify new results are displayed
    const areResultsDisplayed = await resultsPage.areResultsDisplayed();
    expect(areResultsDisplayed).toBeTruthy();

    // Get titles and verify they relate to new search
    const titles = await resultsPage.getResultTitles();
    const hasRelevantResults = titles.some(title => 
      title.toLowerCase().includes('react'));
    expect(hasRelevantResults).toBeTruthy();
  });

  test('should show search suggestions while typing', async ({ page }) => {
    // Enter partial search query
    await searchPage.enterSearchQuery('python');

    // Wait a bit for suggestions to appear
    await page.waitForTimeout(1000);

    // Get search suggestions
    const suggestions = await searchPage.getSearchSuggestions();

    // Verify suggestions are displayed
    expect(suggestions.length).toBeGreaterThan(0);
  });

  test('should handle empty search gracefully', async () => {
    // Clear search input
    await searchPage.clearSearchInput();

    // Verify search input is empty and page is still functional
    const isSearchInputVisible = await searchPage.isSearchInputVisible();
    expect(isSearchInputVisible).toBeTruthy();
  });

  test('should perform search with special characters', async () => {
    // Perform search with special characters
    await searchPage.search('test automation @playwright');

    // Verify results are displayed
    const areResultsDisplayed = await resultsPage.areResultsDisplayed();
    expect(areResultsDisplayed).toBeTruthy();
  });

  test('should display pagination controls on results page', async () => {
    // Perform search
    await searchPage.search('web automation');

    // Check if next page button is visible
    const isNextVisible = await resultsPage.isNextPageVisible();
    expect(isNextVisible).toBeTruthy();
  });

  test('should perform search with long query', async () => {
    // Perform search with long query
    const longQuery = 'how to perform end to end testing with playwright for web applications';
    await searchPage.search(longQuery);

    // Verify results are displayed
    const areResultsDisplayed = await resultsPage.areResultsDisplayed();
    expect(areResultsDisplayed).toBeTruthy();

    const resultsCount = await resultsPage.getResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  });
});
