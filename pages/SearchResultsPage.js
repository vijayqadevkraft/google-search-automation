const BasePage = require('./BasePage');

/**
 * SearchResultsPage - Page Object Model for Google Search Results page
 * Extends BasePage to inherit common methods
 */
class SearchResultsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Locators for Search Results page elements
    this.searchInput = 'textarea[name="q"]';
    this.searchResults = 'div#search div.g';
    this.resultTitles = 'div#search h3';
    this.resultLinks = 'div#search a[href]';
    this.resultDescriptions = 'div#search div[data-sncf]';
    this.searchStats = 'div#result-stats';
    this.nextPageButton = 'a#pnnext';
    this.previousPageButton = 'a#pnprev';
    this.relatedSearches = 'div[data-async-context] a';
  }

  /**
   * Get the number of search results displayed
   * @returns {Promise<number>} Number of results
   */
  async getResultsCount() {
    const results = await this.page.$$(this.searchResults);
    return results.length;
  }

  /**
   * Get all search result titles
   * @returns {Promise<string[]>} Array of result titles
   */
  async getResultTitles() {
    await this.waitForElement(this.resultTitles);
    const titles = await this.page.$$(this.resultTitles);
    const titleTexts = [];
    
    for (const title of titles) {
      const text = await title.textContent();
      if (text) titleTexts.push(text.trim());
    }
    
    return titleTexts;
  }

  /**
   * Get search statistics text
   * @returns {Promise<string>} Search stats text
   */
  async getSearchStats() {
    try {
      await this.waitForElement(this.searchStats, 5000);
      return await this.getText(this.searchStats);
    } catch (error) {
      return '';
    }
  }

  /**
   * Click on a specific search result by index
   * @param {number} index - The index of the result to click (0-based)
   */
  async clickSearchResult(index) {
    const results = await this.page.$$(this.resultTitles);
    if (results[index]) {
      await results[index].click();
      await this.waitForPageLoad();
    }
  }

  /**
   * Check if next page button is visible
   * @returns {Promise<boolean>} True if next button is visible
   */
  async isNextPageVisible() {
    return await this.isVisible(this.nextPageButton);
  }

  /**
   * Click next page button
   */
  async clickNextPage() {
    await this.click(this.nextPageButton);
    await this.waitForPageLoad();
  }

  /**
   * Click previous page button
   */
  async clickPreviousPage() {
    await this.click(this.previousPageButton);
    await this.waitForPageLoad();
  }

  /**
   * Perform a new search from results page
   * @param {string} query - The new search query
   */
  async searchAgain(query) {
    await this.waitForElement(this.searchInput);
    await this.fill(this.searchInput, query);
    await this.pressKey('Enter');
    await this.waitForPageLoad();
  }

  /**
   * Verify search results are displayed
   * @returns {Promise<boolean>} True if results are visible
   */
  async areResultsDisplayed() {
    try {
      await this.waitForElement(this.searchResults, 5000);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get related searches
   * @returns {Promise<string[]>} Array of related search terms
   */
  async getRelatedSearches() {
    try {
      const relatedElements = await this.page.$$(this.relatedSearches);
      const related = [];
      
      for (const element of relatedElements) {
        const text = await element.textContent();
        if (text && text.trim()) related.push(text.trim());
      }
      
      return related;
    } catch (error) {
      return [];
    }
  }
}

module.exports = SearchResultsPage;
