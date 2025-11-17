const BasePage = require('./BasePage');

/**
 * GoogleSearchPage - Page Object Model for Google Search homepage
 * Extends BasePage to inherit common methods
 */
class GoogleSearchPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Locators for Google Search page elements
    this.searchInput = 'textarea[name="q"]';
    this.searchButton = 'input[name="btnK"]';
    this.luckyButton = 'input[name="btnI"]';
    this.googleLogo = 'img[alt="Google"]';
    this.searchSuggestions = 'ul[role="listbox"] li';
  }

  /**
   * Navigate to Google Search homepage
   */
  async navigate() {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Perform a search with the given query
   * @param {string} query - The search query
   */
  async search(query) {
    await this.waitForElement(this.searchInput);
    await this.fill(this.searchInput, query);
    await this.pressKey('Enter');
    await this.waitForPageLoad();
  }

  /**
   * Enter search query without submitting
   * @param {string} query - The search query
   */
  async enterSearchQuery(query) {
    await this.waitForElement(this.searchInput);
    await this.fill(this.searchInput, query);
  }

  /**
   * Click the Google Search button
   */
  async clickSearchButton() {
    await this.click(this.searchButton);
    await this.waitForPageLoad();
  }

  /**
   * Click the I'm Feeling Lucky button
   */
  async clickLuckyButton() {
    await this.click(this.luckyButton);
    await this.waitForPageLoad();
  }

  /**
   * Verify Google logo is visible
   * @returns {Promise<boolean>} True if logo is visible
   */
  async isGoogleLogoVisible() {
    return await this.isVisible(this.googleLogo);
  }

  /**
   * Get search suggestions
   * @returns {Promise<string[]>} Array of suggestion texts
   */
  async getSearchSuggestions() {
    await this.page.waitForSelector(this.searchSuggestions, { timeout: 5000 }).catch(() => null);
    const suggestions = await this.page.$$(this.searchSuggestions);
    const suggestionTexts = [];
    
    for (const suggestion of suggestions) {
      const text = await suggestion.textContent();
      if (text) suggestionTexts.push(text.trim());
    }
    
    return suggestionTexts;
  }

  /**
   * Check if search input is visible
   * @returns {Promise<boolean>} True if search input is visible
   */
  async isSearchInputVisible() {
    return await this.isVisible(this.searchInput);
  }

  /**
   * Clear search input
   */
  async clearSearchInput() {
    await this.page.fill(this.searchInput, '');
  }
}

module.exports = GoogleSearchPage;
