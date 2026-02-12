/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for AEM Boilerplate website cleanup
 * Purpose: Remove non-content elements (header, footer, nav) before block parsing
 * Applies to: main--aem-boilerplate--adobe.aem.live (all templates)
 * Generated: 2026-02-06
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (cleaned.html)
 * - Found: header.header-wrapper, footer.footer-wrapper, .nav-hamburger
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove header/navigation (auto-populated by EDS)
    // EXTRACTED: Found <header class="header-wrapper"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'header.header-wrapper',
    ]);

    // Remove footer (auto-populated by EDS)
    // EXTRACTED: Found <footer class="footer-wrapper"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'footer.footer-wrapper',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining non-content elements
    // Standard HTML elements safe to remove
    WebImporter.DOMUtils.remove(element, [
      'source',
      'noscript',
      'link',
    ]);
  }
}
