/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-showcase block
 *
 * Source: https://main--aem-boilerplate--adobe.aem.live/
 * Base Block: columns
 *
 * Block Structure (from markdown example):
 * - Row N: 2 columns per row, each containing text/images/buttons
 *
 * Source HTML Pattern (from captured DOM):
 * <div class="columns block columns-2-cols">
 *   <div>
 *     <div>text, list, button</div>
 *     <div class="columns-img-col"><picture>...</picture></div>
 *   </div>
 *   <div>
 *     <div class="columns-img-col"><picture>...</picture></div>
 *     <div>text, button</div>
 *   </div>
 * </div>
 *
 * Generated: 2026-02-06
 */
export default function parse(element, { document }) {
  // Extract rows from columns block
  // VALIDATED: Found direct child <div> elements as rows in captured DOM
  const rows = Array.from(element.querySelectorAll(':scope > div'));

  // Build cells array - each row becomes a table row with 2 columns
  const cells = [];

  rows.forEach((row) => {
    // VALIDATED: Each row has child <div> elements as columns
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    if (cols.length >= 2) {
      cells.push([cols[0], cols[1]]);
    } else if (cols.length === 1) {
      cells.push([cols[0]]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Showcase', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
