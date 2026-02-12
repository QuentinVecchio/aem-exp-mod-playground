/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-highlight block
 *
 * Source: https://main--aem-boilerplate--adobe.aem.live/
 * Base Block: cards
 *
 * Block Structure (from markdown example):
 * - Row N: 2 columns - image | text content (bold title + description)
 *
 * Source HTML Pattern (from captured DOM):
 * <div class="cards block">
 *   <ul>
 *     <li>
 *       <div class="cards-card-image"><picture>...</picture></div>
 *       <div class="cards-card-body">
 *         <p><strong>Title</strong></p>
 *         <p>Description text</p>
 *       </div>
 *     </li>
 *     ...
 *   </ul>
 * </div>
 *
 * Generated: 2026-02-06
 */
export default function parse(element, { document }) {
  // Extract card items
  // VALIDATED: Found <ul> with <li> items in captured DOM
  const cardItems = Array.from(element.querySelectorAll('ul > li, :scope > div'));

  // Build cells array - each card becomes a row with 2 columns (image | text)
  const cells = [];

  cardItems.forEach((item) => {
    // VALIDATED: Found .cards-card-image and .cards-card-body in captured DOM
    const imageDiv = item.querySelector('.cards-card-image') ||
                     item.querySelector('picture')?.closest('div');
    const bodyDiv = item.querySelector('.cards-card-body') ||
                    item.querySelector('div:not(.cards-card-image)');

    if (imageDiv && bodyDiv) {
      cells.push([imageDiv, bodyDiv]);
    } else if (imageDiv) {
      cells.push([imageDiv]);
    } else if (bodyDiv) {
      cells.push([bodyDiv]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Highlight', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
