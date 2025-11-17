/**
 * BasePage class contains common methods and properties
 * that can be inherited by all page objects
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Get the page title
   * @returns {Promise<string>} The page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Wait for an element to be visible
   * @param {string} selector - The element selector
   * @param {number} timeout - Optional timeout in milliseconds
   */
  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Click on an element
   * @param {string} selector - The element selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill in a text field
   * @param {string} selector - The element selector
   * @param {string} text - The text to fill
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content from an element
   * @param {string} selector - The element selector
   * @returns {Promise<string>} The text content
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Check if an element is visible
   * @param {string} selector - The element selector
   * @returns {Promise<boolean>} True if visible, false otherwise
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Take a screenshot
   * @param {string} path - The path to save the screenshot
   */
  async takeScreenshot(path) {
    await this.page.screenshot({ path, fullPage: true });
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Press a keyboard key
   * @param {string} key - The key to press
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }
}

module.exports = BasePage;
