/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-articles block
 *
 * Source: https://wknd.site/us/en.html
 * Base Block: cards
 *
 * Block Structure (from markdown example):
 * Each row = one card: image | bold-linked-title + description
 *
 * Source HTML Pattern:
 * <ul class="cmp-image-list">
 *   <li class="cmp-image-list__item">
 *     <article class="cmp-image-list__item-content">
 *       <a class="cmp-image-list__item-image-link" href="...">
 *         <div class="cmp-image-list__item-image">
 *           <img .../>
 *         </div>
 *       </a>
 *       <a class="cmp-image-list__item-title-link" href="...">
 *         <span class="cmp-image-list__item-title">...</span>
 *       </a>
 *       <span class="cmp-image-list__item-description">...</span>
 *     </article>
 *   </li>
 * </ul>
 *
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all list items (cards)
  // VALIDATED: Found .cmp-image-list__item in captured DOM at lines 283, 298, 313, 328
  const items = element.querySelectorAll('.cmp-image-list__item');

  items.forEach((item) => {
    // Extract image
    // VALIDATED: Found .cmp-image-list__item-image img in captured DOM
    const image = item.querySelector('.cmp-image-list__item-image img');

    // Extract title and link
    // VALIDATED: Found .cmp-image-list__item-title-link in captured DOM at lines 292, 307, 322, 338
    const titleLink = item.querySelector('.cmp-image-list__item-title-link');
    const titleText = item.querySelector('.cmp-image-list__item-title');

    // Extract description
    // VALIDATED: Found .cmp-image-list__item-description in captured DOM at lines 295, 310, 325, 341
    const description = item.querySelector('.cmp-image-list__item-description');

    // Build image cell
    const imageCell = document.createElement('div');
    if (image) {
      const img = image.cloneNode(true);
      imageCell.appendChild(img);
    }

    // Build content cell: bold linked title + description
    const contentCell = document.createElement('div');
    if (titleLink && titleText) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.href = titleLink.href;
      a.textContent = titleText.textContent.trim();
      strong.appendChild(a);
      p.appendChild(strong);
      contentCell.appendChild(p);
    }
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      contentCell.appendChild(p);
    }

    // Each card = one row with 2 columns: image | content
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Articles', cells });
  element.replaceWith(block);
}
