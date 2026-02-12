/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for WKND website cleanup
 * Purpose: Remove non-content elements (header, footer, nav, sign-in, language nav, carousel controls)
 * Applies to: wknd.site (all templates)
 * Generated: 2026-02-11
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (cleaned.html)
 * - Found: .cmp-experiencefragment--header, .cmp-experiencefragment--footer,
 *   .wknd-sign-in-buttons, .cmp-languagenavigation, .cmp-carousel__actions,
 *   .cmp-carousel__indicators
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove header experience fragment (auto-populated by EDS)
    // EXTRACTED: Found <header class="experiencefragment cmp-experiencefragment--header"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--header',
    ]);

    // Remove footer experience fragment (auto-populated by EDS)
    // EXTRACTED: Found <footer class="experiencefragment cmp-experiencefragment--footer"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--footer',
    ]);

    // Remove sign-in/sign-out buttons (not content)
    // EXTRACTED: Found <div class="wknd-sign-in-buttons"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.wknd-sign-in-buttons',
    ]);

    // Remove language navigation (not content)
    // EXTRACTED: Found <nav class="cmp-languagenavigation"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.cmp-languagenavigation',
      '.cmp-languagenavigation--langnavtoggle',
    ]);

    // Remove carousel navigation controls (handled by EDS carousel block JS)
    // EXTRACTED: Found <div class="cmp-carousel__actions"> and <ol class="cmp-carousel__indicators"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.cmp-carousel__actions',
      '.cmp-carousel__indicators',
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
