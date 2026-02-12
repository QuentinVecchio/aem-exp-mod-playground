/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-landing block
 *
 * Source: https://main--aem-boilerplate--adobe.aem.live/
 * Base Block: hero
 *
 * Block Structure (from markdown example):
 * - Row 1: Background image (optional)
 * - Row 2: Content (heading text)
 *
 * Source HTML Pattern (from captured DOM):
 * <div class="hero block">
 *   <div><div><picture>...<img src="..."></picture>
 *     <h1 id="congrats-you-are-ready-to-go">Congrats, you are ready to go!</h1>
 *   </div></div>
 * </div>
 *
 * Generated: 2026-02-06
 */
export default function parse(element, { document }) {
  // Extract background image
  // VALIDATED: Found <picture> with <img> inside first child div in captured DOM
  const picture = element.querySelector('picture');

  // Extract heading
  // VALIDATED: Found <h1 id="congrats-you-are-ready-to-go"> in captured DOM
  const heading = element.querySelector('h1') ||
                  element.querySelector('h2') ||
                  element.querySelector('[class*="title"]');

  // Build cells array matching hero block structure
  const cells = [];

  // Row 1: Background image (optional)
  if (picture) {
    cells.push([picture]);
  }

  // Row 2: Content (heading and any additional text)
  const contentCell = [];
  if (heading) contentCell.push(heading);

  // Also capture any paragraphs or CTAs in the hero
  const paragraphs = Array.from(element.querySelectorAll('p'));
  paragraphs.forEach((p) => {
    if (p.textContent.trim()) contentCell.push(p);
  });

  const ctaLinks = Array.from(element.querySelectorAll('a.button, a.cta'));
  ctaLinks.forEach((a) => contentCell.push(a));

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Landing', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
